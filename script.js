window.gameData = window.gameData || {
  1: {
    image: "Imagens/Dama.svg",
    description:
      "<strong>\uD83C\uDFAF Objetivo do Jogo:</strong><br>O objetivo \xe9 capturar todas as pe\xe7as do seu oponente ou bloque\xe1-las de forma que ele n\xe3o possa fazer mais nenhum movimento.<br><br><strong>♟️ O Tabuleiro e as Pe\xe7as:</strong><br>O jogo acontece em um tabuleiro de 8x8 casas claras e escuras. Cada jogador come\xe7a com 12 pe\xe7as (pedras), posicionadas apenas nas casas escuras das tr\xeas primeiras fileiras do seu lado.<br><br><strong>\uD83E\uDDE9 Regras de Movimento:</strong><br><ul><li><strong>Movimento Simples:</strong> As pe\xe7as comuns se movem apenas uma casa na diagonal, para frente, em dire\xe7\xe3o ao lado do oponente.</li><li><strong>Captura:</strong> Para capturar, uma pe\xe7a sua deve 'pular' por cima da pe\xe7a do advers\xe1rio, caindo na casa vazia logo atr\xe1s. A pe\xe7a capturada \xe9 removida do jogo. \xc9 poss\xedvel realizar m\xfaltiplas capturas em uma \xfanica jogada, se as condi\xe7\xf5es permitirem.</li><li><strong>Tornando-se Dama:</strong> Quando uma pe\xe7a sua alcan\xe7a a \xfaltima fileira do lado do oponente, ela \xe9 coroada e se torna uma 'Dama'.</li><li><strong>Movimento da Dama:</strong> A Dama \xe9 mais poderosa! Ela pode se mover na diagonal para frente e para tr\xe1s, por quantas casas quiser, desde que o caminho esteja livre.</li></ul><br><strong>\uD83C\uDFC6 Como Vencer:</strong><br>Voc\xea vence a partida ao deixar seu oponente sem pe\xe7as no tabuleiro ou sem a possibilidade de realizar qualquer movimento legal.<br><br><strong>\uD83D\uDCB0 A Aposta:</strong><br>O vencedor da partida recebe 90% do valor total apostado. Os outros 10% s\xe3o uma taxa da plataforma. Por exemplo, em uma aposta de R$ 20,00, o pr\xeamio para o vencedor \xe9 de R$ 18,00.",
  },
  2: {
    image: "Imagens/Jogodavelha.svg",
    description:
      "<strong>\uD83C\uDFAF Objetivo:</strong><br>O seu objetivo \xe9 ser o primeiro a formar uma linha (horizontal, vertical ou diagonal) com tr\xeas pe\xe7as da sua cor.<br><br><strong>\uD83E\uDDE9 A Regra Mais Importante (Sobreposi\xe7\xe3o):</strong><br>Esta n\xe3o \xe9 uma partida comum. Cada jogador tem 6 pe\xe7as de 3 tamanhos diferentes (grandes, m\xe9dias e pequenas). A grande virada do jogo \xe9 que uma pe\xe7a maior pode ser colocada por cima de uma pe\xe7a menor que j\xe1 est\xe1 no tabuleiro.<br><br>Pe\xe7a Grande (3): Cobre pe\xe7as m\xe9dias (2) e pequenas (1).<br>Pe\xe7a M\xe9dia (2): Cobre apenas pe\xe7as pequenas (1).<br>Pe\xe7a Pequena (1): S\xf3 pode ser colocada em espa\xe7os vazios.<br><br><strong>\uD83C\uDFC6 Como Vencer ou Perder:</strong><br>Vit\xf3ria: Voc\xea vence ao fazer 3 pe\xe7as em linha ou se o tempo do seu oponente acabar.<br>Derrota por Tempo: Cada jogador tem 30 segundos para fazer sua jogada. Se o seu tempo esgotar, voc\xea perde a partida na hora.<br><br><strong>\uD83D\uDCB0 A Aposta:</strong><br>O vencedor da partida recebe 90% do valor total apostado. Os outros 10% s\xe3o uma taxa da plataforma. Por exemplo, em uma aposta de R$ 20,00, o pr\xeamio para o vencedor \xe9 de R$ 18,00.",
  },
  3: {
    image: "Imagens/Puxa-puxa.svg",
    description: "Uma batalha \xe9pica com her\xf3is de diversos universos.",
  },
  4: {
    image: "Imagens/jogo4.svg",
    description: "Um jogo de furtividade e estrat\xe9gia.",
  },
  5: {
    image: "Imagens/jogo5.svg",
    description: "Comande sua frota em batalhas estelares.",
  },
  6: {
    image: "Imagens/jogo6.svg",
    description: "Explore um mundo de magia e criaturas fant\xe1sticas.",
  },
};
let gamesSwiperInstance;
function initGamesSwiper() {
  let e = window.innerWidth <= 768;
  e && !gamesSwiperInstance
    ? (gamesSwiperInstance = new Swiper(".games-swiper", {
        direction: "horizontal",
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: { enabled: !0 },
        resistanceRatio: 0,
        centeredSlides: !1,
        slidesOffsetAfter: 0,
        scrollbar: { el: ".swiper-scrollbar", draggable: !0 },
      }))
    : !e &&
      gamesSwiperInstance &&
      (gamesSwiperInstance.destroy(!0, !0), (gamesSwiperInstance = null));
}
window.addEventListener("load", initGamesSwiper),
  window.addEventListener("resize", initGamesSwiper),
  document.addEventListener("DOMContentLoaded", function () {
    function e(e, a) {
      let t = document.getElementById(e),
        o = document.getElementById(a);
      if (t && o) {
        let r = o.querySelector(".close-button"),
          n = (e) => {
            e && e.preventDefault(), o.classList.remove("hidden");
          },
          s = () => {
            o.classList.add("hidden");
          };
        return (
          t.addEventListener("click", n),
          r.addEventListener("click", s),
          o.addEventListener("click", (e) => {
            e.target === o && s();
          }),
          { open: n, close: s }
        );
      }
      return { open() {}, close() {} };
    }
    new Swiper(".main-banner", {
      direction: "horizontal",
      loop: !0,
      pagination: { el: ".swiper-pagination", clickable: !0 },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: { delay: 5e3, disableOnInteraction: !1 },
    });
    let { open: a, close: t } = e("open-login-btn", "login-modal-overlay"),
      { open: o, close: r } = e("open-register-btn", "register-modal-overlay"),
      { open: n, close: s } = e("open-support-link", "support-modal-overlay"),
      { open: i, close: l } = e("open-contact-link", "contact-modal-overlay"),
      d = document.getElementById("switch-to-register-link");
    d &&
      d.addEventListener("click", function (e) {
        e.preventDefault(), t(), o();
      });
    let m = document.querySelector(".main-nav .btn-register");
    m &&
      ((m.id = "open-register-btn"),
      m.addEventListener("click", (e) => {
        e.preventDefault(), o();
      }));
    let c = document.getElementById("game-info-modal-overlay");
    if (c) {
      let p = document.querySelectorAll(".game-card"),
        u = c.querySelector(".close-button");
      p.forEach((e) => {
        e.addEventListener("click", function (a) {
          a.preventDefault();
          let t = e.dataset.gameId,
            o = gameData[t];
          o &&
            ((c.querySelector("#modal-game-title").textContent = o.title),
            (c.querySelector("#modal-game-image").src = o.image),
            (c.querySelector("#modal-game-image").alt = o.title),
            (c.querySelector("#modal-game-description").innerHTML =
              o.description),
            c.classList.remove("hidden"));
        });
      }),
        u.addEventListener("click", () => c.classList.add("hidden")),
        c.addEventListener("click", (e) => {
          e.target === c && c.classList.add("hidden");
        });
    }
    let g = document.querySelector("#game-info-modal-overlay .btn-entrar");
    g &&
      g.addEventListener("click", function () {
        let e = localStorage.getItem("userToken");
        e
          ? (window.location.href = "dashboard.html")
          : (document
              .getElementById("game-info-modal-overlay")
              ?.classList.add("hidden"),
            a());
      });
    let v = document.getElementById("login-form");
    if (v) {
      let b = v.querySelector(".btn-entrar"),
        y = document.getElementById("login-email"),
        E = document.getElementById("login-password"),
        f = document.getElementById("remember-me"),
        h = document.getElementById("password-toggle");
      y.addEventListener("input", () => {
        document.getElementById("login-error")?.classList.add("hidden");
      }),
        E.addEventListener("input", () => {
          document.getElementById("login-error")?.classList.add("hidden");
        }),
        h &&
          E &&
          h.addEventListener("click", function () {
            let e = "password" === E.type;
            (E.type = e ? "text" : "password"),
              this.classList.toggle("showing", e);
          });
      let $ = localStorage.getItem("savedUserEmail");
      $ && y && ((y.value = $), f && (f.checked = !0)),
        v.addEventListener("submit", function (e) {
          e.preventDefault(),
            f && f.checked
              ? localStorage.setItem("savedUserEmail", y.value)
              : localStorage.removeItem("savedUserEmail");
          let a = y.value,
            t = E.value;
          (b.disabled = !0),
            (b.textContent = "Entrando..."),
            fetch(`${AUTH_API_URL}/Auth/Login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: a, password: t }),
            })
              .then((e) => {
                if (!e.ok) throw Error("Email ou senha incorretos.");
                return e.json();
              })
              .then((e) => {
                localStorage.setItem("userToken", e.token),
                  localStorage.setItem("userId", e.userId),
                  localStorage.setItem("userNickname", e.nickname),
                  localStorage.setItem("userWalletBalance", e.walletBalance),
                  (window.location.href = "dashboard.html");
              })
              .catch((e) => {
                let a = document.getElementById("login-error");
                a &&
                  ((a.textContent = e.message), a.classList.remove("hidden")),
                  (b.disabled = !1),
                  (b.textContent = "Entrar");
              });
        });
    }
    let I = document.getElementById("register-form");
    if (I) {
      let C = document.getElementById("register-password"),
        L = document.getElementById("register-confirm-password"),
        k = document.getElementById("terms-checkbox"),
        B = document.getElementById("register-submit-btn"),
        w = document.getElementById("cpf-input"),
        x = document.getElementById("phone-input"),
        S = document.getElementById("register-nome"),
        _ = document.getElementById("register-error");
      if (
        (I.querySelectorAll("input, select").forEach((e) => {
          e.addEventListener("input", () => {
            _ && _.classList.add("hidden");
          });
        }),
        "undefined" != typeof IMask)
      ) {
        let q = IMask(w, { mask: "000.000.000-00" }),
          j = IMask(x, { mask: "(00) 00000-0000" });
        function A() {
          let e = S.value.trim(),
            a = "" === e ? 0 : e.split(/\s+/).length,
            t = C.value === L.value && C.value.length > 0,
            o = 11 === q.unmaskedValue.length,
            r = 11 === j.unmaskedValue.length,
            n = k.checked;
          if (
            (L.value.length > 0
              ? (L.style.borderColor = t ? "#3E4553" : "#E03131")
              : (L.style.borderColor = "#3E4553"),
            e.length > 0)
          ) {
            let s = a <= 2;
            (S.style.borderColor = s ? "#3E4553" : "#E03131"),
              s
                ? S.setCustomValidity("")
                : (S.setCustomValidity(
                    "O nome deve conter no m\xe1ximo duas palavras."
                  ),
                  S.reportValidity());
          } else (S.style.borderColor = "#3E4553"), S.setCustomValidity("");
          B.disabled = !(t && o && r && n && a <= 2);
        }
        I.addEventListener("input", A),
          A(),
          I.addEventListener("submit", function (e) {
            if (!I.checkValidity()) return I.reportValidity();
            e.preventDefault();
            let t = {
              email: document.getElementById("register-email").value,
              password: C.value,
              cpf: q.unmaskedValue,
              phoneNumber: j.unmaskedValue,
              nationality: document.getElementById("register-nationality")
                .value,
              nickname: S.value.trim(),
            };
            (B.disabled = !0),
              (B.textContent = "Criando conta..."),
              fetch(`${AUTH_API_URL}/Auth/Register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(t),
              })
                .then((e) =>
                  e.ok
                    ? e.text()
                    : e.json().then((e) => {
                        throw Error(e.message || "Erro ao criar conta.");
                      })
                )
                .then(() => {
                  _ &&
                    ((_.textContent =
                      "Conta criada com sucesso! Fa\xe7a login para continuar."),
                    _.classList.remove("hidden"),
                    (_.style.color = "#2ecc71")),
                    setTimeout(() => {
                      r(),
                        a(),
                        _ &&
                          ((_.textContent = ""),
                          _.classList.add("hidden"),
                          (_.style.color = ""));
                    }, 3e3);
                })
                .catch((e) => {
                  _ &&
                    ((_.textContent = e.message),
                    _.classList.remove("hidden"),
                    (_.style.color = "#E03131"));
                })
                .finally(() => {
                  (B.disabled = !1), (B.textContent = "Criar Conta");
                });
          });
      }
    }
    let D = document.getElementById("support-form");
    D &&
      ("undefined" != typeof emailjs
        ? (emailjs.init({ publicKey: "iqzxw-9AGbBVRR8Rk" }),
          D.addEventListener("submit", function (e) {
            e.preventDefault();
            let a = this.querySelector(".btn-entrar"),
              t = a.textContent;
            (a.disabled = !0), (a.textContent = "Enviando...");
            let o = document.getElementById("support-feedback");
            o.textContent = "";
            let r = {
              from_name: document.getElementById("support-name").value,
              from_email: document.getElementById("support-email").value,
              subject: document.getElementById("support-subject").value,
              message: document.getElementById("support-message").value,
            };
            emailjs
              .send("service_2fcvb3n", "template_td3d41d", r)
              .then(
                (e) => {
                  console.log("SUCCESS!", e.status, e.text),
                    (o.textContent = "Mensagem enviada com sucesso!"),
                    (o.style.color = "#2ecc71"),
                    D.reset();
                },
                (e) => {
                  console.error("FAILED...", e),
                    (o.textContent =
                      "Erro ao enviar a mensagem. Tente novamente."),
                    (o.style.color = "#E03131");
                }
              )
              .finally(() => {
                (a.disabled = !1), (a.textContent = t);
              });
          }))
        : console.error("A biblioteca EmailJS n\xe3o foi carregada."));
  });
