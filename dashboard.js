// =================================================================
// SCRIPT ÚNICO PARA TODAS AS PÁGINAS DA ÁREA LOGADA
// =================================================================

document.addEventListener("DOMContentLoaded", function () {
  function aplicarMascaraMonetaria(input) {
    input.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
      value = (parseInt(value, 10) / 100).toFixed(2); // Divide por 100 para colocar duas casas
      if (isNaN(value)) value = "0.00";
      e.target.value = value
        .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        .replace("R$", "") // Remove o "R$" se quiser mostrar só número
        .trim();
    });
  }

  // --- SIMULAÇÃO DE PESSOAS ONLINE ---
  function startOnlineCounter() {
    let currentCount = Math.floor(500 + Math.random() * 100);

    function updateCount() {
      const change = Math.floor(Math.random() * 20 - 10); // de -10 a +10
      currentCount = Math.max(500, Math.min(1000, currentCount + change));
      document.querySelectorAll(".online-count").forEach((el) => {
        el.textContent = currentCount;
      });
    }

    updateCount();
    setInterval(updateCount, 4000);
  }

  startOnlineCounter();

  // --- MENU MOBILE ---
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-sidebar-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  function openSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add("visible");
      sidebarOverlay.classList.remove("hidden");
    }
  }
  function closeSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove("visible");
      sidebarOverlay.classList.add("hidden");
    }
  }

  if (menuBtn && closeMenuBtn && sidebar && sidebarOverlay) {
    menuBtn.addEventListener("click", openSidebar);
    closeMenuBtn.addEventListener("click", closeSidebar);
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // --- DADOS DO USUÁRIO ---
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  // 2. O "segurança". Se não tiver token, volta para o login.
  /*if (!token || !userId) {
    alert("Você não está logado. Por favor, faça o login.");
    window.location.href = "index.html";
    return;
  }*/

  // --- EXIBIR NOME E SALDO ---
  function updateUserDataDisplay() {
    const nickname = localStorage.getItem("userNickname") || "Jogador";
    const balance = localStorage.getItem("userWalletBalance") || 0;
    try {
      const formattedBalance = parseFloat(balance).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      document
        .querySelectorAll(".profile-name")
        .forEach((el) => (el.textContent = nickname));
      document
        .querySelectorAll(".welcome-message h1")
        .forEach((el) => (el.textContent = `Bem-vindo de volta, ${nickname}!`));
      document
        .querySelectorAll(
          "#wallet-balance, #wallet-balance-desktop, .balance-display strong, .balance-values strong"
        )
        .forEach((el) => (el.textContent = formattedBalance));
    } catch (error) {
      console.error("Erro ao exibir dados do usuário:", error);
    }
  }

  function startWalletPollingNovo(intervalInMs = 5000) {
    let pollingIntervalId;

    async function atualizarSaldo() {
      if (!userId || !token) {
        console.warn("Token ou ID do usuário não encontrado.");
        updateUserDataDisplay();
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/Game/GetWallet?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const contentType = response.headers.get("content-type");
        if (
          !response.ok ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          const text = await response.text();
          throw new Error("Resposta inválida:\n" + text);
        }

        const data = await response.json();
        localStorage.setItem("userWalletBalance", data.balance);
        updateUserDataDisplay();
      } catch (err) {
        console.error("Erro ao atualizar saldo:", err.message || err);
        updateUserDataDisplay();
      }
    }

    atualizarSaldo();
    pollingIntervalId = setInterval(atualizarSaldo, intervalInMs);

    return () => clearInterval(pollingIntervalId);
  }

  const pararAtualizacao = startWalletPollingNovo();

  // --- LOGOUT ---
  const logoutButton = document.querySelector(".logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "index.html";
    });
  }

  // --- HISTÓRICO (FAKE) ---
  const historyTableBody = document.getElementById("transaction-history-body");
  if (historyTableBody) {
    const fakeTransactionHistory = [
      {
        type: "Depósito",
        date: "21/06/2025",
        amount: 50.0,
        status: "Concluído",
      },
      { type: "Saque", date: "20/06/2025", amount: -20.0, status: "Pendente" },
      {
        type: "Depósito",
        date: "21/06/2025",
        amount: 50.0,
        status: "Concluído",
      },
      { type: "Saque", date: "20/06/2025", amount: -20.0, status: "Pendente" },
      {
        type: "Depósito",
        date: "21/06/2025",
        amount: 50.0,
        status: "Concluído",
      },
      { type: "Saque", date: "20/06/2025", amount: -20.0, status: "Pendente" },
      {
        type: "Depósito",
        date: "21/06/2025",
        amount: 50.0,
        status: "Concluído",
      },
      { type: "Saque", date: "20/06/2025", amount: -20.0, status: "Pendente" },
      {
        type: "Prêmio de Jogo",
        date: "19/06/2025",
        amount: 15.5,
        status: "Concluído",
      },
    ];
    historyTableBody.innerHTML = "";
    fakeTransactionHistory.forEach((tx) => {
      const statusClass =
        {
          Concluído: "status-completed",
          Pendente: "status-pending",
          Cancelado: "status-cancelled",
        }[tx.status] || "";
      historyTableBody.innerHTML += `<tr><td>${tx.type}</td><td>${
        tx.date
      }</td><td>${tx.amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</td><td><span class="status ${statusClass}">${
        tx.status
      }</span></td></tr>`;
    });
  }

  // ===================================================
  // LÓGICA DO HISTÓRICO DE PARTIDAS
  // ===================================================

  const historyListEl = document.getElementById("match-history-list");

  function fetchMatchHistory() {
    const fakeMatchHistory = [
      {
        gameName: "Xadrez",
        opponent: "JogadorSombrio",
        result: "win",
        amount: 10.0,
        date: "21/06/2025",
      },
      {
        gameName: "Aventura Colorida",
        opponent: "MestreDasCores",
        result: "loss",
        amount: -5.0,
        date: "20/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "RainhaDoGambito",
        result: "win",
        amount: 20.0,
        date: "20/06/2025",
      },
      {
        gameName: "Arena dos Campeões",
        opponent: "LutadorX",
        result: "loss",
        amount: -15.0,
        date: "19/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "TorreDeFerro",
        result: "win",
        amount: 5.0,
        date: "18/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "JogadorSombrio",
        result: "win",
        amount: 10.0,
        date: "21/06/2025",
      },
      {
        gameName: "Aventura Colorida",
        opponent: "MestreDasCores",
        result: "loss",
        amount: -5.0,
        date: "20/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "RainhaDoGambito",
        result: "win",
        amount: 20.0,
        date: "20/06/2025",
      },
      {
        gameName: "Arena dos Campeões",
        opponent: "LutadorX",
        result: "loss",
        amount: -15.0,
        date: "19/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "TorreDeFerro",
        result: "win",
        amount: 5.0,
        date: "18/06/2025",
      },
    ];

    if (historyListEl) {
      historyListEl.innerHTML = "";
      fakeMatchHistory.forEach((match) => {
        const resultClass = match.result;
        const amountPrefix = match.amount > 0 ? "+" : "";

        const cardHTML = `
                    <div class="match-card ${resultClass}">
                        <div class="match-info">
                            <span class="game-name">${match.gameName}</span>
                            <span class="opponent-info">vs ${
                              match.opponent
                            }</span>
                        </div>
                        <div class="match-result">
                            <strong class="match-amount ${resultClass}">
                                ${amountPrefix}${match.amount.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}
                            </strong>
                            <span class="match-date">${match.date}</span>
                        </div>
                    </div>
                `;

        historyListEl.innerHTML += cardHTML;
      });
    }
  }

  if (window.location.pathname.includes("historico")) {
    fetchMatchHistory();
  }

  // --- FORMULÁRIO DE CONFIGURAÇÕES ---
  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newSettings = {
        nickname: document.getElementById("nickname").value,
        currentPassword: document.getElementById("current-password").value,
        newPassword: document.getElementById("new-password").value,
        emailNotifications: document.getElementById("email-notifications")
          .checked,
      };
      if (newSettings.newPassword && !newSettings.currentPassword) {
        alert("Por favor, insira sua senha atual para definir uma nova.");
        return;
      }
      alert("Alterações salvas com sucesso! (Simulação)");
    });
  }

  // --- MODAL DE DEPÓSITO ---
  const openDepositBtns = document.querySelectorAll(
    ".btn-deposit, .btn-deposit-main"
  );
  const depositModal1 = document.getElementById("deposit-modal-1");
  const depositModal2 = document.getElementById("deposit-modal-2");

  if (openDepositBtns.length > 0 && depositModal1 && depositModal2) {
    const form1 = document.getElementById("deposit-form-1");
    const amountInput = document.getElementById("deposit-amount");
    const summaryAmount = document.getElementById("summary-amount");
    const summaryFee = document.getElementById("summary-fee");
    const summaryTotal = document.getElementById("summary-total");
    const paymentTotalValue = document.getElementById("payment-total-value");
    const pixCodeInput = document.getElementById("pix-copy-paste-code");
    const copyCodeBtn = document.getElementById("copy-pix-code-btn");
    const countdownTimerEl = document.getElementById("countdown-timer");
    const paymentView = document.getElementById("payment-view");
    const confirmationView = document.getElementById("confirmation-view");
    let countdownInterval;

    const openModal1 = () => {
      amountInput.value = "";
      updateDepositFee(0);
      depositModal1.classList.remove("hidden");
    };
    const closeModal1 = () => depositModal1.classList.add("hidden");
    const openModal2 = () => {
      depositModal2.classList.remove("hidden");
      startTimer(600);
      paymentView.classList.remove("hidden");
      confirmationView.classList.add("hidden");
      depositModal2.querySelector(".close-button").classList.add("hidden");
    };
    const closeModal2 = () => {
      depositModal2.classList.add("hidden");
      clearInterval(countdownInterval);
    };
    if (amountInput) {
      aplicarMascaraMonetaria(amountInput);
    }

    function updateDepositFee(amount) {
      const value = parseFloat(amount) || 0;
      const feeRate = 0.01;
      const fee = value * feeRate;
      const total = value + fee;
      const formatBRL = (num) =>
        num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      summaryAmount.textContent = formatBRL(value);
      summaryFee.textContent = formatBRL(fee);
      summaryTotal.textContent = formatBRL(total);
      paymentTotalValue.textContent = formatBRL(total);
    }

    function startTimer(durationInSeconds) {
      let timer = durationInSeconds;
      clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdownTimerEl.textContent = `Pagamento expira em: ${minutes}:${seconds}`;
        if (--timer < 0) {
          clearInterval(countdownInterval);
          countdownTimerEl.textContent = "Tempo esgotado!";
        }
      }, 1000);
    }

    function startPixPaymentPolling(orderId) {
      let retries = 600; // tenta por até 600 segundos (10 min)
      const interval = setInterval(async () => {
        if (retries-- <= 0) {
          clearInterval(interval);
          countdownTimerEl.textContent =
            "Pagamento não confirmado no tempo esperado.";
          return;
        }

        try {
          fetch(`${API_BASE_URL}/api/Game/GetWallet?userId=${userId}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
          })
            .then((response) => {
              console.log("Status:", response.status);
              console.log(
                "Content-Type:",
                response.headers.get("content-type")
              );
              return response.text();
            })
            .then((text) => {
              console.log("Resposta bruta:", text);
              let result;
              try {
                result = JSON.parse(text);
              } catch {
                throw new Error("Resposta não é JSON");
              }

              if (result.status === "confirmed") {
                clearInterval(interval);
                clearInterval(countdownInterval);
                paymentView.classList.add("hidden");
                confirmationView.classList.remove("hidden");
                depositModal2
                  .querySelector(".close-button")
                  .classList.remove("hidden");
                fetchWalletBalance();
              } else {
                console.log("Status não confirmado:", result);
              }
            });
        } catch (err) {
          console.error("Erro ao verificar pagamento:", err);
        }
      }, 2000); // verifica a cada 2 segundos
    }

    openDepositBtns.forEach((btn) => btn.addEventListener("click", openModal1));
    depositModal1
      .querySelector(".close-button")
      .addEventListener("click", closeModal1);
    document
      .getElementById("deposit-back-btn-1")
      .addEventListener("click", closeModal1);
    amountInput.addEventListener("input", (e) =>
      updateDepositFee(e.target.value)
    );

    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      const depositValue = parseFloat(amountInput.value.replace(",", ".")) || 0;

      if (!depositValue || depositValue < 1) {
        alert("O valor mínimo para depósito é de R$ 1,00.");
        return;
      }
      const advanceButton = form1.querySelector(".btn-entrar");
      advanceButton.disabled = true;
      advanceButton.textContent = "Gerando PIX...";

      fetch(
        `${API_BASE_URL}/api/Game/GenerateNewOrder?userId=${userId}&value=${depositValue}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
        }
      )
        .then((response) => {
          if (!response.ok)
            return response.json().then((err) => {
              throw new Error(err.message || "Erro ao gerar pedido PIX.");
            });
          return response.json();
        })
        .then((data) => {
          pixCodeInput.value = data.pixCopiaECola;
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            data.pixCopiaECola
          )}`;
          document.getElementById("pix-qr-code-img").src = qrCodeUrl;
          closeModal1();
          openModal2();
          startPixPaymentPolling(data.orderId);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          advanceButton.disabled = false;
          advanceButton.textContent = "Avançar";
        });
    });
  }

  // ===================================================
  // LÓGICA DO MODAL DE SAQUE
  // ===================================================
  const openWithdrawButton = document.querySelector(".btn-withdraw");
  const withdrawModal = document.getElementById("withdraw-modal-overlay");

  if (openWithdrawButton && withdrawModal) {
    const withdrawForm = document.getElementById("withdraw-form");
    const withdrawAmountInput = document.getElementById("withdraw-amount");
    const closeWithdrawButton = withdrawModal.querySelector(".close-button");
    const withdrawSubmitBtn = document.getElementById("withdraw-submit-btn");
    const summaryAmount = document.getElementById("withdraw-summary-amount");
    const summaryFee = document.getElementById("withdraw-summary-fee");
    const summaryTotal = document.getElementById("withdraw-summary-total");

    const pixKeyInput = document.getElementById("pix-key");
    if (pixKeyInput) {
      pixKeyInput.addEventListener("input", () => {
        const errorMsg = document.getElementById("withdraw-error");
        if (errorMsg) errorMsg.classList.add("hidden");
      });
    }
    if (withdrawAmountInput) {
      aplicarMascaraMonetaria(withdrawAmountInput);
    }

    function openWithdrawModal() {
      withdrawAmountInput.value = "";
      updateWithdrawFee();
      withdrawModal.classList.remove("hidden");
    }

    function closeWithdrawModal() {
      withdrawModal.classList.add("hidden");
    }

    function parseInputValue() {
      let raw = withdrawAmountInput.value.trim();

      // Substitui vírgula por ponto, para garantir compatibilidade com parseFloat
      raw = raw.replace(",", ".");

      // Ignora se terminar com ponto (ex: '50.')
      if (raw.endsWith(".")) return null;

      const parsed = parseFloat(raw);
      return isNaN(parsed) ? null : parsed;
    }

    function updateWithdrawFee() {
      const value = parseInputValue();

      if (value === null) return; // não atualiza se valor incompleto

      const feeRate = 0.01;
      const fee = value * feeRate;
      const total = value - fee;

      const formatBRL = (num) =>
        isNaN(num)
          ? "R$ 0,00"
          : num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      summaryAmount.textContent = formatBRL(value);
      summaryFee.textContent = formatBRL(fee);
      summaryTotal.textContent = formatBRL(total);
    }

    openWithdrawButton.addEventListener("click", openWithdrawModal);
    closeWithdrawButton.addEventListener("click", closeWithdrawModal);
    withdrawAmountInput.addEventListener("input", updateWithdrawFee);

    withdrawForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const valueToWithdraw =
        parseFloat(withdrawAmountInput.value.replace(",", ".")) || 0;
      const pixKey = document.getElementById("pix-key").value.trim();

      if (!valueToWithdraw || valueToWithdraw < 1) {
        alert("O valor mínimo para saque é de R$ 1,00.");
        return;
      }

      if (!pixKey) {
        alert("Por favor, informe sua chave PIX para o saque.");
        return;
      }

      withdrawSubmitBtn.disabled = true;
      withdrawSubmitBtn.textContent = "Processando...";

      fetch(
        `${API_BASE_URL}/api/Game/Withdraw?userId=${userId}&value=${valueToWithdraw}&pixKey=${encodeURIComponent(
          pixKey
        )}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Erro ao processar o saque.");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message || "Saque solicitado com sucesso!");
          fetchWalletBalance();
          closeWithdrawModal();
        })
        .catch((error) => {
          const errorMsg = document.getElementById("withdraw-error");
          if (errorMsg) {
            errorMsg.textContent = error.message;
            errorMsg.classList.remove("hidden");
          } else {
            alert(error.message);
          }
        })
        .finally(() => {
          withdrawSubmitBtn.disabled = false;
          withdrawSubmitBtn.textContent = "Confirmar Saque";
        });
    });
  }
});

// =================================================================
// --- LÓGICA COMPLETA: MODAL DE INFORMAÇÕES -> TELA DE JOGO ---
// =================================================================

// Seleciona todos os elementos que vamos usar
const gameInfoModal = document.getElementById("game-modal");
const closeModalButton = document.getElementById("close-game-modal");
const cancelModalButton = document.getElementById("cancel-game-btn");
const openGameButton = document.getElementById("open-game-btn");

const gameViewContainer = document.getElementById("game-view-container");
const iframeWrapper = document.getElementById("game-iframe-wrapper");
const closeGameViewBtn = document.getElementById("close-game-view-btn");

const mainContent = document.querySelector(".dashboard-main-content");
const sidebar = document.querySelector(".sidebar");
const mobileHeader = document.querySelector(".mobile-header");

// --- ETAPA 1: Abrir o Modal ao clicar no Card ---
document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    e.preventDefault(); // Impede a navegação padrão

    // Pega os dados do card clicado
    const title = this.dataset.title;
    const description = this.dataset.description;
    const image = this.dataset.image;
    const gameUrl = this.dataset.url;

    // Preenche o modal com as informações do jogo
    document.getElementById("game-modal-title").textContent = title;
    document.getElementById("game-modal-description").innerHTML = description;
    document.getElementById("game-modal-img").src = image;

    // Guarda a URL do jogo no botão "Abrir Jogo" para usar depois
    openGameButton.dataset.gameUrl = gameUrl;

    // Mostra o modal
    gameInfoModal.classList.remove("hidden");
  });
});

// --- ETAPA 2: Abrir o Jogo ao clicar no botão do Modal ---
if (openGameButton) {
  openGameButton.addEventListener("click", function (e) {
    e.preventDefault();

    // --- INÍCIO DA NOVA LÓGICA ---

    // 1. Pega os dados do usuário que já estão salvos no navegador
    const token = localStorage.getItem("userToken");
    const nickname = localStorage.getItem("userNickname") || "Jogador";

    // Segurança: Verifica se o token existe antes de abrir o jogo
    if (!token) {
      alert("Erro de autenticação. Por favor, faça login novamente.");
      return;
    }

    // 2. Pega a URL base do jogo que guardamos no passo anterior
    const baseUrl = this.dataset.gameUrl;

    // 3. Monta a URL final com os parâmetros
    // Usamos encodeURIComponent para garantir que nomes com espaços ou caracteres especiais funcionem
    const finalGameUrl = `${baseUrl}?token=${token}&nickname=${encodeURIComponent(
      nickname
    )}`;

    console.log("Abrindo jogo com a URL:", finalGameUrl); // Ótimo para depuração!

    // --- FIM DA NOVA LÓGICA ---

    // O resto do código continua o mesmo, mas agora usa a nova URL
    gameInfoModal.classList.add("hidden");

    mainContent.classList.add("hidden");
    sidebar.classList.add("hidden");
    if (mobileHeader) mobileHeader.classList.add("hidden");

    iframeWrapper.innerHTML = "";
    const gameIframe = document.createElement("iframe");

    // A única mudança aqui é usar a 'finalGameUrl'
    gameIframe.src = finalGameUrl;

    iframeWrapper.appendChild(gameIframe);

    gameViewContainer.classList.remove("hidden");
  });
}

// --- ETAPA 3: Voltar para o Dashboard ao fechar o Jogo ---
if (closeGameViewBtn) {
  closeGameViewBtn.addEventListener("click", () => {
    // Esconde a tela do jogo
    gameViewContainer.classList.add("hidden");

    // Mostra o conteúdo do dashboard novamente
    mainContent.classList.remove("hidden");
    sidebar.classList.remove("hidden");
    if (mobileHeader) mobileHeader.classList.remove("hidden");

    // Limpa o iframe para parar o jogo
    iframeWrapper.innerHTML = "";
  });
}

// --- Funções para fechar o MODAL (sem abrir o jogo) ---
function closeModal() {
  gameInfoModal.classList.add("hidden");
}
// Adiciona o evento para os botões 'X' e 'Fechar' do modal

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}
if (cancelModalButton) {
  cancelModalButton.addEventListener("click", closeModal);
}
