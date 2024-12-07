document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const mensagemloggin = document.getElementById("mensagemloggin");
    let registra = false;

    // Redirecionar para a página de registro
    document.getElementById("cadastrar").addEventListener("click", function () {
        window.location.href = "../registro/registro.html";
        registra = true;
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Recupera os usuários do localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verifica se o usuário existe com o e-mail e senha fornecidos
        const userFound = users.find(user => user.email === username && user.senha === password);

        if (userFound) {
            // Armazena o e-mail do usuário logado no localStorage
            localStorage.setItem("loggedUser", userFound.email);

            // Redireciona para a página inicial após o login bem-sucedido
            alert(`Bem-vindo(a), ${userFound.email}!`);
            window.location.href = "../inicial/inicial.html";
        } else {
            // Exibe mensagem de erro caso o login falhe
            if (!registra) {
                mensagemloggin.textContent = "Login ou senha incorretos";
            }
        }
    });
});
