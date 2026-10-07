/*
 * Safra — JavaScript unificado do perfil: Produtor
 * Todos os JS originais deste perfil foram reunidos neste único arquivo.
 */

/* ================= configuracoes.js ================= */

if (!sessionStorage.getItem("safra_logado")) {
    window.location.replace("/Frontend/Login/login.html");
}

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // ELEMENTOS DO FORMULÁRIO
    // ==============================

    const btnSalvar = document.querySelector(
        "#btnSalvar, .btn-salvar"
    );

    const switches = document.querySelectorAll(
        "input[type='checkbox']"
    );

    const campos = document.querySelectorAll(
        "input, select"
    );


    // ==============================
    // SALVAR CONFIGURAÇÕES
    // ==============================

    if (btnSalvar) {

        btnSalvar.addEventListener("click", () => {

            btnSalvar.disabled = true;
            btnSalvar.textContent = "Salvando...";

            // Coleta os dados dos campos
            const configuracoes = {};

            campos.forEach((campo, index) => {

                if (!campo.id && !campo.name) {
                    return;
                }

                const chave =
                    campo.id ||
                    campo.name ||
                    `campo_${index}`;

                if (campo.type === "checkbox") {
                    configuracoes[chave] =
                        campo.checked;
                } else {
                    configuracoes[chave] =
                        campo.value;
                }

            });


            // Salva no navegador
            localStorage.setItem(
                "safra_config_produtor",
                JSON.stringify(configuracoes)
            );


            setTimeout(() => {

                btnSalvar.disabled = false;
                btnSalvar.textContent =
                    "Salvar alterações";

                mostrarMensagem(
                    "Configurações salvas com sucesso!"
                );

            }, 700);

        });

    }


    // ==============================
    // RECUPERAR CONFIGURAÇÕES
    // ==============================

    const configuracoesSalvas =
        localStorage.getItem(
            "safra_config_produtor"
        );


    if (configuracoesSalvas) {

        try {

            const configuracoes =
                JSON.parse(configuracoesSalvas);

            campos.forEach((campo, index) => {

                const chave =
                    campo.id ||
                    campo.name ||
                    `campo_${index}`;

                if (
                    configuracoes[chave] === undefined
                ) {
                    return;
                }

                if (campo.type === "checkbox") {

                    campo.checked =
                        configuracoes[chave];

                } else {

                    campo.value =
                        configuracoes[chave];

                }

            });

        } catch (erro) {

            console.log(
                "Não foi possível carregar as configurações.",
                erro
            );

        }

    }


    // ==============================
    // SWITCHES / NOTIFICAÇÕES
    // ==============================

    switches.forEach(switchElemento => {

        switchElemento.addEventListener(
            "change",
            () => {

                const estado =
                    switchElemento.checked
                        ? "ativada"
                        : "desativada";

                mostrarMensagem(
                    `Configuração ${estado}.`
                );

            }
        );

    });


    // ==============================
    // BOTÃO ALTERAR FOTO
    // ==============================

    const btnAlterarFoto = document.querySelector(
        "#btnAlterarFoto, .btn-alterar-foto"
    );


    if (btnAlterarFoto) {

        btnAlterarFoto.addEventListener(
            "click",
            () => {

                mostrarMensagem(
                    "Opção para alterar a foto selecionada."
                );

            }
        );

    }


    // ==============================
    // BOTÃO ALTERAR SENHA
    // ==============================

    const btnAlterarSenha = document.querySelector(
        "#btnAlterarSenha, .btn-alterar-senha"
    );


    if (btnAlterarSenha) {

        btnAlterarSenha.addEventListener(
            "click",
            () => {

                mostrarMensagem(
                    "Opção para alterar a senha selecionada."
                );

            }
        );

    }


    // ==============================
    // BOTÃO AUTENTICAÇÃO 2 FATORES
    // ==============================

    const btn2FA = document.querySelector(
        "#btn2FA, .btn-2fa"
    );


    if (btn2FA) {

        btn2FA.addEventListener(
            "click",
            () => {

                mostrarMensagem(
                    "Configuração de autenticação em dois fatores."
                );

            }
        );

    }


    // ==============================
    // BOTÃO SAIR
    // ==============================

    const botoesSair = document.querySelectorAll(
        ".sair, .btn-sair"
    );


   botoesSair.forEach(botao => {

    botao.addEventListener(
        "click",
        (evento) => {

            evento.preventDefault();

            const confirmar =
                confirm(
                    "Deseja realmente sair da sua conta?"
                );

            if (confirmar) {

                mostrarMensagem(
                    "Saindo da conta..."
                );

                sessionStorage.removeItem("safra_logado");

                setTimeout(() => {

                   window.location.replace(
                "/Frontend/Login/login.html");

                }, 1000);

            }

        }
    );

});


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .config-card, .secao-config, .configuracao-card"
    );


    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform =
            "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 100);

    });


    // ==============================
    // FUNÇÃO DE MENSAGEM
    // ==============================

    function mostrarMensagem(texto) {

        const mensagem =
            document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "25px";
        mensagem.style.right = "25px";

        mensagem.style.background = "#218149";
        mensagem.style.color = "#ffffff";

        mensagem.style.padding =
            "13px 20px";

        mensagem.style.borderRadius =
            "10px";

        mensagem.style.fontSize =
            "14px";

        mensagem.style.fontWeight =
            "600";

        mensagem.style.zIndex =
            "9999";

        mensagem.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.15)";

        document.body.appendChild(
            mensagem
        );

        setTimeout(() => {
            mensagem.remove();
        }, 2500);

    }

});
/* ================= exportacao.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DA EXPORTAÇÃO
    // ==============================

    const dadosExportacao = {
        lotesAtivos: "4",
        volume: "7.800 kg",
        destinos: "3",
        receita: "R$ 66.300",
        lote: "#024",
        produto: "Uva",
        quantidade: "2.500 kg",
        destino: "Europa",
        demanda: "Alta",
        preco: "R$ 8,50/kg",
        progresso: 80
    };


    // ==============================
    // ELEMENTOS DOS INDICADORES
    // ==============================

    const lotesAtivos = document.querySelector(
        "#lotesAtivos, [data-exportacao='lotes']"
    );

    const volume = document.querySelector(
        "#volumeDisponivel, [data-exportacao='volume']"
    );

    const destinos = document.querySelector(
        "#destinosAtivos, [data-exportacao='destinos']"
    );

    const receita = document.querySelector(
        "#receitaEstimada, [data-exportacao='receita']"
    );


    // ==============================
    // PREENCHER INDICADORES
    // ==============================

    if (lotesAtivos) {
        lotesAtivos.textContent =
            dadosExportacao.lotesAtivos;
    }

    if (volume) {
        volume.textContent =
            dadosExportacao.volume;
    }

    if (destinos) {
        destinos.textContent =
            dadosExportacao.destinos;
    }

    if (receita) {
        receita.textContent =
            dadosExportacao.receita;
    }


    // ==============================
    // FILTROS
    // ==============================

    const btnFiltrar = document.querySelector(
        "#btnFiltrar, .btn-filtrar"
    );

    const filtros = document.querySelectorAll(
        "select"
    );


    if (btnFiltrar) {

        btnFiltrar.addEventListener("click", () => {

            btnFiltrar.disabled = true;
            btnFiltrar.textContent = "Aplicando...";

            setTimeout(() => {

                btnFiltrar.disabled = false;
                btnFiltrar.textContent = "Aplicar filtros";

                mostrarMensagem(
                    "Filtros aplicados com sucesso!"
                );

            }, 600);

        });

    }


    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            console.log(
                "Filtro selecionado:",
                filtro.value
            );

        });

    });


    // ==============================
    // BOTÃO NOVO LOTE
    // ==============================

    const btnNovoLote = document.querySelector(
        "#btnNovoLote, .btn-novo-lote"
    );


    if (btnNovoLote) {

        btnNovoLote.addEventListener("click", () => {

            mostrarMensagem(
                "Cadastro de novo lote selecionado."
            );

        });

    }


    // ==============================
    // PROGRESSO DO LOTE
    // ==============================

    const barrasProgresso = document.querySelectorAll(
        ".barra-progresso, .progress-bar, .progresso"
    );


    barrasProgresso.forEach(barra => {

        const progresso =
            barra.dataset.progresso ||
            dadosExportacao.progresso;

        barra.style.width = "0%";

        setTimeout(() => {

            barra.style.transition =
                "width 1s ease";

            barra.style.width =
                `${progresso}%`;

        }, 400);

    });


    // ==============================
    // PERCENTUAL DO LOTE
    // ==============================

    const percentual = document.querySelector(
        "#percentualExportacao, .percentual-exportacao"
    );


    if (percentual) {

        percentual.textContent =
            `${dadosExportacao.progresso}%`;

    }


    // ==============================
    // BOTÃO VER LOTE
    // ==============================

    const botoesLote = document.querySelectorAll(
        "#btnVerLote, .btn-ver-lote, .ver-lote"
    );


    botoesLote.forEach(botao => {

        botao.addEventListener("click", () => {

            mostrarMensagem(
                `Abrindo detalhes do lote ${dadosExportacao.lote}...`
            );

        });

    });


    // ==============================
    // CLIQUE NO CARD DO LOTE
    // ==============================

    const cardsLote = document.querySelectorAll(
        ".lote-card, .card-lote"
    );


    cardsLote.forEach(card => {

        card.addEventListener("click", (evento) => {

            if (evento.target.closest("button")) {
                return;
            }

            card.classList.toggle("selecionado");

        });

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador, .lote-card, .card-lote"
    );


    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform =
            "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 100);

    });


    // ==============================
    // FUNÇÃO DE MENSAGEM
    // ==============================

    function mostrarMensagem(texto) {

        const mensagem =
            document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "25px";
        mensagem.style.right = "25px";

        mensagem.style.background = "#218149";
        mensagem.style.color = "#ffffff";

        mensagem.style.padding =
            "13px 20px";

        mensagem.style.borderRadius =
            "10px";

        mensagem.style.fontSize =
            "14px";

        mensagem.style.fontWeight =
            "600";

        mensagem.style.zIndex =
            "9999";

        mensagem.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.15)";

        document.body.appendChild(
            mensagem
        );

        setTimeout(() => {
            mensagem.remove();
        }, 2500);

    }

});
/* ================= financeiro.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS FINANCEIROS
    // ==============================

    const dadosFinanceiros = {
        receita: 2480650,
        despesas: 684320,
        resultado: 1796330,
        receber: 420800
    };


    // ==============================
    // ELEMENTOS DO HTML
    // ==============================

    const elementos = {

        receita: document.querySelector(
            "#receita, [data-financeiro='receita']"
        ),

        despesas: document.querySelector(
            "#despesas, [data-financeiro='despesas']"
        ),

        resultado: document.querySelector(
            "#resultado, [data-financeiro='resultado']"
        ),

        receber: document.querySelector(
            "#receber, [data-financeiro='receber']"
        )

    };


    // ==============================
    // FORMATA VALORES EM REAIS
    // ==============================

    function formatarMoeda(valor) {

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    // ==============================
    // ATUALIZA OS VALORES
    // ==============================

    function atualizarFinanceiro() {

        if (elementos.receita) {
            elementos.receita.textContent =
                formatarMoeda(dadosFinanceiros.receita);
        }

        if (elementos.despesas) {
            elementos.despesas.textContent =
                formatarMoeda(dadosFinanceiros.despesas);
        }

        if (elementos.resultado) {
            elementos.resultado.textContent =
                formatarMoeda(dadosFinanceiros.resultado);
        }

        if (elementos.receber) {
            elementos.receber.textContent =
                formatarMoeda(dadosFinanceiros.receber);
        }

    }


    atualizarFinanceiro();


    // ==============================
    // FILTROS
    // ==============================

    const filtros = document.querySelectorAll(
        "select"
    );

    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            mostrarMensagem(
                `Período "${filtro.value}" selecionado.`
            );

        });

    });


    // ==============================
    // BOTÃO NOVA MOVIMENTAÇÃO
    // ==============================

    const btnNovaMovimentacao = document.querySelector(
        "#btnNovaMovimentacao, .btn-nova-movimentacao"
    );

    if (btnNovaMovimentacao) {

        btnNovaMovimentacao.addEventListener("click", () => {

            mostrarMensagem(
                "Nova movimentação financeira selecionada."
            );

        });

    }


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador, .financeiro-card"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);

    });


    // ==============================
    // BOTÕES DE AÇÃO
    // ==============================

    const botoes = document.querySelectorAll(
        ".btn-detalhes, .ver-detalhes, .btn-acao"
    );

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            mostrarMensagem(
                "Abrindo detalhes financeiros..."
            );

        });

    });


    // ==============================
    // FUNÇÃO DE MENSAGEM
    // ==============================

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
/* ================= lavouras.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DAS LAVOURAS
    // ==============================

    const lavouras = [
        {
            nome: "Uva Vitória",
            tipo: "Uva",
            area: "42,5 ha",
            status: "Em produção",
            irrigacao: "Ativa"
        },
        {
            nome: "Manga Palmer",
            tipo: "Manga",
            area: "51,0 ha",
            status: "Em produção",
            irrigacao: "Ativa"
        },
        {
            nome: "Uva Itália",
            tipo: "Uva",
            area: "27,0 ha",
            status: "Em colheita",
            irrigacao: "Ativa"
        }
    ];


    // ==============================
    // BUSCA DE LAVOURAS
    // ==============================

    const campoBusca = document.querySelector(
        "#buscarLavoura, .buscar-lavoura, input[placeholder*='lavoura' i]"
    );

    const cardsLavouras = document.querySelectorAll(
        ".lavoura-card, .card-lavoura"
    );

    if (campoBusca) {

        campoBusca.addEventListener("input", () => {

            const texto = campoBusca.value
                .toLowerCase()
                .trim();

            cardsLavouras.forEach(card => {

                const conteudo = card.textContent
                    .toLowerCase();

                if (conteudo.includes(texto)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }


    // ==============================
    // FILTROS
    // ==============================

    const filtros = document.querySelectorAll(
        "select"
    );

    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            mostrarMensagem(
                `Filtro "${filtro.value}" aplicado.`
            );

        });

    });


    // ==============================
    // BOTÃO NOVA LAVOURA
    // ==============================

    const btnNovaLavoura = document.querySelector(
        "#btnNovaLavoura, .btn-nova-lavoura"
    );

    if (btnNovaLavoura) {

        btnNovaLavoura.addEventListener("click", () => {

            mostrarMensagem(
                "A opção para cadastrar uma nova lavoura foi selecionada."
            );

        });

    }


    // ==============================
    // BOTÕES DOS CARDS
    // ==============================

    const botoesDetalhes = document.querySelectorAll(
        ".btn-detalhes, .ver-detalhes, .btn-lavoura"
    );

    botoesDetalhes.forEach(botao => {

        botao.addEventListener("click", () => {

            const card = botao.closest(
                ".lavoura-card, .card-lavoura"
            );

            if (card) {

                const nome = card.querySelector(
                    "h3, h2, .nome-lavoura"
                );

                if (nome) {

                    mostrarMensagem(
                        `Abrindo detalhes da ${nome.textContent.trim()}...`
                    );

                } else {

                    mostrarMensagem(
                        "Abrindo detalhes da lavoura..."
                    );

                }

            }

        });

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    cardsLavouras.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);

    });


    // ==============================
    // FUNÇÃO DE MENSAGEM
    // ==============================

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
/* ================= relatorio.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DO RELATÓRIO
    // ==============================

    const dadosRelatorio = {
        producao: "842,3 ton",
        area: "120,5 ha",
        receita: "R$ 2.480.650",
        eficiencia: "94%"
    };


    // ==============================
    // ELEMENTOS DOS INDICADORES
    // ==============================

    const producao = document.querySelector(
        "#producao, [data-relatorio='producao']"
    );

    const area = document.querySelector(
        "#area, [data-relatorio='area']"
    );

    const receita = document.querySelector(
        "#receita, [data-relatorio='receita']"
    );

    const eficiencia = document.querySelector(
        "#eficiencia, [data-relatorio='eficiencia']"
    );


    // ==============================
    // PREENCHER OS INDICADORES
    // ==============================

    if (producao) {
        producao.textContent = dadosRelatorio.producao;
    }

    if (area) {
        area.textContent = dadosRelatorio.area;
    }

    if (receita) {
        receita.textContent = dadosRelatorio.receita;
    }

    if (eficiencia) {
        eficiencia.textContent = dadosRelatorio.eficiencia;
    }


    // ==============================
    // FILTROS DO RELATÓRIO
    // ==============================

    const btnFiltrar = document.querySelector(
        "#btnFiltrar, .btn-filtrar"
    );

    const filtros = document.querySelectorAll(
        "select"
    );


    if (btnFiltrar) {

        btnFiltrar.addEventListener("click", () => {

            btnFiltrar.disabled = true;
            btnFiltrar.textContent = "Aplicando...";

            setTimeout(() => {

                btnFiltrar.disabled = false;
                btnFiltrar.textContent = "Aplicar filtros";

                mostrarMensagem(
                    "Filtros aplicados com sucesso!"
                );

            }, 600);

        });

    }


    // Quando o usuário alterar algum filtro
    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            // Apenas registra a alteração.
            // O botão "Aplicar filtros" confirma o filtro.

            console.log(
                "Filtro selecionado:",
                filtro.value
            );

        });

    });


    // ==============================
    // GERAR RELATÓRIO
    // ==============================

    const btnGerarRelatorio = document.querySelector(
        "#btnGerarRelatorio, .btn-gerar-relatorio"
    );


    if (btnGerarRelatorio) {

        btnGerarRelatorio.addEventListener("click", () => {

            btnGerarRelatorio.disabled = true;
            btnGerarRelatorio.textContent = "Gerando...";

            setTimeout(() => {

                const conteudoRelatorio =
`RELATÓRIO SAFRA DO VALE DO SÃO FRANCISCO

Produção total: ${dadosRelatorio.producao}
Área cultivada: ${dadosRelatorio.area}
Receita gerada: ${dadosRelatorio.receita}
Eficiência média: ${dadosRelatorio.eficiencia}

RELATÓRIO DE EXPORTAÇÃO E LOGÍSTICA

Lote: #024
Produto: Uva
Quantidade: 2.500 kg
Destino: Europa
Demanda: Alta
Preço estimado: R$ 8,50/kg
Status do lote: 80%

RESUMO DA EXPORTAÇÃO

Lotes ativos: 4
Volume total: 7.800 kg
Destinos: 3
Receita estimada: R$ 66.300
`;

                baixarRelatorio(
                    conteudoRelatorio,
                    "relatorio-safra.txt"
                );

                btnGerarRelatorio.disabled = false;
                btnGerarRelatorio.textContent =
                    "Gerar relatório";

                mostrarMensagem(
                    "Relatório gerado com sucesso!"
                );

            }, 800);

        });

    }


    // ==============================
    // BOTÃO RELATÓRIO COMPLETO
    // ==============================

    const btnRelatorioCompleto = document.querySelector(
        "#btnRelatorioCompleto, .btn-relatorio-completo"
    );


    if (btnRelatorioCompleto) {

        btnRelatorioCompleto.addEventListener(
            "click",
            () => {

                mostrarMensagem(
                    "Abrindo relatório completo de exportação e logística..."
                );

            }
        );

    }


    // ==============================
    // BOTÕES "VER LOTE"
    // ==============================

    const botoesLote = document.querySelectorAll(
        ".btn-lote, .ver-lote, .btn-detalhes"
    );


    botoesLote.forEach(botao => {

        botao.addEventListener("click", () => {

            const lote =
                botao.closest(
                    ".lote-card, .card-lote, .lote"
                );

            if (lote) {

                const nomeLote =
                    lote.querySelector(
                        "h3, h4, .nome-lote"
                    );

                if (nomeLote) {

                    mostrarMensagem(
                        `Abrindo detalhes do ${nomeLote.textContent.trim()}...`
                    );

                } else {

                    mostrarMensagem(
                        "Abrindo detalhes do lote..."

                    );
                }

            } else {

                mostrarMensagem(
                    "Abrindo detalhes do lote..."
                );

            }

        });

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador, .relatorio-card, .lote-card"
    );


    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);

    });


    // ==============================
    // FUNÇÃO PARA BAIXAR RELATÓRIO
    // ==============================

    function baixarRelatorio(conteudo, nomeArquivo) {

        const arquivo = new Blob(
            [conteudo],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        const url =
            URL.createObjectURL(arquivo);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = nomeArquivo;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    }


    // ==============================
    // FUNÇÃO DE MENSAGEM
    // ==============================

    function mostrarMensagem(texto) {

        const mensagem =
            document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "25px";
        mensagem.style.right = "25px";

        mensagem.style.background = "#218149";
        mensagem.style.color = "#ffffff";

        mensagem.style.padding =
            "13px 20px";

        mensagem.style.borderRadius =
            "10px";

        mensagem.style.fontSize =
            "14px";

        mensagem.style.fontWeight =
            "600";

        mensagem.style.zIndex =
            "9999";

        mensagem.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.15)";

        document.body.appendChild(
            mensagem
        );

        setTimeout(() => {
            mensagem.remove();
        }, 2500);

    }

});
/* ================= telainicial.produtor.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Dados exibidos no Dashboard
    const dados = {
        temperatura: "28°C",
        umidade: "68%",
        preco: "R$ 8,50/kg",
        safra: 82,
        producao: "842,3 ton",
        embarque: "320 ton"
    };

    // Preenche os dados caso os IDs existam no HTML
    const temperatura = document.getElementById("temperatura");
    const umidade = document.getElementById("umidade");
    const preco = document.getElementById("preco");
    const producao = document.getElementById("producao");
    const embarque = document.getElementById("embarque");
    const percentualSafra = document.getElementById("percentualSafra");
    const progressoSafra = document.getElementById("progressoSafra");

    if (temperatura) temperatura.textContent = dados.temperatura;
    if (umidade) umidade.textContent = dados.umidade;
    if (preco) preco.textContent = dados.preco;
    if (producao) producao.textContent = dados.producao;
    if (embarque) embarque.textContent = dados.embarque;

    if (percentualSafra) {
        percentualSafra.textContent = `${dados.safra}%`;
    }

    if (progressoSafra) {
        progressoSafra.style.width = `${dados.safra}%`;
    }

    // Botão atualizar
    const btnAtualizar = document.querySelector("#btnAtualizar, .btn-atualizar");

    if (btnAtualizar) {
        btnAtualizar.addEventListener("click", () => {

            btnAtualizar.disabled = true;
            btnAtualizar.textContent = "Atualizando...";

            setTimeout(() => {

                if (temperatura) temperatura.textContent = dados.temperatura;
                if (umidade) umidade.textContent = dados.umidade;
                if (preco) preco.textContent = dados.preco;

                if (btnAtualizar) {
                    btnAtualizar.disabled = false;
                    btnAtualizar.textContent = "Atualizar";
                }

                mostrarMensagem("Dados atualizados com sucesso!");

            }, 800);
        });
    }

    // Animação da barra de progresso
    if (progressoSafra) {
        progressoSafra.style.width = "0%";

        setTimeout(() => {
            progressoSafra.style.width = `${dados.safra}%`;
        }, 300);
    }

    // Função de mensagem
    function mostrarMensagem(texto) {
        const mensagem = document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "25px";
        mensagem.style.right = "25px";
        mensagem.style.background = "#218149";
        mensagem.style.color = "#fff";
        mensagem.style.padding = "13px 20px";
        mensagem.style.borderRadius = "10px";
        mensagem.style.fontSize = "14px";
        mensagem.style.fontWeight = "600";
        mensagem.style.zIndex = "9999";
        mensagem.style.boxShadow = "0 5px 20px rgba(0,0,0,.15)";

        document.body.appendChild(mensagem);

        setTimeout(() => {
            mensagem.remove();
        }, 2500);
    }

});

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
      p.classList.toggle('pagina-ativa', ativa);
      p.hidden = !ativa;
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

    const paginaPadrao = document.getElementById('telainicial');

    mostrarPagina(
      inicial && inicial.classList.contains('safra-page')
        ? inicial.id
        : (paginaPadrao && paginaPadrao.classList.contains('safra-page') ? paginaPadrao.id : paginas[0].id),
      false
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarNavegacao);
  } else {
    iniciarNavegacao();
  }
})();

/* ============================================================
   ABAS DA PÁGINA DE RELATÓRIOS
   Isola o conteúdo de cada aba (Produção, Financeiro, Clima,
   Exportação) para que apenas a opção selecionada seja exibida.
   ============================================================ */
(function () {
  function iniciarAbasRelatorio() {
    const botoesAba = document.querySelectorAll('.aba[data-aba]');
    if (!botoesAba.length) return;

    botoesAba.forEach(botao => {
      botao.addEventListener('click', () => {
        const alvo = botao.dataset.aba;

        // Ativa somente o botão clicado
        botoesAba.forEach(b => b.classList.toggle('ativa', b === botao));

        // Mostra somente o conteúdo correspondente à aba selecionada
        document.querySelectorAll('.aba-conteudo').forEach(conteudo => {
          conteudo.classList.toggle('ativa', conteudo.id === 'aba-' + alvo);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarAbasRelatorio);
  } else {
    iniciarAbasRelatorio();
  }
})();

sessionStorage.removeItem("safra_logado");
localStorage.removeItem("safra_email");