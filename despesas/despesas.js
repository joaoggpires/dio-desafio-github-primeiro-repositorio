// Função para atualizar a data atual
function atualizarData() {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    document.getElementById('dataAtual').textContent = dataFormatada;
}

// Evento de fechar a página (apenas estético, não redireciona)
document.querySelector('.close-button').addEventListener('click', () => {
    alert('Você clicou para fechar!');
});

// Chamada da função ao carregar a página
window.onload = atualizarData;
