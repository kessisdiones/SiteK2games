// ===================================================
// DADOS E CONFIGURAÇÕES GERAIS
// ===================================================
window.gameData = window.gameData || {
  1: {
    image: "Imagens/Dama.svg",
    description:
      "<strong>🎯 Objetivo do Jogo:</strong><br>O objetivo é capturar todas as peças do seu oponente ou bloqueá-las de forma que ele não possa fazer mais nenhum movimento.<br><br><strong>♟️ O Tabuleiro e as Peças:</strong><br>O jogo acontece em um tabuleiro de 8x8 casas claras e escuras. Cada jogador começa com 12 peças (pedras), posicionadas apenas nas casas escuras das três primeiras fileiras do seu lado.<br><br><strong>🧩 Regras de Movimento:</strong><br><ul><li><strong>Movimento Simples:</strong> As peças comuns se movem apenas uma casa na diagonal, para frente, em direção ao lado do oponente.</li><li><strong>Captura:</strong> Para capturar, uma peça sua deve 'pular' por cima da peça do adversário, caindo na casa vazia logo atrás. A peça capturada é removida do jogo. É possível realizar múltiplas capturas em uma única jogada, se as condições permitirem.</li><li><strong>Tornando-se Dama:</strong> Quando uma peça sua alcança a última fileira do lado do oponente, ela é coroada e se torna uma 'Dama'.</li><li><strong>Movimento da Dama:</strong> A Dama é mais poderosa! Ela pode se mover na diagonal para frente e para trás, por quantas casas quiser, desde que o caminho esteja livre.</li></ul><br><strong>🏆 Como Vencer:</strong><br>Você vence a partida ao deixar seu oponente sem peças no tabuleiro ou sem a possibilidade de realizar qualquer movimento legal.<br><br><strong>💰 A Aposta:</strong><br>O vencedor da partida recebe 90% do valor total apostado. Os outros 10% são uma taxa da plataforma. Por exemplo, em uma aposta de R$ 20,00, o prêmio para o vencedor é de R$ 18,00.",
  },
  2: {
    image: "Imagens/Jogodavelha.svg",
    description:
      "<strong>🎯 Objetivo:</strong><br>O seu objetivo é ser o primeiro a formar uma linha (horizontal, vertical ou diagonal) com três peças da sua cor.<br><br><strong>🧩 A Regra Mais Importante (Sobreposição):</strong><br>Esta não é uma partida comum. Cada jogador tem 6 peças de 3 tamanhos diferentes (grandes, médias e pequenas). A grande virada do jogo é que uma peça maior pode ser colocada por cima de uma peça menor que já está no tabuleiro.<br><br>Peça Grande (3): Cobre peças médias (2) e pequenas (1).<br>Peça Média (2): Cobre apenas peças pequenas (1).<br>Peça Pequena (1): Só pode ser colocada em espaços vazios.<br><br><strong>🏆 Como Vencer ou Perder:</strong><br>Vitória: Você vence ao fazer 3 peças em linha ou se o tempo do seu oponente acabar.<br>Derrota por Tempo: Cada jogador tem 30 segundos para fazer sua jogada. Se o seu tempo esgotar, você perde a partida na hora.<br><br><strong>💰 A Aposta:</strong><br>O vencedor da partida recebe 90% do valor total apostado. Os outros 10% são uma taxa da plataforma. Por exemplo, em uma aposta de R$ 20,00, o prêmio para o vencedor é de R$ 18,00.",
  },

  3: {
    image: "Imagens/Puxa-puxa.svg",
    description: "Uma batalha épica com heróis de diversos universos.",
  },
  4: {
    image: "Imagens/jogo4.svg",
    description: "Um jogo de furtividade e estratégia.",
  },
  5: {
    image: "Imagens/jogo5.svg",
    description: "Comande sua frota em batalhas estelares.",
  },
  6: {
    image: "Imagens/jogo6.svg",
    description: "Explore um mundo de magia e criaturas fantásticas.",
  },
};

let gamesSwiperInstance;

function initGamesSwiper() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile && !gamesSwiperInstance) {
    gamesSwiperInstance = new Swiper(".games-swiper", {
      direction: "horizontal",
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: {
        enabled: true,
        //sticky: true,
      },
      resistanceRatio: 0,
      centeredSlides: false,
      slidesOffsetAfter: 0,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
    });
  } else if (!isMobile && gamesSwiperInstance) {
    // Destroi o Swiper no desktop
    gamesSwiperInstance.destroy(true, true);
    gamesSwiperInstance = null;
  }
}

// Roda na primeira carga e quando a tela for redimensionada
window.addEventListener("load", initGamesSwiper);
window.addEventListener("resize", initGamesSwiper);

// ===================================================
// LÓGICA DOS MODAIS (EXECUTADA QUANDO O HTML CARREGAR)
// ===================================================
document.addEventListener("DOMContentLoaded", function () {
  function setupModal(openBtnId, modalOverlayId) {
    const openBtn = document.getElementById(openBtnId);
    const modalOverlay = document.getElementById(modalOverlayId);

    if (openBtn && modalOverlay) {
      const closeBtn = modalOverlay.querySelector(".close-button");

      const open = (e) => {
        if (e) e.preventDefault();
        modalOverlay.classList.remove("hidden");
      };
      const close = () => {
        modalOverlay.classList.add("hidden");
      };

      openBtn.addEventListener("click", open);
      closeBtn.addEventListener("click", close);
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) close();
      });

      return { open, close };
    }
    return { open: () => {}, close: () => {} };
  }

  // Inicializa o Swiper do banner principal
  new Swiper(".main-banner", {
    // Parâmetros opcionais
    direction: "horizontal", // ou 'vertical'
    loop: true, // Habilita o modo de loop contínuo

    // Se precisar de paginação (os pontinhos embaixo do banner)
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Torna os pontinhos clicáveis para navegar
    },

    // Se precisar dos botões de navegação (setas)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Configuração de autoplay (para ele girar sozinho)
    autoplay: {
      delay: 5000, // 5 segundos entre os slides
      disableOnInteraction: false, // Continua o autoplay mesmo após a interação do usuário
    },
  });

  const { open: openLoginModal, close: closeLoginModal } = setupModal(
    "open-login-btn",
    "login-modal-overlay"
  );
  const { open: openRegisterModal, close: closeRegisterModal } = setupModal(
    "open-register-btn",
    "register-modal-overlay"
  );
  const { open: openSupportModal, close: closeSupportModal } = setupModal(
    "open-support-link",
    "support-modal-overlay"
  );
  const { open: openContactModal, close: closeContactModal } = setupModal(
    "open-contact-link",
    "contact-modal-overlay"
  );

  const switchToRegisterLink = document.getElementById(
    "switch-to-register-link"
  );
  if (switchToRegisterLink) {
    switchToRegisterLink.addEventListener("click", function (e) {
      e.preventDefault();
      closeLoginModal();
      openRegisterModal();
    });
  }

  const registerHeaderButton = document.querySelector(
    ".main-nav .btn-register"
  );
  if (registerHeaderButton) {
    registerHeaderButton.id = "open-register-btn";
    registerHeaderButton.addEventListener("click", (e) => {
      e.preventDefault();
      openRegisterModal();
    });
  }

  const gameInfoModalOverlay = document.getElementById(
    "game-info-modal-overlay"
  );
  if (gameInfoModalOverlay) {
    const allGameCards = document.querySelectorAll(".game-card");
    const closeGameInfoButton =
      gameInfoModalOverlay.querySelector(".close-button");

    allGameCards.forEach((card) => {
      card.addEventListener("click", function (event) {
        event.preventDefault();
        const gameId = card.dataset.gameId;
        const data = gameData[gameId];
        if (data) {
          gameInfoModalOverlay.querySelector("#modal-game-title").textContent =
            data.title;
          gameInfoModalOverlay.querySelector("#modal-game-image").src =
            data.image;
          gameInfoModalOverlay.querySelector("#modal-game-image").alt =
            data.title;
          gameInfoModalOverlay.querySelector(
            "#modal-game-description"
          ).innerHTML = data.description;
          gameInfoModalOverlay.classList.remove("hidden");
        }
      });
    });
    closeGameInfoButton.addEventListener("click", () =>
      gameInfoModalOverlay.classList.add("hidden")
    );
    gameInfoModalOverlay.addEventListener("click", (e) => {
      if (e.target === gameInfoModalOverlay)
        gameInfoModalOverlay.classList.add("hidden");
    });
  }

  // === LÓGICA DO BOTÃO "JOGAR AGORA" ===
  const playNowButton = document.querySelector(
    "#game-info-modal-overlay .btn-entrar"
  );
  if (playNowButton) {
    playNowButton.addEventListener("click", function () {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        // Usuário não logado: abrir modal de login
        document
          .getElementById("game-info-modal-overlay")
          ?.classList.add("hidden");
        openLoginModal();
      } else {
        // Usuário logado: redirecionar (exemplo: para o dashboard ou jogo)
        window.location.href = "dashboard.html"; // ou outro link futuro para o jogo
      }
    });
  }

  // --- LÓGICA DO FORMULÁRIO DE LOGIN ---
  const loginForm = document.getElementById("login-form"); // Procura o formulário pelo ID que demos a ele
  if (loginForm) {
    const loginSubmitBtn = loginForm.querySelector(".btn-entrar");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const rememberMeCheckbox = document.getElementById("remember-me");
    const passwordToggleBtn = document.getElementById("password-toggle");

    emailInput.addEventListener("input", () => {
      document.getElementById("login-error")?.classList.add("hidden");
    });
    passwordInput.addEventListener("input", () => {
      document.getElementById("login-error")?.classList.add("hidden");
    });

    // Lógica para mostrar/esconder senha
    if (passwordToggleBtn && passwordInput) {
      passwordToggleBtn.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        this.classList.toggle("showing", isPassword);
      });
    }

    // Lógica para lembrar o email
    const savedEmail = localStorage.getItem("savedUserEmail");
    if (savedEmail && emailInput) {
      emailInput.value = savedEmail;
      if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
    }

    // Lógica de envio do formulário
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem("savedUserEmail", emailInput.value);
      } else {
        localStorage.removeItem("savedUserEmail");
      }

      const email = emailInput.value;
      const password = passwordInput.value;

      loginSubmitBtn.disabled = true;
      loginSubmitBtn.textContent = "Entrando...";

      fetch(`${AUTH_API_URL}/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Email ou senha incorretos.");
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userNickname", data.nickname);
          localStorage.setItem("userWalletBalance", data.walletBalance);
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          const errorMsg = document.getElementById("login-error");
          if (errorMsg) {
            errorMsg.textContent = error.message;
            errorMsg.classList.remove("hidden");
          }

          loginSubmitBtn.disabled = false;
          loginSubmitBtn.textContent = "Entrar";
        });
    });
  }
  //=================Logica para modal de registro===========//
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById(
      "register-confirm-password"
    );
    const termsCheckbox = document.getElementById("terms-checkbox");
    const submitButton = document.getElementById("register-submit-btn");
    const cpfInput = document.getElementById("cpf-input");
    const phoneInput = document.getElementById("phone-input");

    const errorMsg = document.getElementById("register-error");
    registerForm.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", () => {
        if (errorMsg) errorMsg.classList.add("hidden");
      });
    });

    if (typeof IMask !== "undefined") {
      const cpfMask = IMask(cpfInput, { mask: "000.000.000-00" });
      const phoneMask = IMask(phoneInput, { mask: "(00) 00000-0000" });

      function validateForm() {
        const passwordsMatch =
          passwordInput.value === confirmPasswordInput.value &&
          passwordInput.value.length > 0;
        const cpfComplete = cpfMask.unmaskedValue.length === 11;
        const phoneComplete = phoneMask.unmaskedValue.length === 11;
        const termsAccepted = termsCheckbox.checked;

        if (confirmPasswordInput.value.length > 0) {
          confirmPasswordInput.style.borderColor = passwordsMatch
            ? "#3E4553"
            : "#E03131";
        } else {
          confirmPasswordInput.style.borderColor = "#3E4553";
        }
        submitButton.disabled = !(
          passwordsMatch &&
          cpfComplete &&
          phoneComplete &&
          termsAccepted
        );
      }

      registerForm.addEventListener("input", validateForm);
      validateForm();

      registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
          email: document.getElementById("register-email").value,
          password: document.getElementById("register-password").value,
          cpf: cpfMask.unmaskedValue,
          phoneNumber: phoneMask.unmaskedValue,
          nationality: document.getElementById("register-nationality").value,
          nickname: document.getElementById("register-nome").value,
        };

        /*const recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse) {
                    alert("Por favor, confirme que você não é um robô.");
                    return;
                }*/
        //formData.recaptchaToken = recaptchaResponse;

        submitButton.disabled = true;
        submitButton.textContent = "Criando conta...";

        fetch(`${AUTH_API_URL}/Auth/Register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw new Error(err.message || "Erro ao criar conta.");
              });
            }
            return response.text();
          })
          .then((textResponse) => {
            const errorMsg = document.getElementById("register-error");
            if (errorMsg) {
              errorMsg.textContent =
                "Conta criada com sucesso! Faça login para continuar.";
              errorMsg.classList.remove("hidden");
              errorMsg.style.color = "#2ecc71"; // verde de sucesso
            }

            // Aguarda 2 segundos antes de trocar o modal
            setTimeout(() => {
              closeRegisterModal();
              openLoginModal();

              // Limpa o campo de mensagem ao abrir o modal de login
              if (errorMsg) {
                errorMsg.textContent = "";
                errorMsg.classList.add("hidden");
                errorMsg.style.color = ""; // resetando cor
              }
            }, 3000);
          })
          .catch((error) => {
            const errorMsg = document.getElementById("register-error");
            if (errorMsg) {
              errorMsg.textContent = error.message;
              errorMsg.classList.remove("hidden");
            }
          })

          .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Criar Conta";
          });
      });
    }
  }

  // ===================================================
  // LÓGICA DO FORMULÁRIO DE SUPORTE
  // ===================================================
  const supportForm = document.getElementById("support-form");

  if (supportForm) {
    // Verifica se a biblioteca EmailJS foi carregada
    if (typeof emailjs !== "undefined") {
      emailjs.init({
        publicKey: "iqzxw-9AGbBVRR8Rk", // Chave pública do EmailJS
      });

      supportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Seletor do botão corrigido de '.btn-save-changes' para '.btn-entrar'
        const submitButton = this.querySelector(".btn-entrar");
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        const feedbackEl = document.getElementById("support-feedback");
        feedbackEl.textContent = ""; // Limpa a mensagem anterior

        const serviceID = "service_2fcvb3n"; // ID do serviço do EmailJS
        const templateID = "template_td3d41d"; // ID do template do EmailJS

        const templateParams = {
          from_name: document.getElementById("support-name").value,
          from_email: document.getElementById("support-email").value,
          subject: document.getElementById("support-subject").value,
          message: document.getElementById("support-message").value,
        };

        emailjs
          .send(serviceID, templateID, templateParams)
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              feedbackEl.textContent = "Mensagem enviada com sucesso!";
              feedbackEl.style.color = "#2ecc71"; // Verde
              supportForm.reset();
            },
            (error) => {
              console.error("FAILED...", error);
              feedbackEl.textContent =
                "Erro ao enviar a mensagem. Tente novamente.";
              feedbackEl.style.color = "#E03131"; // Vermelho
            }
          )
          .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          });
      });
    } else {
      console.error("A biblioteca EmailJS não foi carregada.");
    }
  }
});
