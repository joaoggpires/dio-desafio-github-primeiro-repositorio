document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('gastosChart').getContext('2d');

    // Dados do gráfico
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        datasets: [{
            label: 'Gastos em R$',
            data: [1200, 900, 750, 800, 950, 1100,7,8,9,10,11,12],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Configuração do gráfico
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor em Reais (R$)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            }
        }
    };

    // Renderiza o gráfico
    new Chart(ctx, config);
});
