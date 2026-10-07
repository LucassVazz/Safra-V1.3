require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Safra VSF rodando!' });
});

app.get('/teste-banco', async (req, res) => {
  try {
    const [linhas] = await pool.query('SELECT NOW() AS agora');
    res.json({ conectado: true, horaDoBanco: linhas[0].agora });
  } catch (erro) {
    res.status(500).json({ conectado: false, erro: erro.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const [linhas] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.senha, u.status, p.perfil
       FROM usuario u
       JOIN permissao p ON p.id = u.permissao_id
       WHERE u.email = ?`,
      [email]
    );

    if (linhas.length === 0) {
      return res.status(401).json({ sucesso: false, erro: 'Usuário não encontrado.' });
    }

    const usuario = linhas[0];

    if (usuario.senha !== senha) {
      return res.status(401).json({ sucesso: false, erro: 'Senha incorreta.' });
    }

    res.json({
      sucesso: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
});

// ---------- ThingSpeak (dados do ESP32) ----------
// O backend consulta o canal para não expor a Read API Key no frontend.

const cacheThingSpeak = new Map();   // guarda a resposta do ThingSpeak por 5 s

// Limite de silêncio para considerar o ESP32 offline.
// Se THINGSPEAK_OFFLINE_MIN estiver no .env, usa esse valor fixo (em minutos).
// Senão, aprende o intervalo normal de publicação e usa 3x esse valor (mínimo 60 s).
// Com poucas leituras para estimar, usa 15 minutos.
function calcularLimiteSeg(leituras) {
  const fixo = parseFloat(process.env.THINGSPEAK_OFFLINE_MIN);
  if (fixo > 0) return { limite: Math.round(fixo * 60), intervalo: null };

  const ts = leituras.slice(-20).map(l => new Date(l.data_hora).getTime());
  const intervalos = [];
  for (let i = 1; i < ts.length; i++) {
    const g = (ts[i] - ts[i - 1]) / 1000;
    if (g > 0) intervalos.push(g);
  }
  if (intervalos.length < 3) return { limite: 900, intervalo: null };

  intervalos.sort((a, b) => a - b);
  const mediana = intervalos[Math.floor(intervalos.length / 2)];
  return { limite: Math.max(60, Math.round(mediana * 3)), intervalo: Math.round(mediana) };
}

app.get('/thingspeak', async (req, res) => {
  const canal = process.env.THINGSPEAK_CHANNEL_ID;
  const chave = process.env.THINGSPEAK_READ_KEY;
  const campoTemp = process.env.THINGSPEAK_FIELD_TEMP || 'field1';
  const campoUmid = process.env.THINGSPEAK_FIELD_UMID || 'field2';

  if (!canal) {
    return res.status(500).json({ sucesso: false, erro: 'THINGSPEAK_CHANNEL_ID não configurado no .env' });
  }

  if (typeof fetch !== 'function') {
    return res.status(500).json({ sucesso: false, erro: 'Node muito antigo: atualize para Node 18 ou superior (node -v).' });
  }

  const results = Math.min(parseInt(req.query.results, 10) || 24, 500);
  const url = new URL(`https://api.thingspeak.com/channels/${canal}/feeds.json`);
  url.searchParams.set('results', results);
  if (chave) url.searchParams.set('api_key', chave);

  try {
    let dados;
    const chaveCache = url.toString();
    const emCache = cacheThingSpeak.get(chaveCache);
    if (emCache && Date.now() - emCache.t < 5000) {
      dados = emCache.dados;
    } else {
      const resposta = await fetch(url);
      if (!resposta.ok) {
        return res.status(502).json({ sucesso: false, erro: `ThingSpeak respondeu ${resposta.status}` });
      }
      dados = await resposta.json();
      cacheThingSpeak.set(chaveCache, { t: Date.now(), dados });
    }

    const feedsBrutos = dados.feeds || [];
    const leituras = feedsBrutos
      .map(f => ({
        data_hora: f.created_at,
        temperatura: f[campoTemp] != null ? Number(f[campoTemp]) : null,
        umidade: f[campoUmid] != null ? Number(f[campoUmid]) : null
      }))
      .filter(l => l.temperatura !== null && !Number.isNaN(l.temperatura));

    if (leituras.length === 0) {
      const ultimo = feedsBrutos[feedsBrutos.length - 1] || {};
      const comValor = Object.keys(ultimo).filter(k => /^field\d$/.test(k) && ultimo[k] != null);
      const msg = feedsBrutos.length === 0
        ? 'O canal não tem nenhuma leitura (o ESP32 está publicando?).'
        : `Sem valor em ${campoTemp}. Campos com dados no canal: ${comValor.join(', ') || 'nenhum'}. Ajuste THINGSPEAK_FIELD_TEMP/UMID no .env.`;
      console.warn('ThingSpeak:', msg);
      return res.json({ sucesso: false, erro: msg });
    }

    // Status decidido aqui no servidor, a partir do horário real da última leitura.
    // O ThingSpeak não "pinga" o ESP32: o ESP32 é considerado offline quando
    // para de publicar por mais de THINGSPEAK_OFFLINE_MIN minutos (padrão 15).
        const ultima = leituras[leituras.length - 1];
    const { limite, intervalo } = calcularLimiteSeg(leituras);
    const idadeSeg = (Date.now() - new Date(ultima.data_hora).getTime()) / 1000;

    res.json({
      sucesso: true,
      canal: dados.channel ? dados.channel.name : null,
      ultima,
      leituras,
      status: {
        thingspeak: 'online',
        esp32: idadeSeg <= limite ? 'online' : 'offline',
        idade_s: Math.round(idadeSeg),
        limite_s: limite,
        intervalo_estimado_s: intervalo
      }
    });
  } catch (erro) {
    console.warn('ThingSpeak:', erro.message);
    res.status(502).json({ sucesso: false, erro: erro.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});