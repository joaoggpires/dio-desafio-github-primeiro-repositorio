document.addEventListener("DOMContentLoaded", function () {
  const goalModal = document.getElementById("goalModal");
  const openModalButton = document.getElementById("openModalButton");
  const closeGoalModal = document.getElementById("closeGoalModal");
  const goalForm = document.getElementById("goalForm");
  const goalContainer = document.getElementById("goalContainer");

  // Recupera o e-mail do usuário logado
  const loggedUserEmail = localStorage.getItem("loggedUser");
  if (!loggedUserEmail) {
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "../login/login.html"; // Redireciona para o login
      return;
  }

  // Recupera o usuário logado
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(user => user.email === loggedUserEmail);

  if (!currentUser) {
      alert("Usuário não encontrado. Faça login novamente.");
      localStorage.removeItem("loggedUser"); // Remove dados inválidos
      window.location.href = "../login/login.html"; // Redireciona para o login
      return;
  }

  // Função para atualizar os dados do usuário no localStorage
  function updateUserData() {
      const updatedUsers = users.map(user => user.email === loggedUserEmail ? currentUser : user);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  // Função para renderizar as metas
  function renderGoals() {
      goalContainer.innerHTML = ""; // Limpa o container
      currentUser.metasCriadas.forEach((meta, index) => {
          const progress = Math.min((currentUser.saldo / meta.target) * 100, 100); // Travar em 100%
          const goalCard = document.createElement("div");
          goalCard.className = "goal-card";
          goalCard.innerHTML = `
              <h3>${meta.title}</h3>
              <p>${meta.description}</p>
              <p>Meta: R$ ${meta.target.toFixed(2).replace('.', ',')}</p>
              <div class="progress-bar">
                  <div class="progress" style="width: ${progress}%;"></div>
              </div>
              <p>Progresso: ${progress.toFixed(2)}%</p>
              <button class="delete-btn" data-index="${index}">Excluir Meta</button>
              ${currentUser.saldo >= meta.target ? `<button class="complete-btn" data-index="${index}">Meta Cumprida</button>` : ''}
          `;
          goalContainer.appendChild(goalCard);
      });

      // Adiciona eventos para os botões
      document.querySelectorAll(".delete-btn").forEach(button => {
          button.addEventListener("click", deleteGoal);
      });

      document.querySelectorAll(".complete-btn").forEach(button => {
          button.addEventListener("click", completeGoal);
      });
  }

  // Função para excluir uma meta
  function deleteGoal(event) {
      const goalIndex = event.target.getAttribute("data-index");
      currentUser.metasCriadas.splice(goalIndex, 1); // Remove a meta do array
      updateUserData(); // Atualiza os dados no localStorage
      renderGoals(); // Re-renderiza as metas
  }

  // Função para marcar uma meta como cumprida
  function completeGoal(event) {
      const goalIndex = event.target.getAttribute("data-index");
      const goal = currentUser.metasCriadas[goalIndex];

      if (currentUser.saldo >= goal.target) {
          currentUser.saldo -= goal.target; // Deduz o valor da meta do saldo
          currentUser.metasCriadas.splice(goalIndex, 1); // Remove a meta do array
          alert(`Meta "${goal.title}" cumprida com sucesso!`);
          updateUserData(); // Atualiza os dados no localStorage
          renderGoals(); // Re-renderiza as metas
      } else {
          alert("Saldo insuficiente para cumprir esta meta.");
      }
  }

  // Abre o modal para adicionar metas
  openModalButton.addEventListener("click", () => {
      goalModal.style.display = "block";
  });

  // Fecha o modal de metas
  closeGoalModal.addEventListener("click", () => {
      goalModal.style.display = "none";
  });

  // Submissão do formulário de metas
  goalForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const title = document.getElementById("goalTitle").value;
      const target = parseFloat(document.getElementById("goalTarget").value.replace(',', '.')); // Converte para número
      const description = document.getElementById("goalDescription").value;

      if (!title || isNaN(target) || target <= 0) {
          alert("Preencha os campos corretamente.");
          return;
      }

      const newGoal = {
          title,
          description,
          target,
      };

      // Adiciona a nova meta ao usuário atual
      currentUser.metasCriadas.push(newGoal);
      updateUserData(); // Atualiza os dados no localStorage
      alert("Meta criada com sucesso!");
      renderGoals(); // Re-renderiza as metas
      goalModal.style.display = "none"; // Fecha o modal
      goalForm.reset(); // Reseta o formulário
  });

  // Renderiza as metas ao carregar a página
  renderGoals();
});
