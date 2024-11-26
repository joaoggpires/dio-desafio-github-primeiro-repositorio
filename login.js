document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const mensagemloggin = document.getElementById("mensagemloggin");
    let registra = false;

    document.getElementById("cadastrar").addEventListener("click", function () {
        window.location.href = "registro.html";
        registra = true;
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.some(user => user.email === username && user.senha === password);

        if (userFound) {

            window.location.href = "menu.html";
        } else {

            if (!registra) {
                mensagemloggin.textContent = "Login ou senha incorretos";
            }
        }
    });
});
