/*
 * Safra — JavaScript unificado do perfil: ADM
 * Todos os JS originais deste perfil foram reunidos neste único arquivo.
 */

/* ================= adm.alerta.js ================= */

// ==========================================
// ALERTAS - PAINEL ADMINISTRADOR
// ==========================================

if (!sessionStorage.getItem("safra_logado")) {
    window.location.replace("/Frontend/Login/login.html");
}

let alertas = [
    {
        id: 1,
        titulo: "Baixa produtividade",
        tipo: "Produção",
        prioridade: "Alta",
        mensagem: "A produtividade de uma propriedade está abaixo do esperado.",
        data: "10/09/2026",
        hora: "08:30",
        status: "Ativo"
    },
    {
        id: 2,
        titulo: "Novo usuário cadastrado",
        tipo: "Sistema",
        prioridade: "Baixa",
        mensagem: "Um novo usuário foi cadastrado no sistema.",
        data: "10/09/2026",
        hora: "09:15",
        status: "Ativo"
    },
    {
        id: 3,
        titulo: "Área cultivada atualizada",
        tipo: "Propriedade",
        prioridade: "Média",
        mensagem: "Os dados de uma propriedade foram atualizados.",
        data: "09/09/2026",
        hora: "14:20",
        status: "Lido"
    },
    {
        id: 4,
        titulo: "Falha no acesso",
        tipo: "Segurança",
        prioridade: "Alta",
        mensagem: "Foi identificada uma tentativa de acesso inválida.",
        data: "09/09/2026",
        hora: "18:45",
        status: "Ativo"
    }
];


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    carregarAlertas();

    const busca = document.getElementById("buscarAlerta");

    if (busca) {
        busca.addEventListener("input", carregarAlertas);
    }

    const filtroTipo = document.getElementById("filtroTipoAlerta");

    if (filtroTipo) {
        filtroTipo.addEventListener("change", carregarAlertas);
    }

    const filtroPrioridade =
        document.getElementById("filtroPrioridadeAlerta");

    if (filtroPrioridade) {
        filtroPrioridade.addEventListener(
            "change",
            carregarAlertas
        );
    }

    atualizarIndicadoresAlertas();
});


// ==========================================
// CARREGAR ALERTAS
// ==========================================

function carregarAlertas() {

    const lista = document.getElementById("listaAlertas");

    if (!lista) return;

    const busca =
        document.getElementById("buscarAlerta")
        ?.value
        .toLowerCase() || "";

    const tipo =
        document.getElementById("filtroTipoAlerta")
        ?.value || "todos";

    const prioridade =
        document.getElementById("filtroPrioridadeAlerta")
        ?.value || "todos";


    const resultados = alertas.filter(alerta => {

        const correspondeBusca =
            alerta.titulo.toLowerCase().includes(busca) ||
            alerta.mensagem.toLowerCase().includes(busca) ||
            alerta.tipo.toLowerCase().includes(busca);

        const correspondeTipo =
            tipo === "todos" ||
            alerta.tipo === tipo;

        const correspondePrioridade =
            prioridade === "todos" ||
            alerta.prioridade === prioridade;

        return (
            correspondeBusca &&
            correspondeTipo &&
            correspondePrioridade
        );
    });


    lista.innerHTML = "";


    if (resultados.length === 0) {

        lista.innerHTML = `
            <div class="sem-alertas">
                <p>🔔 Nenhum alerta encontrado.</p>
            </div>
        `;

        return;
    }


    resultados.forEach(alerta => {

        const item =
            document.createElement("div");

        item.className =
            "alerta-item " +
            alerta.prioridade.toLowerCase();


        item.innerHTML = `

            <div class="alerta-icone">
                ${obterIconeAlerta(alerta.tipo)}
            </div>

            <div class="alerta-conteudo">

                <h3>
                    ${alerta.titulo}
                </h3>

                <p>
                    ${alerta.mensagem}
                </p>

                <div class="alerta-informacoes">

                    <span>
                        📅 ${alerta.data}
                    </span>

                    <span>
                        🕐 ${alerta.hora}
                    </span>

                    <span>
                        📂 ${alerta.tipo}
                    </span>

                </div>

            </div>

            <div class="alerta-acoes">

                <span class="prioridade">
                    ${alerta.prioridade}
                </span>

                <span class="status-alerta">
                    ${alerta.status}
                </span>

                ${
                    alerta.status === "Ativo"
                    ? `
                        <button
                            onclick="marcarAlertaComoLido(${alerta.id})">
                            ✓ Marcar como lido
                        </button>
                    `
                    : ""
                }

                <button
                    onclick="excluirAlerta(${alerta.id})">
                    🗑️ Excluir
                </button>

            </div>
        `;

        lista.appendChild(item);
    });
}


// ==========================================
// ÍCONE DOS ALERTAS
// ==========================================

function obterIconeAlerta(tipo) {

    switch (tipo) {

        case "Produção":
            return "🌱";

        case "Sistema":
            return "⚙️";

        case "Propriedade":
            return "🏡";

        case "Segurança":
            return "🔐";

        default:
            return "🔔";
    }
}


// ==========================================
// MARCAR COMO LIDO
// ==========================================

function marcarAlertaComoLido(id) {

    const alerta =
        alertas.find(item => item.id === id);

    if (!alerta) return;


    alerta.status = "Lido";

    salvarAlertas();

    carregarAlertas();

    atualizarIndicadoresAlertas();
}


// ==========================================
// EXCLUIR ALERTA
// ==========================================

function excluirAlerta(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este alerta?"
        );

    if (!confirmar) return;


    alertas =
        alertas.filter(
            alerta => alerta.id !== id
        );

    salvarAlertas();

    carregarAlertas();

    atualizarIndicadoresAlertas();
}


// ==========================================
// CRIAR NOVO ALERTA
// ==========================================

function criarAlerta() {

    const titulo =
        prompt("Digite o título do alerta:");

    if (!titulo) return;


    const mensagem =
        prompt("Digite a mensagem do alerta:");

    if (!mensagem) return;


    const tipo =
        prompt(
            "Digite o tipo do alerta:\n\n" +
            "Produção\n" +
            "Sistema\n" +
            "Propriedade\n" +
            "Segurança"
        );

    if (!tipo) return;


    const prioridade =
        prompt(
            "Digite a prioridade:\n\n" +
            "Alta\n" +
            "Média\n" +
            "Baixa"
        );

    if (!prioridade) return;


    const agora = new Date();


    const novoAlerta = {

        id:
            alertas.length > 0
                ? Math.max(
                    ...alertas.map(a => a.id)
                ) + 1
                : 1,

        titulo: titulo,

        tipo: tipo,

        prioridade: prioridade,

        mensagem: mensagem,

        data:
            agora.toLocaleDateString("pt-BR"),

        hora:
            agora.toLocaleTimeString(
                "pt-BR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),

        status: "Ativo"
    };


    alertas.push(novoAlerta);

    salvarAlertas();

    carregarAlertas();

    atualizarIndicadoresAlertas();


    alert(
        "Alerta criado com sucesso!"
    );
}


// ==========================================
// LIMPAR FILTROS
// ==========================================

function limparFiltrosAlertas() {

    const busca =
        document.getElementById("buscarAlerta");

    const tipo =
        document.getElementById("filtroTipoAlerta");

    const prioridade =
        document.getElementById(
            "filtroPrioridadeAlerta"
        );


    if (busca) {
        busca.value = "";
    }

    if (tipo) {
        tipo.value = "todos";
    }

    if (prioridade) {
        prioridade.value = "todos";
    }


    carregarAlertas();
}


// ==========================================
// INDICADORES
// ==========================================

function atualizarIndicadoresAlertas() {

    const total =
        document.getElementById("totalAlertas");

    const ativos =
        document.getElementById("alertasAtivos");

    const alta =
        document.getElementById("alertasAlta");

    const lidos =
        document.getElementById("alertasLidos");


    if (total) {
        total.textContent =
            alertas.length;
    }


    if (ativos) {
        ativos.textContent =
            alertas.filter(
                alerta => alerta.status === "Ativo"
            ).length;
    }


    if (alta) {
        alta.textContent =
            alertas.filter(
                alerta =>
                    alerta.prioridade === "Alta" &&
                    alerta.status === "Ativo"
            ).length;
    }


    if (lidos) {
        lidos.textContent =
            alertas.filter(
                alerta => alerta.status === "Lido"
            ).length;
    }
}


// ==========================================
// SALVAR ALERTAS
// ==========================================

function salvarAlertas() {

    localStorage.setItem(
        "alertasADM",
        JSON.stringify(alertas)
    );
}


// ==========================================
// ATUALIZAR ALERTAS
// ==========================================

function atualizarAlertas() {

    carregarAlertas();

    atualizarIndicadoresAlertas();
}
/* ================= adm.configuracoes.js ================= */

// ==========================================
// CONFIGURAÇÕES - PAINEL ADMINISTRADOR
// ==========================================

// Configurações padrão do sistema
let configuracoes = {
    sistema: {
        nomeSistema: "SAFRA",
        idioma: "Português",
        fusoHorario: "America/Sao_Paulo",
        atualizacaoAutomatica: true
    },

    notificacoes: {
        alertasSistema: true,
        novosUsuarios: true,
        relatorios: true,
        notificacoesEmail: false
    },

    seguranca: {
        autenticacaoDoisFatores: false,
        sessaoAutomatica: true,
        tempoSessao: 30
    },

    aparencia: {
        tema: "Claro",
        menuLateral: true,
        animacoes: true
    }
};


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    carregarConfiguracoes();

    preencherConfiguracoes();

});


// ==========================================
// PREENCHER CONFIGURAÇÕES NA TELA
// ==========================================

function preencherConfiguracoes() {

    // Sistema
    const nomeSistema =
        document.getElementById("nomeSistema");

    const idioma =
        document.getElementById("idiomaSistema");

    const fusoHorario =
        document.getElementById("fusoHorario");

    const atualizacaoAutomatica =
        document.getElementById("atualizacaoAutomatica");


    if (nomeSistema) {
        nomeSistema.value =
            configuracoes.sistema.nomeSistema;
    }

    if (idioma) {
        idioma.value =
            configuracoes.sistema.idioma;
    }

    if (fusoHorario) {
        fusoHorario.value =
            configuracoes.sistema.fusoHorario;
    }

    if (atualizacaoAutomatica) {
        atualizacaoAutomatica.checked =
            configuracoes.sistema.atualizacaoAutomatica;
    }


    // Notificações
    const alertasSistema =
        document.getElementById("alertasSistema");

    const novosUsuarios =
        document.getElementById("novosUsuarios");

    const relatorios =
        document.getElementById("notificacoesRelatorios");

    const notificacoesEmail =
        document.getElementById("notificacoesEmail");


    if (alertasSistema) {
        alertasSistema.checked =
            configuracoes.notificacoes.alertasSistema;
    }

    if (novosUsuarios) {
        novosUsuarios.checked =
            configuracoes.notificacoes.novosUsuarios;
    }

    if (relatorios) {
        relatorios.checked =
            configuracoes.notificacoes.relatorios;
    }

    if (notificacoesEmail) {
        notificacoesEmail.checked =
            configuracoes.notificacoes.notificacoesEmail;
    }


    // Segurança
    const autenticacaoDoisFatores =
        document.getElementById(
            "autenticacaoDoisFatores"
        );

    const sessaoAutomatica =
        document.getElementById(
            "sessaoAutomatica"
        );

    const tempoSessao =
        document.getElementById("tempoSessao");


    if (autenticacaoDoisFatores) {
        autenticacaoDoisFatores.checked =
            configuracoes.seguranca
                .autenticacaoDoisFatores;
    }

    if (sessaoAutomatica) {
        sessaoAutomatica.checked =
            configuracoes.seguranca
                .sessaoAutomatica;
    }

    if (tempoSessao) {
        tempoSessao.value =
            configuracoes.seguranca.tempoSessao;
    }


    // Aparência
    const tema =
        document.getElementById("temaSistema");

    const menuLateral =
        document.getElementById("menuLateral");

    const animacoes =
        document.getElementById("animacoesSistema");


    if (tema) {
        tema.value =
            configuracoes.aparencia.tema;
    }

    if (menuLateral) {
        menuLateral.checked =
            configuracoes.aparencia.menuLateral;
    }

    if (animacoes) {
        animacoes.checked =
            configuracoes.aparencia.animacoes;
    }
}


// ==========================================
// SALVAR CONFIGURAÇÕES
// ==========================================

function salvarConfiguracoes() {

    // Sistema
    const nomeSistema =
        document.getElementById("nomeSistema");

    const idioma =
        document.getElementById("idiomaSistema");

    const fusoHorario =
        document.getElementById("fusoHorario");

    const atualizacaoAutomatica =
        document.getElementById("atualizacaoAutomatica");


    if (nomeSistema) {
        configuracoes.sistema.nomeSistema =
            nomeSistema.value;
    }

    if (idioma) {
        configuracoes.sistema.idioma =
            idioma.value;
    }

    if (fusoHorario) {
        configuracoes.sistema.fusoHorario =
            fusoHorario.value;
    }

    if (atualizacaoAutomatica) {
        configuracoes.sistema.atualizacaoAutomatica =
            atualizacaoAutomatica.checked;
    }


    // Notificações
    const alertasSistema =
        document.getElementById("alertasSistema");

    const novosUsuarios =
        document.getElementById("novosUsuarios");

    const relatorios =
        document.getElementById(
            "notificacoesRelatorios"
        );

    const notificacoesEmail =
        document.getElementById("notificacoesEmail");


    if (alertasSistema) {
        configuracoes.notificacoes.alertasSistema =
            alertasSistema.checked;
    }

    if (novosUsuarios) {
        configuracoes.notificacoes.novosUsuarios =
            novosUsuarios.checked;
    }

    if (relatorios) {
        configuracoes.notificacoes.relatorios =
            relatorios.checked;
    }

    if (notificacoesEmail) {
        configuracoes.notificacoes.notificacoesEmail =
            notificacoesEmail.checked;
    }


    // Segurança
    const autenticacaoDoisFatores =
        document.getElementById(
            "autenticacaoDoisFatores"
        );

    const sessaoAutomatica =
        document.getElementById(
            "sessaoAutomatica"
        );

    const tempoSessao =
        document.getElementById("tempoSessao");


    if (autenticacaoDoisFatores) {
        configuracoes.seguranca
            .autenticacaoDoisFatores =
            autenticacaoDoisFatores.checked;
    }

    if (sessaoAutomatica) {
        configuracoes.seguranca
            .sessaoAutomatica =
            sessaoAutomatica.checked;
    }

    if (tempoSessao) {
        configuracoes.seguranca.tempoSessao =
            Number(tempoSessao.value);
    }


    // Aparência
    const tema =
        document.getElementById("temaSistema");

    const menuLateral =
        document.getElementById("menuLateral");

    const animacoes =
        document.getElementById("animacoesSistema");


    if (tema) {
        configuracoes.aparencia.tema =
            tema.value;
    }

    if (menuLateral) {
        configuracoes.aparencia.menuLateral =
            menuLateral.checked;
    }

    if (animacoes) {
        configuracoes.aparencia.animacoes =
            animacoes.checked;
    }


    // Salvar
    localStorage.setItem(
        "configuracoesADM",
        JSON.stringify(configuracoes)
    );


    mostrarMensagemConfiguracao(
        "Configurações salvas com sucesso!"
    );
}


// ==========================================
// CARREGAR CONFIGURAÇÕES
// ==========================================

function carregarConfiguracoes() {

    const dadosSalvos =
        localStorage.getItem(
            "configuracoesADM"
        );


    if (!dadosSalvos) return;


    try {

        const dados =
            JSON.parse(dadosSalvos);


        configuracoes = {
            ...configuracoes,
            ...dados,

            sistema: {
                ...configuracoes.sistema,
                ...dados.sistema
            },

            notificacoes: {
                ...configuracoes.notificacoes,
                ...dados.notificacoes
            },

            seguranca: {
                ...configuracoes.seguranca,
                ...dados.seguranca
            },

            aparencia: {
                ...configuracoes.aparencia,
                ...dados.aparencia
            }
        };

    } catch (erro) {

        console.error(
            "Erro ao carregar configurações:",
            erro
        );
    }
}


// ==========================================
// RESTAURAR CONFIGURAÇÕES
// ==========================================

function restaurarConfiguracoes() {

    const confirmar =
        confirm(
            "Deseja restaurar todas as configurações padrão?"
        );


    if (!confirmar) return;


    configuracoes = {

        sistema: {
            nomeSistema: "SAFRA",
            idioma: "Português",
            fusoHorario: "America/Sao_Paulo",
            atualizacaoAutomatica: true
        },

        notificacoes: {
            alertasSistema: true,
            novosUsuarios: true,
            relatorios: true,
            notificacoesEmail: false
        },

        seguranca: {
            autenticacaoDoisFatores: false,
            sessaoAutomatica: true,
            tempoSessao: 30
        },

        aparencia: {
            tema: "Claro",
            menuLateral: true,
            animacoes: true
        }
    };


    localStorage.setItem(
        "configuracoesADM",
        JSON.stringify(configuracoes)
    );


    preencherConfiguracoes();


    mostrarMensagemConfiguracao(
        "Configurações restauradas!"
    );
}


// ==========================================
// ALTERAR TEMA
// ==========================================

function alterarTema(tema) {

    configuracoes.aparencia.tema = tema;


    if (tema === "Escuro") {

        document.body.classList.add(
            "tema-escuro"
        );

    } else {

        document.body.classList.remove(
            "tema-escuro"
        );
    }


    salvarConfiguracoes();
}


// ==========================================
// ATIVAR / DESATIVAR NOTIFICAÇÕES
// ==========================================

function alterarNotificacoes() {

    const alertas =
        document.getElementById(
            "alertasSistema"
        );

    const usuarios =
        document.getElementById(
            "novosUsuarios"
        );

    const relatorios =
        document.getElementById(
            "notificacoesRelatorios"
        );


    configuracoes.notificacoes.alertasSistema =
        alertas?.checked || false;

    configuracoes.notificacoes.novosUsuarios =
        usuarios?.checked || false;

    configuracoes.notificacoes.relatorios =
        relatorios?.checked || false;


    salvarConfiguracoes();
}


// ==========================================
// CONFIGURAÇÃO DE SEGURANÇA
// ==========================================

function alterarSeguranca() {

    const doisFatores =
        document.getElementById(
            "autenticacaoDoisFatores"
        );


    if (doisFatores) {

        configuracoes.seguranca
            .autenticacaoDoisFatores =
            doisFatores.checked;
    }


    salvarConfiguracoes();
}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagemConfiguracao(
    mensagem
) {

    const elemento =
        document.getElementById(
            "mensagemConfiguracao"
        );


    if (!elemento) {

        console.log(mensagem);

        return;
    }


    elemento.textContent = mensagem;

    elemento.style.display = "block";


    setTimeout(function () {

        elemento.style.display = "none";

    }, 3000);
}
/* ================= adm.dados.js ================= */

// ==========================================
// SAFRA - ADMINISTRADOR
// DADOS
// ==========================================

// Dados exibidos no painel
const dados = {
    produtores: 24,
    propriedades: 18,
    areasCultivadas: 1250,
    producaoTotal: 4850,
    produtividadeMedia: 3.88,

    culturas: {
        soja: 32,
        milho: 25,
        uva: 18,
        manga: 15,
        outras: 10
    },

    regioes: {
        petrolina: 35,
        juazeiro: 30,
        casaNova: 20,
        outras: 15
    }
};


// ==========================================
// ATUALIZAR OS CARDS
// ==========================================

function atualizarDados() {

    const produtores =
        document.querySelector("#totalProdutores");

    const propriedades =
        document.querySelector("#totalPropriedades");

    const areas =
        document.querySelector("#areaCultivada");

    const producao =
        document.querySelector("#producaoTotal");

    const produtividade =
        document.querySelector("#produtividadeMedia");


    if (produtores) {
        produtores.textContent =
            dados.produtores;
    }

    if (propriedades) {
        propriedades.textContent =
            dados.propriedades;
    }

    if (areas) {
        areas.textContent =
            dados.areasCultivadas + " ha";
    }

    if (producao) {
        producao.textContent =
            dados.producaoTotal + " t";
    }

    if (produtividade) {
        produtividade.textContent =
            dados.produtividadeMedia.toFixed(2) +
            " t/ha";
    }
}


// ==========================================
// DADOS DAS CULTURAS
// ==========================================

function carregarCulturas() {

    const soja =
        document.querySelector("#soja");

    const milho =
        document.querySelector("#milho");

    const uva =
        document.querySelector("#uva");

    const manga =
        document.querySelector("#manga");

    const outras =
        document.querySelector("#outras");


    if (soja) {
        soja.textContent =
            dados.culturas.soja + "%";
    }

    if (milho) {
        milho.textContent =
            dados.culturas.milho + "%";
    }

    if (uva) {
        uva.textContent =
            dados.culturas.uva + "%";
    }

    if (manga) {
        manga.textContent =
            dados.culturas.manga + "%";
    }

    if (outras) {
        outras.textContent =
            dados.culturas.outras + "%";
    }
}


// ==========================================
// DADOS DAS REGIÕES
// ==========================================

function carregarRegioes() {

    const petrolina =
        document.querySelector("#petrolina");

    const juazeiro =
        document.querySelector("#juazeiro");

    const casaNova =
        document.querySelector("#casaNova");

    const outrasRegioes =
        document.querySelector("#outrasRegioes");


    if (petrolina) {
        petrolina.textContent =
            dados.regioes.petrolina + "%";
    }

    if (juazeiro) {
        juazeiro.textContent =
            dados.regioes.juazeiro + "%";
    }

    if (casaNova) {
        casaNova.textContent =
            dados.regioes.casaNova + "%";
    }

    if (outrasRegioes) {
        outrasRegioes.textContent =
            dados.regioes.outras + "%";
    }
}


// ==========================================
// FILTRO POR PERÍODO
// ==========================================

function filtrarPeriodo(periodo) {

    console.log(
        "Período selecionado:",
        periodo
    );

    // Aqui futuramente os dados podem
    // ser carregados de uma API.

    atualizarDados();
    carregarCulturas();
    carregarRegioes();
}


// ==========================================
// BOTÃO ATUALIZAR
// ==========================================

function atualizarPainelDados() {

    atualizarDados();
    carregarCulturas();
    carregarRegioes();

    mostrarMensagem(
        "Dados atualizados com sucesso!"
    );
}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(mensagem) {

    const elemento =
        document.querySelector(
            "#mensagemDados"
        );

    if (!elemento) return;

    elemento.textContent =
        mensagem;

    elemento.classList.add("mostrar");


    setTimeout(() => {

        elemento.classList.remove(
            "mostrar"
        );

    }, 2500);
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarDados();

        carregarCulturas();

        carregarRegioes();

    }
);
/* ================= adm.inicial.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Dados do Dashboard Administrativo
    const dados = {
        usuarios: "24",
        integridade: "98,7%",
        processados: "18.452",
        alertas: "3"
    };

    // Elementos do HTML
    const usuarios = document.getElementById("usuarios");
    const integridade = document.getElementById("integridade");
    const processados = document.getElementById("processados");
    const alertas = document.getElementById("alertas");

    // Preenche os dados automaticamente
    if (usuarios) {
        usuarios.textContent = dados.usuarios;
    }

    if (integridade) {
        integridade.textContent = dados.integridade;
    }

    if (processados) {
        processados.textContent = dados.processados;
    }

    if (alertas) {
        alertas.textContent = dados.alertas;
    }

    // Botão de atualizar
    const btnAtualizar = document.querySelector(
        "#btnAtualizar, .btn-atualizar"
    );

    if (btnAtualizar) {

        btnAtualizar.addEventListener("click", () => {

            btnAtualizar.disabled = true;
            btnAtualizar.textContent = "Atualizando...";

            setTimeout(() => {

                if (usuarios) {
                    usuarios.textContent = dados.usuarios;
                }

                if (integridade) {
                    integridade.textContent = dados.integridade;
                }

                if (processados) {
                    processados.textContent = dados.processados;
                }

                if (alertas) {
                    alertas.textContent = dados.alertas;
                }

                btnAtualizar.disabled = false;
                btnAtualizar.textContent = "Atualizar";

                mostrarMensagem(
                    "Informações do sistema atualizadas!"
                );

            }, 800);
        });
    }

    // Animação dos cards
    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {

            card.style.transition = "all 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);

    });

    // Mensagem de confirmação
    function mostrarMensagem(texto) {

        const mensagem = document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "25px";
        mensagem.style.right = "25px";
        mensagem.style.background = "#218149";
        mensagem.style.color = "#ffffff";
        mensagem.style.padding = "13px 20px";
        mensagem.style.borderRadius = "10px";
        mensagem.style.fontSize = "14px";
        mensagem.style.fontWeight = "600";
        mensagem.style.zIndex = "9999";
        mensagem.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.15)";

        document.body.appendChild(mensagem);

        setTimeout(() => {
            mensagem.remove();
        }, 2500);
    }

});
/* ================= adm.logs.js ================= */

// ==========================================
// SAFRA - ADMINISTRADOR
// SISTEMA LOG
// ==========================================

// ==========================================
// DADOS DOS LOGS
// ==========================================

let logs = [

    {
        id: 1,
        usuario: "Administrador",
        acao: "Login realizado",
        tipo: "Login",
        descricao: "Usuário administrador realizou login no sistema.",
        data: "16/09/2026",
        hora: "08:42",
        status: "Sucesso"
    },

    {
        id: 2,
        usuario: "Maria Alves",
        acao: "Atualização de dados",
        tipo: "Dados",
        descricao: "Dados da produção foram atualizados.",
        data: "16/09/2026",
        hora: "09:15",
        status: "Sucesso"
    },

    {
        id: 3,
        usuario: "Administrador",
        acao: "Alteração de permissão",
        tipo: "Permissão",
        descricao: "Permissão do perfil Analista de Dados foi alterada.",
        data: "16/09/2026",
        hora: "09:37",
        status: "Sucesso"
    },

    {
        id: 4,
        usuario: "João Silva",
        acao: "Login realizado",
        tipo: "Login",
        descricao: "Produtor realizou login no sistema.",
        data: "16/09/2026",
        hora: "10:02",
        status: "Sucesso"
    },

    {
        id: 5,
        usuario: "Administrador",
        acao: "Usuário cadastrado",
        tipo: "Usuário",
        descricao: "Novo usuário foi cadastrado no sistema.",
        data: "16/09/2026",
        hora: "10:21",
        status: "Sucesso"
    },

    {
        id: 6,
        usuario: "Carlos Santos",
        acao: "Tentativa de login",
        tipo: "Segurança",
        descricao: "Tentativa de acesso com senha incorreta.",
        data: "16/09/2026",
        hora: "10:45",
        status: "Falha"
    },

    {
        id: 7,
        usuario: "Administrador",
        acao: "Relatório gerado",
        tipo: "Relatório",
        descricao: "Relatório geral do sistema foi gerado.",
        data: "16/09/2026",
        hora: "11:03",
        status: "Sucesso"
    }

];


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const listaLogs =
    document.querySelector("#listaLogs");

const buscarLog =
    document.querySelector("#buscarLog");

const filtroTipoLog =
    document.querySelector("#filtroTipoLog");

const filtroUsuarioLog =
    document.querySelector("#filtroUsuarioLog");


// ==========================================
// RENDERIZAR LOGS
// ==========================================

function renderizarLogs(lista = logs) {

    if (!listaLogs) return;

    listaLogs.innerHTML = "";


    if (lista.length === 0) {

        listaLogs.innerHTML = `

            <div class="nenhum-log">

                <p>
                    Nenhum registro encontrado.
                </p>

            </div>

        `;

        return;
    }


    lista.forEach(log => {

        const item =
            document.createElement("div");


        item.classList.add(
            "item-log"
        );


        const classeStatus =
            log.status === "Sucesso"
                ? "log-sucesso"
                : "log-falha";


        item.innerHTML = `

            <div class="icone-log">

                ${obterIconeLog(log.tipo)}

            </div>


            <div class="informacoes-log">

                <div class="cabecalho-log">

                    <strong>
                        ${log.acao}
                    </strong>

                    <span class="${classeStatus}">
                        ${log.status}
                    </span>

                </div>


                <p>
                    ${log.descricao}
                </p>


                <div class="detalhes-log">

                    <span>
                        👤 ${log.usuario}
                    </span>

                    <span>
                        📅 ${log.data}
                    </span>

                    <span>
                        🕐 ${log.hora}
                    </span>

                </div>

            </div>


            <button
                class="btn-detalhes-log"
                onclick="visualizarLog(${log.id})"
            >
                Ver detalhes
            </button>

        `;


        listaLogs.appendChild(item);

    });

}


// ==========================================
// ÍCONES DOS LOGS
// ==========================================

function obterIconeLog(tipo) {

    switch (tipo) {

        case "Login":
            return "🔐";

        case "Dados":
            return "📊";

        case "Permissão":
            return "🛡️";

        case "Usuário":
            return "👤";

        case "Segurança":
            return "⚠️";

        case "Relatório":
            return "📄";

        default:
            return "📝";

    }

}


// ==========================================
// BUSCAR LOGS
// ==========================================

function pesquisarLogs() {

    const texto =
        buscarLog
            ? buscarLog.value
                .toLowerCase()
                .trim()
            : "";


    const tipo =
        filtroTipoLog
            ? filtroTipoLog.value
            : "Todos";


    const usuario =
        filtroUsuarioLog
            ? filtroUsuarioLog.value
            : "Todos";


    const resultado =
        logs.filter(log => {

            const correspondeTexto =

                log.usuario
                    .toLowerCase()
                    .includes(texto)

                ||

                log.acao
                    .toLowerCase()
                    .includes(texto)

                ||

                log.descricao
                    .toLowerCase()
                    .includes(texto);


            const correspondeTipo =

                tipo === "Todos" ||

                log.tipo === tipo;


            const correspondeUsuario =

                usuario === "Todos" ||

                log.usuario === usuario;


            return (

                correspondeTexto &&

                correspondeTipo &&

                correspondeUsuario

            );

        });


    renderizarLogs(resultado);

}


// ==========================================
// EVENTOS DE PESQUISA
// ==========================================

if (buscarLog) {

    buscarLog.addEventListener(
        "input",
        pesquisarLogs
    );

}


if (filtroTipoLog) {

    filtroTipoLog.addEventListener(
        "change",
        pesquisarLogs
    );

}


if (filtroUsuarioLog) {

    filtroUsuarioLog.addEventListener(
        "change",
        pesquisarLogs
    );

}


// ==========================================
// VISUALIZAR LOG
// ==========================================

function visualizarLog(id) {

    const log =
        logs.find(
            item => item.id === id
        );


    if (!log) return;


    alert(`

DETALHES DO REGISTRO

Usuário:
${log.usuario}

Ação:
${log.acao}

Tipo:
${log.tipo}

Descrição:
${log.descricao}

Data:
${log.data}

Horário:
${log.hora}

Status:
${log.status}

    `);

}


// ==========================================
// LIMPAR FILTROS
// ==========================================

function limparFiltrosLogs() {

    if (buscarLog) {

        buscarLog.value = "";

    }


    if (filtroTipoLog) {

        filtroTipoLog.value = "Todos";

    }


    if (filtroUsuarioLog) {

        filtroUsuarioLog.value = "Todos";

    }


    renderizarLogs();

}


// ==========================================
// ATUALIZAR LOGS
// ==========================================

function atualizarLogs() {

    renderizarLogs();


    mostrarMensagemLog(
        "Sistema de logs atualizado!"
    );

}


// ==========================================
// CONTADORES
// ==========================================

function atualizarContadoresLogs() {

    const totalLogs =
        document.querySelector(
            "#totalLogs"
        );


    const logsSucesso =
        document.querySelector(
            "#logsSucesso"
        );


    const logsFalha =
        document.querySelector(
            "#logsFalha"
        );


    const logins =
        document.querySelector(
            "#totalLogins"
        );


    const sucesso =
        logs.filter(
            log =>
                log.status === "Sucesso"
        ).length;


    const falhas =
        logs.filter(
            log =>
                log.status === "Falha"
        ).length;


    const quantidadeLogins =
        logs.filter(
            log =>
                log.tipo === "Login"
        ).length;


    if (totalLogs) {

        totalLogs.textContent =
            logs.length;

    }


    if (logsSucesso) {

        logsSucesso.textContent =
            sucesso;

    }


    if (logsFalha) {

        logsFalha.textContent =
            falhas;

    }


    if (logins) {

        logins.textContent =
            quantidadeLogins;

    }

}


// ==========================================
// EXPORTAR LOGS
// ==========================================

function exportarLogs() {

    if (logs.length === 0) {

        alert(
            "Não existem logs para exportar."
        );

        return;
    }


    let csv =
        "Usuário;Ação;Tipo;Descrição;Data;Hora;Status\n";


    logs.forEach(log => {

        csv +=

            `${log.usuario};` +
            `${log.acao};` +
            `${log.tipo};` +
            `${log.descricao};` +
            `${log.data};` +
            `${log.hora};` +
            `${log.status}\n`;

    });


    const arquivo =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(arquivo);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "safra-logs.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    mostrarMensagemLog(
        "Logs exportados com sucesso!"
    );

}


// ==========================================
// MENSAGEM DO SISTEMA
// ==========================================

function mostrarMensagemLog(texto) {

    let mensagem =
        document.querySelector(
            "#mensagemLog"
        );


    if (!mensagem) {

        mensagem =
            document.createElement("div");

        mensagem.id =
            "mensagemLog";

        mensagem.className =
            "mensagem-log";

        document.body.appendChild(
            mensagem
        );

    }


    mensagem.textContent =
        texto;


    mensagem.classList.add(
        "mostrar"
    );


    setTimeout(() => {

        mensagem.classList.remove(
            "mostrar"
        );

    }, 2500);

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderizarLogs();

        atualizarContadoresLogs();

    }
);
/* ================= adm.permissoes.js ================= */

// ==========================================
// SAFRA - ADMIN
// PÁGINA DE PERMISSÕES
// ==========================================

let permissoes = [
    {
        id: 1,
        perfil: "Administrador",
        descricao: "Acesso completo ao sistema",
        usuarios: 2,
        dashboard: true,
        usuariosSistema: true,
        permissoes: true,
        dados: true,
        logs: true,
        relatorios: true,
        alertas: true,
        configuracoes: true
    },

    {
        id: 2,
        perfil: "Analista de Dados",
        descricao: "Acesso aos dados e análises",
        usuarios: 5,
        dashboard: true,
        usuariosSistema: false,
        permissoes: false,
        dados: true,
        logs: true,
        relatorios: true,
        alertas: true,
        configuracoes: false
    },

    {
        id: 3,
        perfil: "Produtor",
        descricao: "Acesso aos dados da produção",
        usuarios: 17,
        dashboard: true,
        usuariosSistema: false,
        permissoes: false,
        dados: true,
        logs: false,
        relatorios: true,
        alertas: true,
        configuracoes: false
    }
];


// ==========================================
// ELEMENTOS
// ==========================================

const listaPermissoes =
    document.querySelector("#listaPermissoes");

const busca =
    document.querySelector("#buscarPermissao");

const filtro =
    document.querySelector("#filtroPermissao");

const btnSalvar =
    document.querySelector("#salvarPermissoes");


// ==========================================
// MOSTRAR PERMISSÕES
// ==========================================

function mostrarPermissoes(lista = permissoes) {

    if (!listaPermissoes) return;

    listaPermissoes.innerHTML = "";

    lista.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("card-permissao");

        card.innerHTML = `

            <div class="cabecalho-permissao">

                <div>

                    <h3>
                        ${item.perfil}
                    </h3>

                    <p>
                        ${item.descricao}
                    </p>

                </div>

                <span>
                    ${item.usuarios} usuários
                </span>

            </div>


            <div class="permissoes-grid">

                ${criarPermissao(
                    item.id,
                    "dashboard",
                    "Dashboard"
                )}

                ${criarPermissao(
                    item.id,
                    "usuariosSistema",
                    "Usuários"
                )}

                ${criarPermissao(
                    item.id,
                    "permissoes",
                    "Permissões"
                )}

                ${criarPermissao(
                    item.id,
                    "dados",
                    "Dados"
                )}

                ${criarPermissao(
                    item.id,
                    "logs",
                    "Logs do sistema"
                )}

                ${criarPermissao(
                    item.id,
                    "relatorios",
                    "Relatórios"
                )}

                ${criarPermissao(
                    item.id,
                    "alertas",
                    "Alertas"
                )}

                ${criarPermissao(
                    item.id,
                    "configuracoes",
                    "Configurações"
                )}

            </div>

        `;

        listaPermissoes.appendChild(card);

    });
}


// ==========================================
// CRIAR PERMISSÃO
// ==========================================

function criarPermissao(
    id,
    nome,
    titulo
) {

    const perfil = permissoes.find(
        item => item.id === id
    );

    const ativada = perfil[nome];

    return `

        <div class="permissao-item">

            <div class="permissao-info">

                <span>
                    ${titulo}
                </span>

                <small>
                    ${
                        ativada
                            ? "Acesso permitido"
                            : "Acesso bloqueado"
                    }
                </small>

            </div>


            <label class="switch">

                <input
                    type="checkbox"
                    ${
                        ativada
                            ? "checked"
                            : ""
                    }

                    onchange="
                        alterarPermissao(
                            ${id},
                            '${nome}',
                            this.checked
                        )
                    "
                >

                <span class="slider"></span>

            </label>

        </div>

    `;
}


// ==========================================
// ALTERAR PERMISSÃO
// ==========================================

function alterarPermissao(
    id,
    permissao,
    valor
) {

    const perfil = permissoes.find(
        item => item.id === id
    );

    if (!perfil) return;

    perfil[permissao] = valor;

    mostrarPermissoes();

}


// ==========================================
// BUSCAR
// ==========================================

function pesquisarPermissoes() {

    const texto =
        busca.value
            .toLowerCase()
            .trim();

    const perfilSelecionado =
        filtro.value;


    const resultado =
        permissoes.filter(item => {

            const correspondeNome =
                item.perfil
                    .toLowerCase()
                    .includes(texto);

            const correspondeFiltro =
                perfilSelecionado === "Todos" ||
                item.perfil === perfilSelecionado;

            return (
                correspondeNome &&
                correspondeFiltro
            );

        });


    mostrarPermissoes(resultado);

}


if (busca) {

    busca.addEventListener(
        "input",
        pesquisarPermissoes
    );

}


if (filtro) {

    filtro.addEventListener(
        "change",
        pesquisarPermissoes
    );

}


// ==========================================
// SALVAR
// ==========================================

if (btnSalvar) {

    btnSalvar.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "safraPermissoes",
                JSON.stringify(permissoes)
            );

            alert(
                "Permissões salvas com sucesso!"
            );

        }
    );

}


// ==========================================
// CARREGAR DADOS SALVOS
// ==========================================

function carregarPermissoes() {

    const dados =
        localStorage.getItem(
            "safraPermissoes"
        );

    if (!dados) return;

    try {

        permissoes = JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar permissões:",
            erro
        );

    }

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarPermissoes();

        mostrarPermissoes();

    }
);
/* ================= adm.relatorios.js ================= */

// ==========================================
// RELATÓRIOS - PAINEL ADMINISTRADOR
// ==========================================

// Dados dos relatórios
let relatorios = [
    {
        id: 1,
        nome: "Relatório Geral do Sistema",
        tipo: "Sistema",
        descricao: "Resumo geral dos usuários, propriedades e produção.",
        periodo: "Mensal",
        data: "10/09/2026",
        responsavel: "Administrador",
        status: "Disponível"
    },
    {
        id: 2,
        nome: "Relatório de Usuários",
        tipo: "Usuários",
        descricao: "Informações sobre usuários cadastrados e acessos ao sistema.",
        periodo: "Mensal",
        data: "09/09/2026",
        responsavel: "Administrador",
        status: "Disponível"
    },
    {
        id: 3,
        nome: "Relatório de Produção",
        tipo: "Produção",
        descricao: "Dados da produção agrícola registrada no sistema.",
        periodo: "Trimestral",
        data: "08/09/2026",
        responsavel: "Administrador",
        status: "Disponível"
    },
    {
        id: 4,
        nome: "Relatório de Propriedades",
        tipo: "Propriedades",
        descricao: "Resumo das propriedades cadastradas e suas áreas cultivadas.",
        periodo: "Mensal",
        data: "07/09/2026",
        responsavel: "Administrador",
        status: "Disponível"
    },
    {
        id: 5,
        nome: "Relatório de Atividades",
        tipo: "Atividades",
        descricao: "Registro das principais atividades realizadas pelos usuários.",
        periodo: "Semanal",
        data: "06/09/2026",
        responsavel: "Administrador",
        status: "Disponível"
    }
];


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    renderizarRelatorios();

    // Pesquisa
    const campoBusca = document.getElementById("buscarRelatorio");

    if (campoBusca) {
        campoBusca.addEventListener("input", renderizarRelatorios);
    }

    // Filtro por tipo
    const filtroTipo = document.getElementById("filtroTipoRelatorio");

    if (filtroTipo) {
        filtroTipo.addEventListener("change", renderizarRelatorios);
    }

    // Filtro por período
    const filtroPeriodo = document.getElementById("filtroPeriodoRelatorio");

    if (filtroPeriodo) {
        filtroPeriodo.addEventListener("change", renderizarRelatorios);
    }

    atualizarIndicadores();
});


// ==========================================
// RENDERIZAR RELATÓRIOS
// ==========================================

function renderizarRelatorios() {

    const lista = document.getElementById("listaRelatorios");

    if (!lista) return;

    const busca = document
        .getElementById("buscarRelatorio")
        ?.value
        .toLowerCase() || "";

    const tipo = document
        .getElementById("filtroTipoRelatorio")
        ?.value || "todos";

    const periodo = document
        .getElementById("filtroPeriodoRelatorio")
        ?.value || "todos";


    const filtrados = relatorios.filter(relatorio => {

        const correspondeBusca =
            relatorio.nome.toLowerCase().includes(busca) ||
            relatorio.tipo.toLowerCase().includes(busca) ||
            relatorio.descricao.toLowerCase().includes(busca);

        const correspondeTipo =
            tipo === "todos" ||
            relatorio.tipo === tipo;

        const correspondePeriodo =
            periodo === "todos" ||
            relatorio.periodo === periodo;

        return (
            correspondeBusca &&
            correspondeTipo &&
            correspondePeriodo
        );
    });


    lista.innerHTML = "";


    if (filtrados.length === 0) {

        lista.innerHTML = `
            <div class="sem-relatorios">
                <p>📄 Nenhum relatório encontrado.</p>
            </div>
        `;

        return;
    }


    filtrados.forEach(relatorio => {

        const card = document.createElement("div");

        card.className = "card-relatorio";

        card.innerHTML = `
            <div class="icone-relatorio">
                ${obterIconeRelatorio(relatorio.tipo)}
            </div>

            <div class="informacoes-relatorio">

                <h3>${relatorio.nome}</h3>

                <p>${relatorio.descricao}</p>

                <div class="dados-relatorio">

                    <span>
                        📊 ${relatorio.tipo}
                    </span>

                    <span>
                        📅 ${relatorio.data}
                    </span>

                    <span>
                        🕐 ${relatorio.periodo}
                    </span>

                </div>

                <small>
                    Responsável: ${relatorio.responsavel}
                </small>

            </div>

            <div class="acoes-relatorio">

                <span class="status-relatorio">
                    ✓ ${relatorio.status}
                </span>

                <button
                    onclick="visualizarRelatorio(${relatorio.id})">
                    👁️ Visualizar
                </button>

                <button
                    onclick="baixarRelatorio(${relatorio.id})">
                    ⬇️ Baixar
                </button>

            </div>
        `;

        lista.appendChild(card);
    });
}


// ==========================================
// ÍCONE DE CADA TIPO DE RELATÓRIO
// ==========================================

function obterIconeRelatorio(tipo) {

    switch (tipo) {

        case "Sistema":
            return "⚙️";

        case "Usuários":
            return "👥";

        case "Produção":
            return "🌱";

        case "Propriedades":
            return "🏡";

        case "Atividades":
            return "📋";

        default:
            return "📄";
    }
}


// ==========================================
// VISUALIZAR RELATÓRIO
// ==========================================

function visualizarRelatorio(id) {

    const relatorio = relatorios.find(
        item => item.id === id
    );

    if (!relatorio) return;


    alert(
        `RELATÓRIO\n\n` +
        `Nome: ${relatorio.nome}\n` +
        `Tipo: ${relatorio.tipo}\n` +
        `Período: ${relatorio.periodo}\n` +
        `Data: ${relatorio.data}\n` +
        `Responsável: ${relatorio.responsavel}\n\n` +
        `${relatorio.descricao}`
    );
}


// ==========================================
// BAIXAR RELATÓRIO
// ==========================================

function baixarRelatorio(id) {

    const relatorio = relatorios.find(
        item => item.id === id
    );

    if (!relatorio) return;


    const conteudo = [
        ["RELATÓRIO"],
        [],
        ["Nome", relatorio.nome],
        ["Tipo", relatorio.tipo],
        ["Descrição", relatorio.descricao],
        ["Período", relatorio.periodo],
        ["Data", relatorio.data],
        ["Responsável", relatorio.responsavel],
        ["Status", relatorio.status]
    ];


    const csv = conteudo
        .map(linha =>
            linha
                .map(campo => `"${campo}"`)
                .join(";")
        )
        .join("\n");


    const blob = new Blob(
        ["\ufeff" + csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        relatorio.nome
            .replace(/\s+/g, "_")
            .toLowerCase() + ".csv";

    link.click();

    URL.revokeObjectURL(url);


    mostrarMensagemRelatorio(
        "Relatório baixado com sucesso!"
    );
}


// ==========================================
// GERAR NOVO RELATÓRIO
// ==========================================

function gerarRelatorio() {

    const tipo = prompt(
        "Digite o tipo do relatório:\n\n" +
        "Sistema\n" +
        "Usuários\n" +
        "Produção\n" +
        "Propriedades\n" +
        "Atividades"
    );

    if (!tipo) return;


    const nome = prompt(
        "Digite o nome do relatório:"
    );

    if (!nome) return;


    const novoRelatorio = {

        id: relatorios.length > 0
            ? Math.max(...relatorios.map(r => r.id)) + 1
            : 1,

        nome: nome,

        tipo: tipo,

        descricao:
            "Relatório gerado pelo administrador.",

        periodo: "Mensal",

        data:
            new Date().toLocaleDateString("pt-BR"),

        responsavel: "Administrador",

        status: "Disponível"
    };


    relatorios.push(novoRelatorio);


    salvarRelatorios();

    renderizarRelatorios();

    atualizarIndicadores();


    mostrarMensagemRelatorio(
        "Novo relatório gerado com sucesso!"
    );
}


// ==========================================
// FILTRAR POR PERÍODO
// ==========================================

function filtrarPeriodoRelatorio(periodo) {

    const filtro =
        document.getElementById(
            "filtroPeriodoRelatorio"
        );

    if (filtro) {
        filtro.value = periodo;
    }

    renderizarRelatorios();
}


// ==========================================
// LIMPAR FILTROS
// ==========================================

function limparFiltrosRelatorios() {

    const busca =
        document.getElementById(
            "buscarRelatorio"
        );

    const tipo =
        document.getElementById(
            "filtroTipoRelatorio"
        );

    const periodo =
        document.getElementById(
            "filtroPeriodoRelatorio"
        );


    if (busca) busca.value = "";

    if (tipo) tipo.value = "todos";

    if (periodo) periodo.value = "todos";


    renderizarRelatorios();
}


// ==========================================
// INDICADORES DO DASHBOARD
// ==========================================

function atualizarIndicadores() {

    const total =
        document.getElementById("totalRelatorios");

    const disponiveis =
        document.getElementById("relatoriosDisponiveis");

    const mensais =
        document.getElementById("relatoriosMensais");

    const trimestrais =
        document.getElementById("relatoriosTrimestrais");


    if (total) {
        total.textContent =
            relatorios.length;
    }


    if (disponiveis) {
        disponiveis.textContent =
            relatorios.filter(
                r => r.status === "Disponível"
            ).length;
    }


    if (mensais) {
        mensais.textContent =
            relatorios.filter(
                r => r.periodo === "Mensal"
            ).length;
    }


    if (trimestrais) {
        trimestrais.textContent =
            relatorios.filter(
                r => r.periodo === "Trimestral"
            ).length;
    }
}


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarRelatorios() {

    localStorage.setItem(
        "relatoriosADM",
        JSON.stringify(relatorios)
    );
}


// ==========================================
// CARREGAR RELATÓRIOS SALVOS
// ==========================================

function carregarRelatorios() {

    const dadosSalvos =
        localStorage.getItem(
            "relatoriosADM"
        );

    if (dadosSalvos) {

        relatorios =
            JSON.parse(dadosSalvos);

        renderizarRelatorios();

        atualizarIndicadores();
    }
}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagemRelatorio(mensagem) {

    const elemento =
        document.getElementById(
            "mensagemRelatorio"
        );

    if (!elemento) {
        console.log(mensagem);
        return;
    }


    elemento.textContent = mensagem;

    elemento.style.display = "block";


    setTimeout(() => {

        elemento.style.display = "none";

    }, 3000);
}


// ==========================================
// ATUALIZAR MANUALMENTE
// ==========================================

function atualizarRelatorios() {

    renderizarRelatorios();

    atualizarIndicadores();

    mostrarMensagemRelatorio(
        "Relatórios atualizados!"
    );
}


// ==========================================
// CARREGAR DADOS SALVOS AO ABRIR
// ==========================================

carregarRelatorios();
/* ================= adm.usuarios.js ================= */

// ==========================================
// SAFRA - ADMINISTRADOR
// GERENCIAMENTO DE USUÁRIOS
// ==========================================

// Lista inicial de usuários
let usuarios = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        perfil: "Produtor",
        status: "Ativo",
        ultimoAcesso: "Hoje, 09:42"
    },
    {
        id: 2,
        nome: "Maria Alves",
        email: "maria@email.com",
        perfil: "Analista de Dados",
        status: "Ativo",
        ultimoAcesso: "Hoje, 08:15"
    },
    {
        id: 3,
        nome: "Carlos Santos",
        email: "carlos@email.com",
        perfil: "Produtor",
        status: "Ativo",
        ultimoAcesso: "Ontem, 17:30"
    },
    {
        id: 4,
        nome: "Ana Oliveira",
        email: "ana@email.com",
        perfil: "Administrador",
        status: "Ativo",
        ultimoAcesso: "Hoje, 10:05"
    },
    {
        id: 5,
        nome: "Pedro Souza",
        email: "pedro@email.com",
        perfil: "Produtor",
        status: "Pendente",
        ultimoAcesso: "Ainda não acessou"
    }
];


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const tabelaUsuarios = document.querySelector("#tabelaUsuarios");

const campoBusca = document.querySelector("#buscarUsuario");

const filtroPerfil = document.querySelector("#filtroPerfil");

const filtroStatus = document.querySelector("#filtroStatus");

const btnNovoUsuario = document.querySelector("#novoUsuario");


// ==========================================
// RENDERIZAR USUÁRIOS
// ==========================================

function renderizarUsuarios(lista = usuarios) {

    if (!tabelaUsuarios) return;

    tabelaUsuarios.innerHTML = "";

    if (lista.length === 0) {

        tabelaUsuarios.innerHTML = `
            <tr>
                <td colspan="5" class="nenhum-usuario">
                    Nenhum usuário encontrado.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(usuario => {

        const inicial = usuario.nome
            .split(" ")
            .map(nome => nome[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

        const statusClasse =
            usuario.status.toLowerCase() === "ativo"
                ? "status-ativo"
                : "status-pendente";

        const linha = document.createElement("tr");

        linha.innerHTML = `

            <td>

                <div class="usuario-info">

                    <div class="avatar-usuario">
                        ${inicial}
                    </div>

                    <div>
                        <strong>${usuario.nome}</strong>

                        <small>
                            ${usuario.email}
                        </small>
                    </div>

                </div>

            </td>


            <td>

                <span class="perfil-usuario">
                    ${usuario.perfil}
                </span>

            </td>


            <td>

                <span class="status ${statusClasse}">

                    <span class="bolinha-status"></span>

                    ${usuario.status}

                </span>

            </td>


            <td>
                ${usuario.ultimoAcesso}
            </td>


            <td>

                <div class="acoes-usuario">

                    <button
                        class="btn-editar"
                        onclick="editarUsuario(${usuario.id})"
                        title="Editar usuário"
                    >
                        ✎
                    </button>

                    <button
                        class="btn-opcoes"
                        onclick="abrirOpcoes(${usuario.id})"
                        title="Mais opções"
                    >
                        ⋮
                    </button>

                </div>

            </td>

        `;

        tabelaUsuarios.appendChild(linha);

    });

}


// ==========================================
// BUSCAR USUÁRIO
// ==========================================

function buscarUsuarios() {

    const texto = campoBusca
        ? campoBusca.value.toLowerCase().trim()
        : "";

    const perfil = filtroPerfil
        ? filtroPerfil.value
        : "Todos";

    const status = filtroStatus
        ? filtroStatus.value
        : "Todos";


    const resultado = usuarios.filter(usuario => {

        const correspondeBusca =
            usuario.nome.toLowerCase().includes(texto) ||
            usuario.email.toLowerCase().includes(texto);

        const correspondePerfil =
            perfil === "Todos" ||
            usuario.perfil === perfil;

        const correspondeStatus =
            status === "Todos" ||
            usuario.status === status;

        return (
            correspondeBusca &&
            correspondePerfil &&
            correspondeStatus
        );

    });


    renderizarUsuarios(resultado);

}


// ==========================================
// EVENTOS DE BUSCA
// ==========================================

if (campoBusca) {

    campoBusca.addEventListener(
        "input",
        buscarUsuarios
    );

}


if (filtroPerfil) {

    filtroPerfil.addEventListener(
        "change",
        buscarUsuarios
    );

}


if (filtroStatus) {

    filtroStatus.addEventListener(
        "change",
        buscarUsuarios
    );

}


// ==========================================
// NOVO USUÁRIO
// ==========================================

if (btnNovoUsuario) {

    btnNovoUsuario.addEventListener(
        "click",
        abrirCadastroUsuario
    );

}


function abrirCadastroUsuario() {

    const nome = prompt(
        "Digite o nome do novo usuário:"
    );

    if (!nome) return;


    const email = prompt(
        "Digite o e-mail do usuário:"
    );

    if (!email) return;


    const perfil = prompt(
        "Digite o perfil (Produtor, Analista de Dados ou Administrador):"
    );

    if (!perfil) return;


    const novoUsuario = {

        id: Date.now(),

        nome: nome,

        email: email,

        perfil: perfil,

        status: "Pendente",

        ultimoAcesso: "Ainda não acessou"

    };


    usuarios.push(novoUsuario);

    renderizarUsuarios();

    atualizarIndicadores();

    alert(
        "Usuário cadastrado com sucesso!"
    );

}


// ==========================================
// EDITAR USUÁRIO
// ==========================================

function editarUsuario(id) {

    const usuario = usuarios.find(
        item => item.id === id
    );

    if (!usuario) return;


    const novoNome = prompt(
        "Nome do usuário:",
        usuario.nome
    );

    if (novoNome) {
        usuario.nome = novoNome;
    }


    const novoEmail = prompt(
        "E-mail do usuário:",
        usuario.email
    );

    if (novoEmail) {
        usuario.email = novoEmail;
    }


    const novoPerfil = prompt(
        "Perfil do usuário:",
        usuario.perfil
    );

    if (novoPerfil) {
        usuario.perfil = novoPerfil;
    }


    renderizarUsuarios();

    atualizarIndicadores();

}


// ==========================================
// MENU DE OPÇÕES
// ==========================================

function abrirOpcoes(id) {

    const usuario = usuarios.find(
        item => item.id === id
    );

    if (!usuario) return;


    const opcao = prompt(
        `Opções para ${usuario.nome}:

1 - Ativar usuário
2 - Desativar usuário
3 - Excluir usuário
4 - Cancelar`
    );


    switch (opcao) {

        case "1":

            usuario.status = "Ativo";

            renderizarUsuarios();

            atualizarIndicadores();

            break;


        case "2":

            usuario.status = "Pendente";

            renderizarUsuarios();

            atualizarIndicadores();

            break;


        case "3":

            excluirUsuario(id);

            break;


        default:

            break;

    }

}


// ==========================================
// EXCLUIR USUÁRIO
// ==========================================

function excluirUsuario(id) {

    const usuario = usuarios.find(
        item => item.id === id
    );

    if (!usuario) return;


    const confirmar = confirm(
        `Deseja realmente excluir ${usuario.nome}?`
    );


    if (!confirmar) return;


    usuarios = usuarios.filter(
        item => item.id !== id
    );


    renderizarUsuarios();

    atualizarIndicadores();

}


// ==========================================
// ATUALIZAR INDICADORES
// ==========================================

function atualizarIndicadores() {

    const total = usuarios.length;

    const ativos = usuarios.filter(
        usuario => usuario.status === "Ativo"
    ).length;

    const pendentes = usuarios.filter(
        usuario => usuario.status === "Pendente"
    ).length;


    // Total de usuários
    const totalElement =
        document.querySelector("#totalUsuarios");

    if (totalElement) {
        totalElement.textContent = total;
    }


    // Usuários ativos
    const ativosElement =
        document.querySelector("#usuariosAtivos");

    if (ativosElement) {
        ativosElement.textContent = ativos;
    }


    // Usuários aguardando acesso
    const pendentesElement =
        document.querySelector("#aguardandoAcesso");

    if (pendentesElement) {
        pendentesElement.textContent = pendentes;
    }


    // Porcentagem de usuários ativos
    const porcentagemElement =
        document.querySelector("#porcentagemAtivos");

    if (porcentagemElement) {

        const porcentagem =
            total > 0
                ? ((ativos / total) * 100).toFixed(1)
                : 0;

        porcentagemElement.textContent =
            `${porcentagem}% do total`;

    }

}


// ==========================================
// NOVOS USUÁRIOS DO MÊS
// ==========================================

function atualizarNovosUsuarios() {

    const novosElement =
        document.querySelector("#novosUsuarios");

    if (!novosElement) return;


    // Exemplo de quantidade de novos usuários
    const novosUsuarios = usuarios.filter(
        usuario => usuario.id > 2
    ).length;


    novosElement.textContent =
        novosUsuarios;

}


// ==========================================
// CLIQUE FORA DOS MENUS
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const menus =
            document.querySelectorAll(
                ".menu-opcoes"
            );

        menus.forEach(menu => {

            if (
                !menu.contains(event.target)
            ) {
                menu.style.display = "none";
            }

        });

    }
);


// ==========================================
// INICIALIZAÇÃO DA PÁGINA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderizarUsuarios();

        atualizarIndicadores();

        atualizarNovosUsuarios();

    }
);

/* ============================================================
   NAVEGAÇÃO DAS TELAS UNIFICADAS
   Cada perfil possui vários dashboards dentro de um único HTML.
   ============================================================ */
(function () {
  function normalizarId(href) {
    if (!href) return null;
    href = href.trim();
    if (!href.startsWith('#')) return null;
    return decodeURIComponent(href.substring(1));
  }

  function mostrarPagina(id, alterarHash = true) {
    const paginas = Array.from(document.querySelectorAll('.safra-page'));
    if (!paginas.length) return;

    const destino = document.getElementById(id);
    const pagina = destino && destino.classList.contains('safra-page')
      ? destino
      : paginas.find(p => p.id === id);

    if (!pagina) return;

    paginas.forEach(p => {
      const ativa = p === pagina;
      p.hidden = !ativa;
      // CORREÇÃO: além do atributo "hidden", é preciso sobrescrever
      // diretamente o style.display, pois várias seções do HTML já vêm
      // com "style='display:none'" fixo no próprio elemento. Esse estilo
      // inline tem prioridade sobre a regra padrão "[hidden]{display:none}"
      // do navegador, então sem esta linha a página nunca aparecia mesmo
      // com "hidden" removido.
      p.style.display = ativa ? '' : 'none';
      p.setAttribute('aria-hidden', String(!ativa));
    });

    // Atualiza o estado visual dos menus em todas as telas unificadas.
    document.querySelectorAll('.menu-item').forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('ativo', href === '#' + pagina.id);
    });

    // Mantém o título da aba de acordo com a dashboard aberta.
    const titulo = pagina.dataset.pageTitle;
    if (titulo) document.title = titulo;

    if (alterarHash) {
      try {
        history.replaceState(null, '', '#' + encodeURIComponent(pagina.id));
      } catch (e) {
        location.hash = pagina.id;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function iniciarNavegacao() {
    const paginas = document.querySelectorAll('.safra-page');
    if (!paginas.length) return;

    // Intercepta somente links internos de dashboard (#id).
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const id = normalizarId(link.getAttribute('href'));
      if (!id) return;

      const destino = document.getElementById(id);
      if (!destino || !destino.classList.contains('safra-page')) return;

      event.preventDefault();
      event.stopPropagation();
      mostrarPagina(id, true);
    }, true);

    // Abre diretamente a dashboard presente na URL, se houver.
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    const inicial = hash && document.getElementById(hash);

    mostrarPagina(
      inicial && inicial.classList.contains('safra-page')
        ? inicial.id
        : paginas[0].id,
      false
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarNavegacao);
  } else {
    iniciarNavegacao();
  }
})();

document.addEventListener("DOMContentLoaded", () => {

    const botoesSair = document.querySelectorAll(".sair, .btn-sair");

    botoesSair.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            evento.preventDefault();

            const confirmar = confirm("Deseja realmente sair da sua conta?");

            if (confirmar) {
                sessionStorage.removeItem("safra_logado");
                window.location.replace("/Frontend/Login/login.html");
            }
        });
    });

});

sessionStorage.removeItem("safra_logado");
localStorage.removeItem("safra_email");