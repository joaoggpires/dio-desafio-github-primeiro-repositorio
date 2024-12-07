document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("email").value;
        const password = document.getElementById("senha").value;
        const password_conf = document.getElementById("senha_conf").value;
        const mensagemregistro = document.getElementById("mensagemregistro");

        // Validação do e-mail
        if (!username.includes("@")) {
            mensagemregistro.textContent = "O e-mail deve conter o caractere '@'.";
            return;
        }

        // Validação da senha
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            mensagemregistro.textContent = "A senha deve ter no mínimo 6 caracteres.";
            return;
        }
        if (!hasUpperCase) {
            mensagemregistro.textContent = "A senha deve conter pelo menos uma letra maiúscula.";
            return;
        }
        if (!hasNumber) {
            mensagemregistro.textContent = "A senha deve conter pelo menos um número.";
            return;
        }
        if (!hasSpecialChar) {
            mensagemregistro.textContent = "A senha deve conter pelo menos um caractere especial (ex: !, @, #, etc.).";
            return;
        }

        // Verificação das senhas
        if (password === password_conf) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const emailExists = users.some(user => user.email === username);

            if (emailExists) {
                mensagemregistro.textContent = "E-mail já cadastrado. Tente fazer login ou use outro e-mail.";
                return;
            }

            // Novo usuário com informações adicionais
            const newUser = {
                email: username,
                senha: password,
                saldo: 0, // Saldo inicial
                transacoes: [], // Lista de transações
                metasCriadas: [], // Lista inicial de metas
                despesas: [], // Lista inicial de categorias
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Cadastro realizado com sucesso!");
            window.location.href = "../login/login.html";
            registerForm.reset();
        } else {
            mensagemregistro.textContent = "As senhas não coincidem.";
        }
    });
});
