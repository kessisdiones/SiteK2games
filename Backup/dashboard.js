document.addEventListener("DOMContentLoaded", function () {
  function e(e) {
    e.addEventListener("input", function (e) {
      let t = e.target.value.replace(/\D/g, "");
      isNaN((t = (parseInt(t, 10) / 100).toFixed(2))) && (t = "0.00"),
        (e.target.value = t
          .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          .replace("R$", "")
          .trim());
    });
  }
  !(function e() {
    let t = Math.floor(500 + 100 * Math.random());
    function a() {
      (t = Math.max(
        500,
        Math.min(1e3, t + Math.floor(20 * Math.random() - 10))
      )),
        document.querySelectorAll(".online-count").forEach((e) => {
          e.textContent = t;
        });
    }
    a(), setInterval(a, 4e3);
  })();
  let t = document.getElementById("mobile-menu-btn"),
    a = document.getElementById("close-sidebar-btn"),
    n = document.getElementById("sidebar"),
    o = document.getElementById("sidebar-overlay");
  function r() {
    n && o && (n.classList.remove("visible"), o.classList.add("hidden"));
  }
  t &&
    a &&
    n &&
    o &&
    (t.addEventListener("click", function e() {
      n && o && (n.classList.add("visible"), o.classList.remove("hidden"));
    }),
    a.addEventListener("click", r),
    o.addEventListener("click", r));
  let s = localStorage.getItem("userToken"),
    d = localStorage.getItem("userId");
  function l() {
    let e = localStorage.getItem("userNickname") || "Jogador",
      t = localStorage.getItem("userWalletBalance") || 0;
    try {
      let a = parseFloat(t).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      document
        .querySelectorAll(".profile-name")
        .forEach((t) => (t.textContent = e)),
        document
          .querySelectorAll(".welcome-message h1")
          .forEach((t) => (t.textContent = `Bem-vindo de volta, ${e}!`)),
        document
          .querySelectorAll(
            "#wallet-balance, #wallet-balance-desktop, .balance-display strong, .balance-values strong"
          )
          .forEach((e) => (e.textContent = a));
    } catch (n) {
      console.error("Erro ao exibir dados do usu\xe1rio:", n);
    }
  }
  !(function e(t = 5e3) {
    let a;
    async function n() {
      if (!d || !s) {
        console.warn("Token ou ID do usu\xe1rio n\xe3o encontrado."), l();
        return;
      }
      try {
        let e = await fetch(`${API_BASE_URL}/api/Game/GetWallet?userId=${d}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + s },
          }),
          t = e.headers.get("content-type");
        if (!e.ok || !t || !t.includes("application/json")) {
          let a = await e.text();
          throw Error("Resposta inv\xe1lida:\n" + a);
        }
        let n = await e.json();
        localStorage.setItem("userWalletBalance", n.balance), l();
      } catch (o) {
        console.error("Erro ao atualizar saldo:", o.message || o), l();
      }
    }
    return n(), (a = setInterval(n, t)), () => clearInterval(a);
  })();
  let i = document.querySelector(".logout-btn");
  i &&
    i.addEventListener("click", function (e) {
      e.preventDefault(),
        localStorage.clear(),
        (window.location.href = "index.html");
    });
  let m = document.getElementById("transaction-history-body");
  m &&
    ((m.innerHTML = ""),
    [
      {
        type: "Dep\xf3sito",
        date: "21/06/2025",
        amount: 50,
        status: "Conclu\xeddo",
      },
      { type: "Saque", date: "20/06/2025", amount: -20, status: "Pendente" },
      {
        type: "Dep\xf3sito",
        date: "21/06/2025",
        amount: 50,
        status: "Conclu\xeddo",
      },
      { type: "Saque", date: "20/06/2025", amount: -20, status: "Pendente" },
      {
        type: "Dep\xf3sito",
        date: "21/06/2025",
        amount: 50,
        status: "Conclu\xeddo",
      },
      { type: "Saque", date: "20/06/2025", amount: -20, status: "Pendente" },
      {
        type: "Dep\xf3sito",
        date: "21/06/2025",
        amount: 50,
        status: "Conclu\xeddo",
      },
      { type: "Saque", date: "20/06/2025", amount: -20, status: "Pendente" },
      {
        type: "Pr\xeamio de Jogo",
        date: "19/06/2025",
        amount: 15.5,
        status: "Conclu\xeddo",
      },
    ].forEach((e) => {
      const safetype = sanitizeHTML(e.type);
      let t =
          {
            Concluído: "status-completed",
            Pendente: "status-pending",
            Cancelado: "status-cancelled",
          }[e.status] || "",
        a = e.amount < 0 ? "text-danger" : "text-success";
      m.innerHTML += `<tr><td>${safetype}</td><td>${
        e.date
      }</td><td class="${a}">${e.amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</td><td><span class="status ${t}">${e.status}</span></td></tr>`;
    }));
  let c = document.getElementById("match-history-list");
  window.location.pathname.includes("historico") &&
    c &&
    ((c.innerHTML = ""),
    [
      {
        gameName: "Xadrez",
        opponent: "JogadorSombrio",
        result: "win",
        amount: 10,
        date: "21/06/2025",
      },
      {
        gameName: "Aventura Colorida",
        opponent: "MestreDasCores",
        result: "loss",
        amount: -5,
        date: "20/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "RainhaDoGambito",
        result: "win",
        amount: 20,
        date: "20/06/2025",
      },
      {
        gameName: "Arena dos Campe\xf5es",
        opponent: "LutadorX",
        result: "loss",
        amount: -15,
        date: "19/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "TorreDeFerro",
        result: "win",
        amount: 5,
        date: "18/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "JogadorSombrio",
        result: "win",
        amount: 10,
        date: "21/06/2025",
      },
      {
        gameName: "Aventura Colorida",
        opponent: "MestreDasCores",
        result: "loss",
        amount: -5,
        date: "20/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "RainhaDoGambito",
        result: "win",
        amount: 20,
        date: "20/06/2025",
      },
      {
        gameName: "Arena dos Campe\xf5es",
        opponent: "LutadorX",
        result: "loss",
        amount: -15,
        date: "19/06/2025",
      },
      {
        gameName: "Xadrez",
        opponent: "TorreDeFerro",
        result: "win",
        amount: 5,
        date: "18/06/2025",
      },
    ].forEach((e) => {
      const safeGameName = sanitizeHTML(e.gameName);
      const safeOpponent = sanitizeHTML(e.opponent);
      let t = e.result,
        a = e.amount > 0 ? "+" : "",
        n = `
                    <div class="match-card ${t}">
                  <div class="match-info">
                      <span class="game-name">${safeGameName}</span>
                      <span class="opponent-info">vs ${safeOpponent}</span>
                  </div>
                  <div class="match-result">
                      <strong class="match-amount ${t}">
                          ${a}${e.amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
                      </strong>
                      <span class="match-date">${sanitizeHTML(e.date)}</span>
                  </div>
              </div>
                `;
      c.innerHTML += n;
    }));
  let u = document.getElementById("settings-form");
  u &&
    u.addEventListener("submit", function (e) {
      e.preventDefault();
      let t = {
        nickname: document.getElementById("userNickname").value,
        currentPassword: document.getElementById("current-password").value,
        newPassword: document.getElementById("new-password").value,
        emailNotifications: document.getElementById("email-notifications")
          .checked,
      };
      if (t.newPassword && !t.currentPassword) {
        alert("Por favor, insira sua senha atual para definir uma nova.");
        return;
      }
      alert("Altera\xe7\xf5es salvas com sucesso! (Simula\xe7\xe3o)");
    });
  let p = document.getElementById("support-form");
  p &&
    (emailjs.init({ publicKey: "iqzxw-9AGbBVRR8Rk" }),
    p.addEventListener("submit", function (e) {
      e.preventDefault();
      let t = this.querySelector(".btn-save-changes"),
        a = t.textContent;
      (t.disabled = !0), (t.textContent = "Enviando...");
      let n = {
        from_name: document.getElementById("support-name").value,
        from_email: document.getElementById("support-email").value,
        subject: document.getElementById("support-subject").value,
        message: document.getElementById("support-message").value,
      };
      emailjs
        .send("service_2fcvb3n", "template_td3d41d", n)
        .then(
          (e) => {
            console.log("SUCCESS!", e.status, e.text);
            let t = document.getElementById("support-feedback");
            (t.textContent = "Mensagem enviada com sucesso!"),
              t.classList.remove("error"),
              p.reset();
          },
          (e) => {
            console.error("FAILED...", e);
            let t = document.getElementById("support-feedback");
            (t.textContent = "Erro ao enviar a mensagem. Tente novamente."),
              t.classList.add("error");
          }
        )
        .finally(() => {
          (t.disabled = !1), (t.textContent = a);
        });
    }));
  let g = document.querySelectorAll(".btn-deposit, .btn-deposit-main"),
    y = document.getElementById("deposit-modal-1"),
    $ = document.getElementById("deposit-modal-2");
  if (g.length > 0 && y && $) {
    let h = document.getElementById("deposit-form-1"),
      v = document.getElementById("deposit-amount"),
      E = document.getElementById("summary-amount"),
      f = document.getElementById("summary-fee"),
      B = document.getElementById("summary-total"),
      L = document.getElementById("payment-total-value"),
      I = document.getElementById("pix-copy-paste-code");
    document.getElementById("copy-pix-code-btn");
    let b = document.getElementById("countdown-timer"),
      w = document.getElementById("payment-view"),
      C = document.getElementById("confirmation-view"),
      x,
      S = () => {
        (v.value = ""), R(0), y.classList.remove("hidden");
      },
      _ = () => y.classList.add("hidden"),
      k = () => {
        var e = 600;
        let t;
        $.classList.remove("hidden"),
          (t = 600),
          clearInterval(x),
          (x = setInterval(() => {
            let e = Math.floor(t / 60),
              a = t % 60;
            (a = a < 10 ? "0" + a : a),
              (b.textContent = `Pagamento expira em: ${e}:${a}`),
              --t < 0 &&
                (clearInterval(x), (b.textContent = "Tempo esgotado!"));
          }, 1e3)),
          w.classList.remove("hidden"),
          C.classList.add("hidden"),
          $.querySelector(".close-button").classList.add("hidden");
      },
      q = () => {
        $.classList.add("hidden"), clearInterval(x);
      };
    function R(e) {
      let t = parseFloat(e) || 0,
        a = 0.01 * t,
        n = t + a,
        o = (e) =>
          e.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      (E.textContent = o(t)),
        (f.textContent = o(a)),
        (B.textContent = o(n)),
        (L.textContent = o(n));
    }
    v && e(v), g.forEach((e) => e.addEventListener("click", S));
    let M = document.getElementById("close-confirmation-btn");
    M &&
      M.addEventListener("click", () => {
        q();
      });
    let D = document.getElementById("simulate-confirm-btn");
    D &&
      D.addEventListener("click", () => {
        w.classList.add("hidden"),
          C.classList.remove("hidden"),
          $.querySelector(".close-button").classList.remove("hidden");
      });
    let P = $.querySelector(".close-button");
    P &&
      P.addEventListener("click", () => {
        q();
      }),
      y.querySelector(".close-button").addEventListener("click", _),
      document
        .getElementById("deposit-back-btn-1")
        .addEventListener("click", _),
      v.addEventListener("input", (e) => R(e.target.value)),
      h.addEventListener("submit", (e) => {
        e.preventDefault();
        let t = parseFloat(v.value.replace(",", ".")) || 0;
        if (!t || t < 1) {
          alert("O valor m\xednimo para dep\xf3sito \xe9 de R$ 1,00.");
          return;
        }
        let a = h.querySelector(".btn-entrar");
        (a.disabled = !0),
          (a.textContent = "Gerando PIX..."),
          fetch(
            `${API_BASE_URL}/api/Game/GenerateNewOrder?userId=${d}&value=${t}`,
            { method: "POST", headers: { Authorization: "Bearer " + s } }
          )
            .then((e) =>
              e.ok
                ? e.json()
                : e.json().then((e) => {
                    throw Error(e.message || "Erro ao gerar pedido PIX.");
                  })
            )
            .then((e) => {
              I.value = e.pixCopiaECola;
              let t = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                e.pixCopiaECola
              )}`;
              (document.getElementById("pix-qr-code-img").src = t),
                _(),
                k(),
                (function e(t) {
                  let a = 600,
                    n = setInterval(async () => {
                      if (a-- <= 0) {
                        clearInterval(n),
                          (b.textContent =
                            "Pagamento n\xe3o confirmado no tempo esperado.");
                        return;
                      }
                      try {
                        fetch(
                          `${API_BASE_URL}/api/Game/GetWallet?userId=${d}`,
                          {
                            method: "GET",
                            headers: { Authorization: "Bearer " + s },
                          }
                        )
                          .then(
                            (e) => (
                              console.log("Status:", e.status),
                              console.log(
                                "Content-Type:",
                                e.headers.get("content-type")
                              ),
                              e.text()
                            )
                          )
                          .then((e) => {
                            console.log("Resposta bruta:", e);
                            let t;
                            try {
                              t = JSON.parse(e);
                            } catch {
                              throw Error("Resposta n\xe3o \xe9 JSON");
                            }
                            "confirmed" === t.status
                              ? (clearInterval(n),
                                clearInterval(x),
                                w.classList.add("hidden"),
                                C.classList.remove("hidden"),
                                $.querySelector(
                                  ".close-button"
                                ).classList.remove("hidden"),
                                fetchWalletBalance())
                              : console.log("Status n\xe3o confirmado:", t);
                          });
                      } catch (e) {
                        console.error("Erro ao verificar pagamento:", e);
                      }
                    }, 2e3);
                })(e.orderId);
            })
            .catch((e) => {
              alert(e.message);
            })
            .finally(() => {
              (a.disabled = !1), (a.textContent = "Avan\xe7ar");
            });
      });
  }
  let G = document.querySelector(".btn-withdraw"),
    A = document.getElementById("withdraw-modal-overlay");
  if (G && A) {
    let T = document.getElementById("withdraw-form"),
      N = document.getElementById("withdraw-amount"),
      z = A.querySelector(".close-button"),
      H = document.getElementById("withdraw-submit-btn"),
      X = document.getElementById("withdraw-summary-amount"),
      W = document.getElementById("withdraw-summary-fee"),
      j = document.getElementById("withdraw-summary-total"),
      O = document.getElementById("pix-key");
    function V() {
      A.classList.add("hidden");
    }
    function J() {
      let e = (function e() {
        let t = N.value.trim();
        if ((t = t.replace(",", ".")).endsWith(".")) return null;
        let a = parseFloat(t);
        return isNaN(a) ? null : a;
      })();
      if (null === e) return;
      let t = 0.01 * e,
        a = (e) =>
          isNaN(e)
            ? "R$ 0,00"
            : e.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      (X.textContent = a(e)),
        (W.textContent = a(t)),
        (j.textContent = a(e - t));
    }
    O &&
      O.addEventListener("input", () => {
        let e = document.getElementById("withdraw-error");
        e && e.classList.add("hidden");
      }),
      N && e(N),
      G.addEventListener("click", function e() {
        (N.value = ""), J(), A.classList.remove("hidden");
      }),
      z.addEventListener("click", V),
      N.addEventListener("input", J),
      T.addEventListener("submit", function (e) {
        e.preventDefault();
        let t = parseFloat(N.value.replace(",", ".")) || 0,
          a = document.getElementById("pix-key").value.trim();
        if (!t || t < 1) {
          alert("O valor m\xednimo para saque \xe9 de R$ 1,00.");
          return;
        }
        if (!a) {
          alert("Por favor, informe sua chave PIX para o saque.");
          return;
        }
        (H.disabled = !0),
          (H.textContent = "Processando..."),
          fetch(
            `${API_BASE_URL}/api/Game/Withdraw?userId=${d}&value=${t}&pixKey=${encodeURIComponent(
              a
            )}`,
            { method: "POST", headers: { Authorization: `Bearer ${s}` } }
          )
            .then(async (e) => {
              if (!e.ok) {
                let t = await e.json();
                throw Error(t.message || "Erro ao processar o saque.");
              }
              return e.json();
            })
            .then((e) => {
              alert(e.message || "Saque solicitado com sucesso!"),
                fetchWalletBalance(),
                V();
            })
            .catch((e) => {
              let t = document.getElementById("withdraw-error");
              t
                ? ((t.textContent = e.message), t.classList.remove("hidden"))
                : alert(e.message);
            })
            .finally(() => {
              (H.disabled = !1), (H.textContent = "Confirmar Saque");
            });
      });
  }
});
const gameInfoModal = document.getElementById("game-modal"),
  closeModalButton = document.getElementById("close-game-modal"),
  cancelModalButton = document.getElementById("cancel-game-btn"),
  openGameButton = document.getElementById("open-game-btn"),
  gameViewContainer = document.getElementById("game-view-container"),
  iframeWrapper = document.getElementById("game-iframe-wrapper"),
  closeGameViewBtn = document.getElementById("close-game-view-btn"),
  mainContent = document.querySelector(".dashboard-main-content"),
  sidebar = document.querySelector(".sidebar"),
  mobileHeader = document.querySelector(".mobile-header");
function closeModal() {
  gameInfoModal.classList.add("hidden");
}
document.querySelectorAll(".game-card").forEach((e) => {
  e.addEventListener("click", function (e) {
    e.preventDefault();
    let t = this.dataset.title,
      a = this.dataset.description,
      n = this.dataset.image,
      o = this.dataset.url;
    (document.getElementById("game-modal-title").textContent = t),
      (document.getElementById("game-modal-description").innerHTML = a),
      (document.getElementById("game-modal-img").src = n),
      (openGameButton.dataset.gameUrl = o),
      gameInfoModal.classList.remove("hidden");
  });
}),
  openGameButton &&
    openGameButton.addEventListener("click", function (e) {
      e.preventDefault();
      let t = localStorage.getItem("userToken"),
        a = localStorage.getItem("userNickname") || "Jogador",
        n = localStorage.getItem("userId");
      if (!t || !n) {
        alert(
          "Erro de autentica\xe7\xe3o. Por favor, fa\xe7a login novamente."
        );
        return;
      }
      let o = this.dataset.gameUrl,
        r = `${o}?token=${t}&nickname=${encodeURIComponent(a)}&playerID=${n}`;
      console.log("Abrindo jogo com a URL:", r),
        gameInfoModal.classList.add("hidden"),
        mainContent.classList.add("hidden"),
        sidebar.classList.add("hidden"),
        mobileHeader && mobileHeader.classList.add("hidden"),
        (iframeWrapper.innerHTML = "");
      let s = document.createElement("iframe");
      (s.src = r),
        iframeWrapper.appendChild(s),
        gameViewContainer.classList.remove("hidden");
    }),
  closeGameViewBtn &&
    closeGameViewBtn.addEventListener("click", () => {
      gameViewContainer.classList.add("hidden"),
        mainContent.classList.remove("hidden"),
        sidebar.classList.remove("hidden"),
        mobileHeader && mobileHeader.classList.remove("hidden"),
        (iframeWrapper.innerHTML = "");
    }),
  closeModalButton && closeModalButton.addEventListener("click", closeModal),
  cancelModalButton && cancelModalButton.addEventListener("click", closeModal);
