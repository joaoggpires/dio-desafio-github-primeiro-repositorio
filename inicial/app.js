document.addEventListener('DOMContentLoaded', () => {

    // Modal de Conversor de Moeda
    const currencyConverterBtn = document.getElementById("currencyConverterBtn");
    const currencyConverterModal = document.getElementById("currencyConverterModal");
    const closeCurrencyConverterModal = document.getElementById("closeCurrencyConverterModal");
    const currencyConverterForm = document.getElementById("currencyConverterForm");
    const conversionResult = document.getElementById("conversionResult");
    const atualizacao = document.getElementById("atualizacao");

    // Abre o modal de conversão de moeda
    currencyConverterBtn.addEventListener("click", function () {
        currencyConverterModal.style.display = "flex"; // Exibe o modal
    });

    // Fecha o modal de conversão de moeda
    closeCurrencyConverterModal.addEventListener("click", function () {
        currencyConverterModal.style.display = "none"; // Oculta o modal
    });

    // Realiza a conversão de moeda usando a API da AwesomeAPI
    currencyConverterForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Impede o envio do formulário

        const amount = parseFloat(document.getElementById("amountToConvert").value);
        const currencyType = document.getElementById("currencyType").value;

        if (isNaN(amount) || amount <= 0) {
            alert("Por favor, insira um valor válido para conversão.");
            return;
        }

        try {
            // Chamada à API para obter as taxas de câmbio
            const response = await fetch(`https://economia.awesomeapi.com.br/json/all`);

            // Verifica se a resposta da API é válida
            if (!response.ok) {
                throw new Error("Falha ao acessar a API.");
            }

            const data = await response.json();

            // Adiciona depuração para verificar os dados recebidos
            console.log('Dados recebidos da API:', data);

            // Verifica se a moeda selecionada existe na resposta
            if (!data[currencyType]) {
                alert("A moeda selecionada não está disponível.");
                return;
            }

            // A taxa de conversão da moeda selecionada
            const conversionRate = parseFloat(data[currencyType].ask);

            if (isNaN(conversionRate)) {
                throw new Error("Taxa de conversão inválida.");
            }

            // Realiza a conversão (valor em BRL dividido pela taxa)
            const convertedValue = (amount / conversionRate).toFixed(2);
            conversionResult.textContent = `Valor convertido: ${currencyType} ${convertedValue}`;

            // Exibe a data de atualização da cotação
            const updateDate = data[currencyType].create_date;
            const updateFormatted = new Date(updateDate).toLocaleString('pt-BR');
            atualizacao.textContent = `Cotação atualizada em: ${updateFormatted}`;

        } catch (error) {
            console.error("Erro durante a conversão:", error);
            alert("Erro ao realizar a conversão. Tente novamente mais tarde.");
        }
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", function (e) {
        if (e.target === currencyConverterModal) {
            currencyConverterModal.style.display = "none";
        }
    });
});

