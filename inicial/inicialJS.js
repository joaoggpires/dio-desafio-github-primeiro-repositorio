document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.querySelector('.close');
    const transactionForm = document.getElementById('transactionForm');
    const currentBalanceElement = document.getElementById('currentBalance');
    const expensesElement = document.getElementById('expenses');

    const setLimitBtn = document.getElementById("setLimitBtn");
    const setLimitModal = document.getElementById("setLimitModal");
    const closeLimitModal = document.getElementById("closeLimitModal");
    const setLimitForm = document.getElementById("setLimitForm");

    const metasBtn = document.getElementById("metasBtn");
    const despesasBtn = document.getElementById("despesasBtn");
    const relatorioBtn = document.getElementById("relatorioBtn");

    const amountInput = document.getElementById('amount');

    // Obter o e-mail do usuário logado
    const loggedUserEmail = localStorage.getItem("loggedUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.email === loggedUserEmail);

    if (!currentUser) {
        alert("Nenhum usuário logado. Redirecionando para a página de login.");
        window.location.href = "../login/login.html";
        return;
    }

    let currentBalance = currentUser.saldo || 0;
    let totalExpenses = currentUser.despesas.reduce((total, despesa) => total + despesa.valor, 0);
    let paymentLimit = currentUser.paymentLimit || null;

    // Atualizar exibição dos valores
    function updateDisplay() {
        currentBalanceElement.textContent = `R$ ${currentBalance.toFixed(2).replace('.', ',')}`;
        expensesElement.textContent = `R$ ${totalExpenses.toFixed(2).replace('.', ',')}`;

        currentBalanceElement.className = currentBalance >= 0 ? 'positive' : 'negative';
        expensesElement.className = totalExpenses >= 0 ? 'positive' : 'negative';
    }

    // Atualizar dados do usuário logado no localStorage
    function updateUserData() {
        currentUser.saldo = currentBalance;
        currentUser.transacoes = [...currentUser.transacoes]; // Salva transações
        currentUser.despesas = [...currentUser.despesas];
        currentUser.paymentLimit = paymentLimit;
        users = users.map(user => user.email === loggedUserEmail ? currentUser : user);
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Restringir a entrada no campo de valor a dois dígitos decimais
    amountInput.addEventListener('input', (event) => {
        let value = event.target.value;
        if (!/^\d*([.,]\d{0,2})?$/.test(value)) {
            event.target.value = value.slice(0, -1);
        }
    });

    // Abrir modal
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Fechar modal
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar modal clicando fora
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === setLimitModal) {
            setLimitModal.style.display = 'none';
        }
    });

    // Submissão do formulário de transação
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let amountInput = document.getElementById('amount').value.trim();
        amountInput = amountInput.replace(',', '.'); // Substitui vírgulas por pontos
        const amount = parseFloat(amountInput); // Converte para número

        if (isNaN(amount) || amount <= 0) {
            alert("Por favor, insira um valor válido. Exemplo: 10,10 ou 10.10");
            return;
        }

        const transactionType = document.getElementById('transactionType').value;
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${
            (now.getMonth() + 1).toString().padStart(2, '0')
        }/${now.getFullYear()}`;

        let transactionValue = transactionType === 'add' ? amount : -amount;

        // Atualiza saldo
        if (transactionType === 'add') {
            currentBalance += amount;
        } else if (transactionType === 'subtract') {
            if (paymentLimit !== null && amount > paymentLimit) {
                alert(`A transação excede o limite de pagamento definido (R$ ${paymentLimit.toFixed(2).replace('.', ',')}).`);
                return;
            }
            currentBalance -= amount;
            totalExpenses += amount; // Adicionar à soma de despesas
        }

        // Adiciona transação ao vetor
        const newTransaction = {
            valor: transactionValue,
            data: formattedDate
        };

        currentUser.transacoes.push(newTransaction);

        // Atualiza dados do usuário no localStorage
        updateUserData();

        // Atualiza exibição
        updateDisplay();
        modal.style.display = 'none';
        transactionForm.reset();
    });

    // Abrir modal de limite
    setLimitBtn.addEventListener('click', () => {
        setLimitModal.style.display = 'flex';
    });

    // Fechar modal de limite
    closeLimitModal.addEventListener('click', () => {
        setLimitModal.style.display = 'none';
    });

    // Definir limite de pagamento
    setLimitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let limitInput = document.getElementById("paymentLimit").value.trim();
        limitInput = limitInput.replace(',', '.'); // Substitui vírgulas por pontos
        const limit = parseFloat(limitInput);

        if (isNaN(limit) || limit <= 0) {
            alert("Por favor, insira um limite válido.");
            return;
        }

        paymentLimit = limit;
        updateUserData();

        alert(`Limite de pagamento definido como R$ ${paymentLimit.toFixed(2).replace('.', ',')}`);
        setLimitModal.style.display = 'none';
        setLimitForm.reset();
    });

    // Navegação entre páginas
    metasBtn.addEventListener('click', () => {
        window.location.href = "../metas/metas.html";
    });

    relatorioBtn.addEventListener('click', () => {
        window.location.href = "../relatorio/relatorio.html";
    });

    despesasBtn.addEventListener('click', () => {
        window.location.href = "../despesas/despesas.html";
    });

    // Atualizar exibição ao carregar a página
    updateDisplay();
});
