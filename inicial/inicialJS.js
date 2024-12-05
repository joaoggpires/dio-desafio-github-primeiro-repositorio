document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.querySelector('.close');
    const transactionForm = document.getElementById('transactionForm');
    const currentBalanceElement = document.getElementById('currentBalance');

    // Abre o modal ao clicar no botão
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Fecha o modal ao clicar no 'x'
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha o modal clicando fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Manipula o envio do formulário
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const transactionType = document.getElementById('transactionType').value;

        let currentBalance = parseFloat(
            currentBalanceElement.textContent.replace('R$', '').replace('.', '').replace(',', '.')
        );

        if (transactionType === 'add') {
            currentBalance += amount;
        } else if (transactionType === 'subtract') {
            currentBalance -= amount;
        }

        // Atualiza o saldo exibido
        currentBalanceElement.textContent = `R$ ${currentBalance.toFixed(2).replace('.', ',')}`;
        currentBalanceElement.className = currentBalance >= 0 ? 'positive' : 'negative';

        // Fecha o modal
        modal.style.display = 'none';
        transactionForm.reset();
    });
});

// Obtém os elementos do botão e do modal
const metasBtn = document.getElementById("metasBtn");
const despesasBtn = document.getElementById("despesasBtn");
const metasModal = document.getElementById("metasModal");
const closeMetasModal = document.getElementById("closeMetasModal");
const relatorioBtn = document.getElementById("relatorioBtn");
// Quando o botão de "Metas" for clicado, exibe o modal
metasBtn.onclick = function() {
 //   metasModal.style.display = "block"; // Exibe o modal
    window.location.href="../metas/metas.html"
}
relatorioBtn.onclick = function() {
    window.location.href = "../relatorio/relatorio.html";
}
despesaBtn.onclick = function() {
    window.location.href = "../despesas/despesas.html";
}
/* Quando o usuário clicar no botão de fechar (X), fecha o modal
closeMetasModal.onclick = function() {
    metasModal.style.display = "none"; // Esconde o modal
}

// Quando o usuário clicar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == metasModal) {
        metasModal.style.display = "none"; // Esconde o modal
    }
}
*/
// Função para criar metas e atualizar a lista de metas
document.getElementById('formMeta').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtém os valores dos campos de entrada
    const metaNome = document.getElementById('metaNome').value;
    const metaValor = document.getElementById('metaValor').value;

    // Cria um novo elemento de meta
    const metaDiv = document.createElement('div');
    metaDiv.classList.add('meta');

    // Exibe a meta com o nome e valor
    metaDiv.innerHTML = `
        <h4>${metaNome}</h4>
        <p>Meta: R$ ${metaValor}</p>
        <p>Progresso: R$ 0,00</p>
    `;

    // Adiciona a meta à lista de metas
    document.getElementById('metasList').appendChild(metaDiv);

    // Limpa os campos do formulário
    document.getElementById('metaNome').value = '';
    document.getElementById('metaValor').value = '';
    
    // Fecha o modal após a criação da meta
    metasModal.style.display = "none";
});