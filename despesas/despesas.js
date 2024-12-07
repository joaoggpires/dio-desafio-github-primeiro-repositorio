// Atualizar a data no cabeçalho
document.getElementById('dataAtual').textContent = new Date().toLocaleDateString('pt-BR');

// Função para abrir o modal
function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Atualizar a lista de despesas exibida
function atualizarListaDespesas() {
    const loggedUserEmail = localStorage.getItem("loggedUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.email === loggedUserEmail);

    if (!currentUser) {
        alert("Nenhum usuário logado.");
        window.location.href = "../login/login.html";
        return;
    }

    const variaveis = document.getElementById('variaveis');
    const fixas = document.getElementById('fixas');

    // Limpar conteúdos anteriores
    variaveis.innerHTML = '<p><strong>Despesas Variáveis:</strong></p>';
    fixas.innerHTML = '<p><strong>Despesas Fixas:</strong></p>';

    // Adicionar despesas ao card correspondente
    currentUser.despesas.forEach((despesa) => {
        const despesaHTML = `
            <div class="despesa-item">
                <p>${despesa.descricao} - R$ ${despesa.valor.toFixed(2)} (${despesa.categoria})</p>
                <button class="remover-despesa" data-id="${despesa.id}">Remover</button>
            </div>`;
        if (despesa.tipo === 'variaveis') {
            variaveis.innerHTML += despesaHTML;
        } else {
            fixas.innerHTML += despesaHTML;
        }
    });

    // Adicionar eventos aos botões de remover
    document.querySelectorAll('.remover-despesa').forEach((botao) => {
        botao.addEventListener('click', removerDespesa);
    });
}

// Função para adicionar uma nova despesa
function adicionarDespesa() {
    const descricao = document.getElementById('descricao').value.trim();
    const valorInput = document.getElementById('valor').value.trim();
    const valor = parseFloat(valorInput); // Tenta converter para número
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value.trim();

    // Validação básica
    if (!descricao || isNaN(valor) || valor <= 0 || !categoria) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Objeto da nova despesa
    const novaDespesa = { id: Date.now(), descricao, valor, tipo, categoria };

    // Obter o usuário logado
    const loggedUserEmail = localStorage.getItem("loggedUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.email === loggedUserEmail);

    if (!currentUser) {
        alert("Nenhum usuário logado.");
        window.location.href = "../login/login.html";
        return;
    }

    // Adicionar a nova despesa ao vetor de despesas do usuário
    currentUser.despesas.push(novaDespesa);

    // Atualizar os dados do usuário no localStorage
    users = users.map(user => user.email === loggedUserEmail ? currentUser : user);
    localStorage.setItem("users", JSON.stringify(users));

    // Atualizar a lista de despesas exibida
    atualizarListaDespesas();

    // Fechar o modal e limpar os campos
    fecharModal();
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('tipo').value = 'fixas';
    document.getElementById('categoria').value = '';
}

// Função para remover uma despesa
function removerDespesa(event) {
    const despesaId = Number(event.target.dataset.id);

    // Obter o usuário logado
    const loggedUserEmail = localStorage.getItem("loggedUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.email === loggedUserEmail);

    if (!currentUser) {
        alert("Nenhum usuário logado.");
        window.location.href = "../login/login.html";
        return;
    }

    // Remover a despesa do vetor de despesas do usuário
    currentUser.despesas = currentUser.despesas.filter(despesa => despesa.id !== despesaId);

    // Atualizar os dados do usuário no localStorage
    users = users.map(user => user.email === loggedUserEmail ? currentUser : user);
    localStorage.setItem("users", JSON.stringify(users));

    // Atualizar a lista de despesas exibida
    atualizarListaDespesas();
}

// Adicionar eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaDespesas();

    // Abrir o modal ao clicar no botão "Adicionar nova despesa"
    document.getElementById('abrir-modal').addEventListener('click', abrirModal);

    // Fechar o modal ao clicar no botão "X"
    document.getElementById('close-modal').addEventListener('click', fecharModal);

    // Fechar o modal ao clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('modal')) {
            fecharModal();
        }
    });

    // Salvar a despesa ao clicar no botão "Salvar Despesa"
    document.getElementById('salvar-despesa').addEventListener('click', adicionarDespesa);
});
