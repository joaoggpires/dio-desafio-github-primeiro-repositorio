document.addEventListener("DOMContentLoaded", function () {
    // Função para obter as transações do localStorage
    function getTransacoes() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        // Substitua pelo e-mail do usuário logado
        const emailUsuarioLogado = "joaogab930@gmail.com"; 
        const usuario = users.find(user => user.email === emailUsuarioLogado);
        return usuario ? usuario.transacoes : [];
    }

    // Função para processar os dados
    function agruparPorMes(transacoes) {
        const meses = Array.from({ length: 12 }, () => 0); // Array para somar valores por mês
        transacoes.forEach(transacao => {
            // Corrigir o formato da data para ser interpretado pelo JavaScript
            const [dia, mes, ano] = transacao.data.split("/").map(Number);
            const data = new Date(ano, mes - 1, dia); // Ajusta o mês (0 = janeiro)
            const mesIndex = data.getMonth(); // Obtém o índice do mês
            meses[mesIndex] += parseFloat(transacao.valor);
        });
        return meses;
    }

    // Configurar e renderizar o gráfico
    function criarGrafico(dados) {
        const ctx = document.getElementById("graficoTransacoes").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ],
                datasets: [{
                    label: "Transações por Mês (R$)",
                    data: dados,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });
    }

    // Carregar transações e exibir gráfico
    const transacoes = getTransacoes();
    const dadosAgrupados = agruparPorMes(transacoes);
    criarGrafico(dadosAgrupados);
});
