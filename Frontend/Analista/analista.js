/*
 * Safra — JavaScript unificado do perfil: Analista
 * Todos os JS originais deste perfil foram reunidos neste único arquivo.
 */

/* ================= analista.alerta.js ================= */

if (!sessionStorage.getItem("safra_logado")) {
    window.location.replace("/Frontend/Login/login.html");
}

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DOS ALERTAS
    // ==============================

    const alertas = [
        {
            tipo: "urgente",
            titulo: "Baixa precisão no modelo",
            mensagem: "O modelo de estimativa de colheita apresentou queda na precisão.",
            categoria: "Modelos"
        },
        {
            tipo: "atencao",
            titulo: "Dados incompletos",
            mensagem: "Foram identificados dados incompletos em algumas fontes.",
            categoria: "Dados"
        },
        {
            tipo: "informativo",
            titulo: "Modelo atualizado",
            mensagem: "O modelo de previsão climática foi atualizado com sucesso.",
            categoria: "Modelos"
        }
    ];


    // ==============================
    // ELEMENTOS DOS ALERTAS
    // ==============================

    const cardsAlertas = document.querySelectorAll(
        ".alerta, .alerta-card, .card-alerta"
    );


    // ==============================
    // FILTROS
    // ==============================

    const filtros = document.querySelectorAll(
        "select"
    );


    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            const valor = filtro.value
                .toLowerCase()
                .trim();

            cardsAlertas.forEach(card => {

                const texto = card.textContent
                    .toLowerCase();

                if (
                    valor === "" ||
                    valor === "todos" ||
                    valor === "todas"
                ) {

                    card.style.display = "";

                } else if (
                    texto.includes(valor)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

            mostrarMensagem(
                `Filtro "${filtro.value}" aplicado.`
            );

        });

    });


    // ==============================
    // MARCAR ALERTA COMO LIDO
    // ==============================

    const botoesLido = document.querySelectorAll(
        ".marcar-lido, .btn-marcar-lido"
    );


    botoesLido.forEach(botao => {

        botao.addEventListener("click", () => {

            const alerta = botao.closest(
                ".alerta, .alerta-card, .card-alerta"
            );

            if (!alerta) {
                return;
            }

            alerta.classList.add("lido");

            alerta.style.opacity = "0.6";

            botao.textContent = "Lido";

            botao.disabled = true;

            mostrarMensagem(
                "Alerta marcado como lido."
            );

        });

    });


    // ==============================
    // MARCAR TODOS COMO LIDOS
    // ==============================

    const btnMarcarTodos = document.querySelector(
        "#marcarTodosLidos, .marcar-todos-lidos"
    );


    if (btnMarcarTodos) {

        btnMarcarTodos.addEventListener("click", () => {

            cardsAlertas.forEach(alerta => {

                alerta.classList.add("lido");

                alerta.style.opacity = "0.6";

            });


            botoesLido.forEach(botao => {

                botao.textContent = "Lido";
                botao.disabled = true;

            });


            mostrarMensagem(
                "Todos os alertas foram marcados como lidos."
            );

        });

    }


    // ==============================
    // CLIQUE NOS ALERTAS
    // ==============================

    cardsAlertas.forEach(alerta => {

        alerta.addEventListener("click", evento => {

            if (
                evento.target.closest("button") ||
                evento.target.closest("select")
            ) {
                return;
            }

            alerta.classList.toggle(
                "selecionado"
            );

        });

    });


    // ==============================
    // ANIMAÇÃO DOS ALERTAS
    // ==============================

    cardsAlertas.forEach((alerta, index) => {

        alerta.style.opacity = "0";
        alerta.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            alerta.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            alerta.style.opacity = "1";
            alerta.style.transform =
                "translateY(0)";

        }, index * 120);

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
/* ================= analista.configuracoes.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // ELEMENTOS DA PÁGINA
    // ==============================

    const btnSalvar = document.querySelector(
        "#btnSalvar, .btn-salvar"
    );

    const campos = document.querySelectorAll(
        "input, select"
    );

    const switches = document.querySelectorAll(
        "input[type='checkbox']"
    );


    // ==============================
    // SALVAR CONFIGURAÇÕES
    // ==============================

    if (btnSalvar) {

        btnSalvar.addEventListener("click", () => {

            btnSalvar.disabled = true;
            btnSalvar.textContent = "Salvando...";

            const configuracoes = {};

            campos.forEach((campo, index) => {

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


            // Salva as configurações no navegador
            localStorage.setItem(
                "safra_config_maria",
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
    // CARREGAR CONFIGURAÇÕES SALVAS
    // ==============================

    const configuracoesSalvas =
        localStorage.getItem(
            "safra_config_maria"
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
                "Erro ao carregar configurações:",
                erro
            );

        }

    }


    // ==============================
    // SWITCHES
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
    // ALTERAR FOTO
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
    // ALTERAR SENHA
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
    // AUTENTICAÇÃO EM DOIS FATORES
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
/* ================= analista.dados.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DA PÁGINA
    // ==============================

    const dados = {
        processados: "18.452",
        integridade: "98,7%",
        fontes: "8",
        atencao: "12"
    };


    // ==============================
    // ELEMENTOS DOS INDICADORES
    // ==============================

    const processados = document.querySelector(
        "#dadosProcessados, #processados, [data-dados='processados']"
    );

    const integridade = document.querySelector(
        "#integridade, [data-dados='integridade']"
    );

    const fontes = document.querySelector(
        "#fontesDados, #fontes, [data-dados='fontes']"
    );

    const atencao = document.querySelector(
        "#dadosAtencao, #atencao, [data-dados='atencao']"
    );


    // ==============================
    // PREENCHER OS INDICADORES
    // ==============================

    if (processados) {
        processados.textContent = dados.processados;
    }

    if (integridade) {
        integridade.textContent = dados.integridade;
    }

    if (fontes) {
        fontes.textContent = dados.fontes;
    }

    if (atencao) {
        atencao.textContent = dados.atencao;
    }


    // ==============================
    // FILTROS
    // ==============================

    const filtros = document.querySelectorAll(
        "select"
    );


    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            console.log(
                "Filtro selecionado:",
                filtro.value
            );

            mostrarMensagem(
                `Filtro "${filtro.value}" selecionado.`
            );

        });

    });


    // ==============================
    // BOTÕES DE ATUALIZAÇÃO
    // ==============================

    const botoesAtualizar = document.querySelectorAll(
        "#btnAtualizar, .btn-atualizar, .btn-atualizar-dados"
    );


    botoesAtualizar.forEach(botao => {

        botao.addEventListener("click", () => {

            botao.disabled = true;
            botao.textContent = "Atualizando...";


            setTimeout(() => {

                if (processados) {
                    processados.textContent =
                        dados.processados;
                }

                if (integridade) {
                    integridade.textContent =
                        dados.integridade;
                }

                if (fontes) {
                    fontes.textContent =
                        dados.fontes;
                }

                if (atencao) {
                    atencao.textContent =
                        dados.atencao;
                }


                botao.disabled = false;
                botao.textContent = "Atualizar dados";


                mostrarMensagem(
                    "Dados atualizados com sucesso!"
                );

            }, 800);

        });

    });


    // ==============================
    // FONTES DE DADOS
    // ==============================

    const fontesDados = document.querySelectorAll(
        ".fonte-dados, .card-fonte, .fonte-card"
    );


    fontesDados.forEach(fonte => {

        fonte.addEventListener("click", () => {

            const nomeFonte = fonte.querySelector(
                "h3, h4, .nome-fonte"
            );


            if (nomeFonte) {

                mostrarMensagem(
                    `Fonte selecionada: ${nomeFonte.textContent.trim()}`
                );

            } else {

                mostrarMensagem(
                    "Fonte de dados selecionada."
                );

            }

        });

    });


    // ==============================
    // STATUS DOS DADOS
    // ==============================

    const indicadores = document.querySelectorAll(
        ".indicador, .status-dado, .card-status"
    );


    indicadores.forEach(indicador => {

        indicador.addEventListener("click", () => {

            indicador.classList.toggle(
                "selecionado"
            );

        });

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador, .fonte-dados, .card-fonte"
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
/* ================= analista.modelo.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DOS MODELOS
    // ==============================

    const modelos = [
        {
            nome: "Previsão de produtividade",
            precisao: "96,2%",
            versao: "v2.4",
            status: "Ativo"
        },
        {
            nome: "Previsão climática",
            precisao: "94,7%",
            versao: "v3.1",
            status: "Ativo"
        },
        {
            nome: "Estimativa de colheita",
            precisao: "89,4%",
            versao: "v1.8",
            status: "Atenção"
        },
        {
            nome: "Previsão de preço",
            precisao: "93,1%",
            versao: "v2.1",
            status: "Ativo"
        },
        {
            nome: "Qualidade da produção",
            precisao: "91,8%",
            versao: "v1.5",
            status: "Em treinamento"
        },
        {
            nome: "Necessidade de irrigação",
            precisao: "92,6%",
            versao: "v2.0",
            status: "Em treinamento"
        }
    ];


    // ==============================
    // ELEMENTOS DA PÁGINA
    // ==============================

    const cardsModelos = document.querySelectorAll(
        ".modelo-card, .card-modelo"
    );


    // ==============================
    // FILTROS DOS MODELOS
    // ==============================

    const filtros = document.querySelectorAll(
        "select"
    );


    filtros.forEach(filtro => {

        filtro.addEventListener("change", () => {

            const valor = filtro.value
                .toLowerCase()
                .trim();

            cardsModelos.forEach(card => {

                const texto = card.textContent
                    .toLowerCase();

                if (
                    !valor ||
                    valor === "todos" ||
                    valor === "todas"
                ) {

                    card.style.display = "";

                } else if (
                    texto.includes(valor)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    // ==============================
    // BOTÃO CRIAR NOVO MODELO
    // ==============================

    const btnCriarModelo = document.querySelector(
        "#btnCriarModelo, .btn-criar-modelo"
    );


    if (btnCriarModelo) {

        btnCriarModelo.addEventListener("click", () => {

            mostrarMensagem(
                "Opção para criar um novo modelo selecionada."
            );

        });

    }


    // ==============================
    // BOTÕES DOS MODELOS
    // ==============================

    const botoesModelo = document.querySelectorAll(
        ".btn-detalhes, .ver-detalhes, .btn-modelo"
    );


    botoesModelo.forEach(botao => {

        botao.addEventListener("click", () => {

            const card = botao.closest(
                ".modelo-card, .card-modelo"
            );


            if (card) {

                const nome = card.querySelector(
                    "h3, h4, .nome-modelo"
                );


                if (nome) {

                    mostrarMensagem(
                        `Abrindo detalhes de ${nome.textContent.trim()}...`
                    );

                } else {

                    mostrarMensagem(
                        "Abrindo detalhes do modelo..."
                    );

                }

            }

        });

    });


    // ==============================
    // ATUALIZAÇÃO DOS MODELOS
    // ==============================

    const botoesAtualizar = document.querySelectorAll(
        ".btn-atualizar-modelo, .atualizar-modelo"
    );


    botoesAtualizar.forEach(botao => {

        botao.addEventListener("click", () => {

            botao.disabled = true;
            botao.textContent = "Atualizando...";


            setTimeout(() => {

                botao.disabled = false;
                botao.textContent = "Atualizar";

                mostrarMensagem(
                    "Modelo atualizado com sucesso!"
                );

            }, 800);

        });

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    cardsModelos.forEach((card, index) => {

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
/* ================= analista.previsoes.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // DADOS DAS PREVISÕES
    // ==============================

    const previsoes = {
        produtividade: "96,2%",
        clima: "94,7%",
        colheita: "89,4%",
        preco: "93,1%"
    };


    // ==============================
    // ELEMENTOS DAS PREVISÕES
    // ==============================

    const produtividade = document.querySelector(
        "#produtividade, #previsaoProdutividade, [data-previsao='produtividade']"
    );

    const clima = document.querySelector(
        "#clima, #previsaoClima, [data-previsao='clima']"
    );

    const colheita = document.querySelector(
        "#colheita, #previsaoColheita, [data-previsao='colheita']"
    );

    const preco = document.querySelector(
        "#preco, #previsaoPreco, [data-previsao='preco']"
    );


    // ==============================
    // PREENCHER OS DADOS
    // ==============================

    if (produtividade) {
        produtividade.textContent =
            previsoes.produtividade;
    }

    if (clima) {
        clima.textContent =
            previsoes.clima;
    }

    if (colheita) {
        colheita.textContent =
            previsoes.colheita;
    }

    if (preco) {
        preco.textContent =
            previsoes.preco;
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
    // BOTÕES "VER DETALHES"
    // ==============================

    const botoesDetalhes = document.querySelectorAll(
        ".btn-detalhes, .ver-detalhes, #btnDetalhes"
    );


    botoesDetalhes.forEach(botao => {

        botao.addEventListener("click", () => {

            const card = botao.closest(
                ".previsao-card, .card-previsao, .card"
            );

            if (card) {

                const titulo = card.querySelector(
                    "h3, h4, .titulo-previsao"
                );

                if (titulo) {

                    mostrarMensagem(
                        `Abrindo detalhes de ${titulo.textContent.trim()}...`
                    );

                } else {

                    mostrarMensagem(
                        "Abrindo detalhes da previsão..."
                    );

                }

            } else {

                mostrarMensagem(
                    "Abrindo detalhes da previsão..."
                );

            }

        });

    });


    // ==============================
    // BOTÃO ATUALIZAR PREVISÕES
    // ==============================

    const botoesAtualizar = document.querySelectorAll(
        "#btnAtualizar, .btn-atualizar, .btn-atualizar-previsoes"
    );


    botoesAtualizar.forEach(botao => {

        botao.addEventListener("click", () => {

            botao.disabled = true;
            botao.textContent = "Atualizando...";


            setTimeout(() => {

                if (produtividade) {
                    produtividade.textContent =
                        previsoes.produtividade;
                }

                if (clima) {
                    clima.textContent =
                        previsoes.clima;
                }

                if (colheita) {
                    colheita.textContent =
                        previsoes.colheita;
                }

                if (preco) {
                    preco.textContent =
                        previsoes.preco;
                }


                botao.disabled = false;
                botao.textContent =
                    "Atualizar dados";


                mostrarMensagem(
                    "Previsões atualizadas com sucesso!"
                );

            }, 800);

        });

    });


    // ==============================
    // ANIMAÇÃO DAS BARRAS
    // ==============================

    const barras = document.querySelectorAll(
        ".barra, .barra-progresso, .progresso"
    );


    barras.forEach(barra => {

        const valor =
            barra.dataset.valor ||
            barra.dataset.progresso;

        if (valor) {

            barra.style.width = "0%";

            setTimeout(() => {

                barra.style.transition =
                    "width 1s ease";

                barra.style.width =
                    `${valor}%`;

            }, 300);

        }

    });


    // ==============================
    // ANIMAÇÃO DOS CARDS
    // ==============================

    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador, .previsao-card, .card-previsao"
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
/* ================= telainicial.analista.js ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Dados do Dashboard da Analista
    const dados = {
        modelos: "6",
        precisao: "94,8%",
        processados: "18.452",
        previsao: "842,3 ton"
    };

    // Elementos do HTML
    const modelos = document.getElementById("modelos");
    const precisao = document.getElementById("precisao");
    const processados = document.getElementById("processados");
    const previsao = document.getElementById("previsao");

    // Preenche os dados
    if (modelos) modelos.textContent = dados.modelos;
    if (precisao) precisao.textContent = dados.precisao;
    if (processados) processados.textContent = dados.processados;
    if (previsao) previsao.textContent = dados.previsao;

    // Botão atualizar
    const btnAtualizar = document.querySelector("#btnAtualizar, .btn-atualizar");

    if (btnAtualizar) {

        btnAtualizar.addEventListener("click", () => {

            btnAtualizar.disabled = true;
            btnAtualizar.textContent = "Atualizando...";

            setTimeout(() => {

                if (modelos) modelos.textContent = dados.modelos;
                if (precisao) precisao.textContent = dados.precisao;
                if (processados) processados.textContent = dados.processados;
                if (previsao) previsao.textContent = dados.previsao;

                btnAtualizar.disabled = false;
                btnAtualizar.textContent = "Atualizar";

                mostrarMensagem("Dados dos modelos atualizados!");

            }, 800);

        });

    }

    // Pequena animação nos cards
    const cards = document.querySelectorAll(
        ".card, .stat-card, .indicador"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {

            card.style.transition = "all .4s ease";
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
        mensagem.style.color = "#fff";
        mensagem.style.padding = "13px 20px";
        mensagem.style.borderRadius = "10px";
        mensagem.style.fontSize = "14px";
        mensagem.style.fontWeight = "600";
        mensagem.style.zIndex = "9999";
        mensagem.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.15)";

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
      p.hidden = !ativa;
      // CORREÇÃO: sobrescreve também o style.display diretamente, pois
      // várias seções do HTML já vêm com "style='display:none'" fixo no
      // próprio elemento. Esse estilo inline tem prioridade sobre a regra
      // padrão "[hidden]{display:none}" do navegador, então sem esta linha
      // a página nunca aparecia mesmo com "hidden" removido.
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