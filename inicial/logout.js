document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function () {
        // Remove o usuário logado do localStorage
        localStorage.removeItem("loggedUser");

        // Redireciona para a página de login
        alert("Você saiu da sua conta.");
        window.location.href = "../login/login.html"; // Substitua pelo caminho correto para a página de login
    });
});
