document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("#formLogin");
    const campoEmail = document.querySelector("#email");
    const campoSenha = document.querySelector("#senha");
    const checkboxLembrar = document.querySelector(".lembrar input");
    const botaoEntrar = document.querySelector(".botao");
    const textoBotao = document.querySelector(".botao-texto");
    const botaoMostrarSenha = document.querySelector("#mostrarSenha");
    const linkEsqueciSenha = document.querySelector("#esqueciSenha");

    const API_LOGIN = "http://localhost:3001/login";

    const PAGINAS = {
        produtor: "/Frontend/Produtor/produtor.html",
        analista: "/Frontend/Analista/Analista.html",
        administrador: "/Frontend/ADM/adm.html"
    };

    // Mostrar / ocultar senha
    const ICONE_OCULTO = botaoMostrarSenha.innerHTML;
    const ICONE_VISIVEL = `<svg viewBox="0 0 24 24">
        <path d="M2 12c1.5-4 5.5-7 10-7s8.5 3 10 7c-1.5 4-5.5 7-10 7s-8.5-3-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle></svg>`;

    botaoMostrarSenha.addEventListener("click", () => {
        const visivel = campoSenha.type === "text";
        campoSenha.type = visivel ? "password" : "text";
        botaoMostrarSenha.innerHTML = visivel ? ICONE_OCULTO : ICONE_VISIVEL;
        botaoMostrarSenha.setAttribute(
            "aria-label", visivel ? "Mostrar senha" : "Ocultar senha"
        );
    });

    // Lembrar e-mail
    const emailSalvo = localStorage.getItem("safra_email");
    if (emailSalvo) {
        campoEmail.value = emailSalvo;
        checkboxLembrar.checked = true;
    }

    // Esqueci a senha
    linkEsqueciSenha.addEventListener("click", e => {
        e.preventDefault();
        mostrarMensagem(
            "Entre em contato com o administrador para recuperar sua senha.",
            "info"
        );
    });

    // Validação e envio
    formulario.addEventListener("submit", e => {
        e.preventDefault();

        const email = campoEmail.value.trim();
        const senha = campoSenha.value.trim();

        if (!email) return erro("Digite seu e-mail para continuar.", campoEmail);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return erro("Digite um e-mail válido.", campoEmail);
        if (!senha) return erro("Digite sua senha para continuar.", campoSenha);

        entrar(email, senha);
    });

    function erro(texto, campo) {
        mostrarMensagem(texto, "erro");
        campo.focus();
    }

    async function entrar(email, senha) {
        botaoEntrar.disabled = true;
        textoBotao.textContent = "Entrando...";

        try {
            const resposta = await fetch(API_LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (!dados.sucesso) {
                botaoEntrar.disabled = false;
                textoBotao.textContent = "Entrar";
                return mostrarMensagem(dados.erro || "Não foi possível entrar.", "erro");
            }

            const perfilNormalizado = dados.usuario.perfil
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            if (checkboxLembrar.checked) {
                localStorage.setItem("safra_email", email);
            } else {
                localStorage.removeItem("safra_email");
            }

            sessionStorage.setItem("safra_logado", "1");
            sessionStorage.setItem("safra_usuario", JSON.stringify(dados.usuario));

            mostrarMensagem("Login realizado com sucesso!", "sucesso");

            setTimeout(() => {
                window.location.href = PAGINAS[perfilNormalizado] || PAGINAS.produtor;
            }, 800);

        } catch (erroDeConexao) {
            botaoEntrar.disabled = false;
            textoBotao.textContent = "Entrar";
            mostrarMensagem("Não foi possível conectar ao servidor.", "erro");
        }
    }

    function mostrarMensagem(texto, tipo = "sucesso") {
        const cores = { erro: "#c0392b", info: "#3478a8", sucesso: "#218149" };
        const m = document.createElement("div");
        m.textContent = texto;
        Object.assign(m.style, {
            position: "fixed", bottom: "25px", right: "25px",
            padding: "14px 20px", borderRadius: "10px", color: "#fff",
            fontSize: "14px", fontWeight: "600", zIndex: "9999",
            maxWidth: "360px", boxShadow: "0 5px 20px rgba(0,0,0,.15)",
            background: cores[tipo] || cores.sucesso
        });
        document.body.appendChild(m);
        setTimeout(() => m.remove(), 3000);
    }
});

window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) {
        window.location.reload();
    }
});