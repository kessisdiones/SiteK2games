// =================================================================
// SCRIPT ÚNICO PARA TODAS AS PÁGINAS DA ÁREA LOGADA
// =================================================================

const API_BASE_URL = 'https://79e5-45-160-242-60.ngrok-free.app'

document.addEventListener('DOMContentLoaded', function() {

    // --- MENU MOBILE ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function openSidebar() { if (sidebar && sidebarOverlay) { sidebar.classList.add('visible'); sidebarOverlay.classList.remove('hidden'); } }
    function closeSidebar() { if (sidebar && sidebarOverlay) { sidebar.classList.remove('visible'); sidebarOverlay.classList.add('hidden'); } }

    if (menuBtn && closeMenuBtn && sidebar && sidebarOverlay) {
        menuBtn.addEventListener('click', openSidebar);
        closeMenuBtn.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // --- DADOS DO USUÁRIO ---
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    // 2. O "segurança". Se não tiver token, volta para o login.
    /*if (!token || !userId) {
        alert("Você não está logado. Por favor, faça o login.");
        window.location.href = 'index.html';
        return; 
    }*/

    // --- EXIBIR NOME E SALDO ---
    function updateUserDataDisplay() {
        const nickname = localStorage.getItem('userNickname') || 'Jogador';
        const balance = localStorage.getItem('userWalletBalance') || 0;
        try {
            const formattedBalance = parseFloat(balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.querySelectorAll('.profile-name').forEach(el => el.textContent = nickname);
            document.querySelectorAll('.welcome-message h1').forEach(el => el.textContent = `Bem-vindo de volta, ${nickname}!`);
            document.querySelectorAll('#wallet-balance, #wallet-balance-desktop, .balance-display strong, .balance-values strong').forEach(el => el.textContent = formattedBalance);
        } catch (error) {
            console.error("Erro ao exibir dados do usuário:", error);
        }
    }
    
    // NOVO: Função para buscar e atualizar o saldo vindo da API
    async function fetchWalletBalance() {
        if (!userId || !token) {
            console.error("ID do usuário ou token não encontrado para buscar saldo.");
            updateUserDataDisplay(); // Mostra os dados do localStorage se não puder buscar
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/Game/GetWallet?userId=${userId}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Não foi possível obter o saldo.");
            }

            const data = await response.json();
            localStorage.setItem('userWalletBalance', data.balance);
            updateUserDataDisplay();

        } catch (error) {
            console.error("Erro ao buscar saldo da API:", error);
            updateUserDataDisplay();
        }
    }

    function startWalletPolling() {
        setInterval(fetchWalletBalance, 5000); 
    }
      
       
    // MODIFICADO: Em vez de chamar a função de exibição direto, chamamos a função que busca os dados primeiro
    fetchWalletBalance();
    startWalletPolling();

    // --- LOGOUT ---
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }

    // --- HISTÓRICO (FAKE) ---
    const historyTableBody = document.getElementById('transaction-history-body');
    if (historyTableBody) {
        const fakeTransactionHistory = [
            { type: 'Depósito', date: '21/06/2025', amount: 50.00, status: 'Concluído' },
            { type: 'Saque', date: '20/06/2025', amount: -20.00, status: 'Pendente' },
            { type: 'Depósito', date: '21/06/2025', amount: 50.00, status: 'Concluído' },
            { type: 'Saque', date: '20/06/2025', amount: -20.00, status: 'Pendente' },
            { type: 'Depósito', date: '21/06/2025', amount: 50.00, status: 'Concluído' },
            { type: 'Saque', date: '20/06/2025', amount: -20.00, status: 'Pendente' },
            { type: 'Depósito', date: '21/06/2025', amount: 50.00, status: 'Concluído' },
            { type: 'Saque', date: '20/06/2025', amount: -20.00, status: 'Pendente' },
            { type: 'Prêmio de Jogo', date: '19/06/2025', amount: 15.50, status: 'Concluído' }
        ];
        historyTableBody.innerHTML = '';
        fakeTransactionHistory.forEach(tx => {
            const statusClass = { 'Concluído': 'status-completed', 'Pendente': 'status-pending', 'Cancelado': 'status-cancelled'}[tx.status] || '';
            historyTableBody.innerHTML += `<tr><td>${tx.type}</td><td>${tx.date}</td><td>${tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td><td><span class="status ${statusClass}">${tx.status}</span></td></tr>`;
        });
    }

    // ===================================================
    // LÓGICA DO HISTÓRICO DE PARTIDAS
    // ===================================================
    
    const historyListEl = document.getElementById('match-history-list');

    function fetchMatchHistory() {
        const fakeMatchHistory = [
            { gameName: 'Xadrez', opponent: 'JogadorSombrio', result: 'win', amount: 10.00, date: '21/06/2025' },
            { gameName: 'Aventura Colorida', opponent: 'MestreDasCores', result: 'loss', amount: -5.00, date: '20/06/2025' },
            { gameName: 'Xadrez', opponent: 'RainhaDoGambito', result: 'win', amount: 20.00, date: '20/06/2025' },
            { gameName: 'Arena dos Campeões', opponent: 'LutadorX', result: 'loss', amount: -15.00, date: '19/06/2025' },
            { gameName: 'Xadrez', opponent: 'TorreDeFerro', result: 'win', amount: 5.00, date: '18/06/2025' },
            { gameName: 'Xadrez', opponent: 'JogadorSombrio', result: 'win', amount: 10.00, date: '21/06/2025' },
            { gameName: 'Aventura Colorida', opponent: 'MestreDasCores', result: 'loss', amount: -5.00, date: '20/06/2025' },
            { gameName: 'Xadrez', opponent: 'RainhaDoGambito', result: 'win', amount: 20.00, date: '20/06/2025' },
            { gameName: 'Arena dos Campeões', opponent: 'LutadorX', result: 'loss', amount: -15.00, date: '19/06/2025' },
            { gameName: 'Xadrez', opponent: 'TorreDeFerro', result: 'win', amount: 5.00, date: '18/06/2025' }
        ];

        if(historyListEl) {
            historyListEl.innerHTML = '';
            fakeMatchHistory.forEach(match => {
                const resultClass = match.result;
                const amountPrefix = match.amount > 0 ? '+' : '';

                const cardHTML = `
                    <div class="match-card ${resultClass}">
                        <div class="match-info">
                            <span class="game-name">${match.gameName}</span>
                            <span class="opponent-info">vs ${match.opponent}</span>
                        </div>
                        <div class="match-result">
                            <strong class="match-amount ${resultClass}">
                                ${amountPrefix}${match.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </strong>
                            <span class="match-date">${match.date}</span>
                        </div>
                    </div>
                `;

                historyListEl.innerHTML += cardHTML;
            });
        }
    }

    if (window.location.pathname.includes('historico')) {
        fetchMatchHistory();
    }


    // --- FORMULÁRIO DE CONFIGURAÇÕES ---
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newSettings = {
                nickname: document.getElementById('nickname').value,
                currentPassword: document.getElementById('current-password').value,
                newPassword: document.getElementById('new-password').value,
                emailNotifications: document.getElementById('email-notifications').checked
            };
            if (newSettings.newPassword && !newSettings.currentPassword) {
                alert("Por favor, insira sua senha atual para definir uma nova.");
                return;
            }
            alert("Alterações salvas com sucesso! (Simulação)");
        });
    }

    // --- MODAL DE DEPÓSITO ---
    const openDepositBtns = document.querySelectorAll('.btn-deposit, .btn-deposit-main');
    const depositModal1 = document.getElementById('deposit-modal-1');
    const depositModal2 = document.getElementById('deposit-modal-2');

    if (openDepositBtns.length > 0 && depositModal1 && depositModal2) {
        const form1 = document.getElementById('deposit-form-1');
        const amountInput = document.getElementById('deposit-amount');
        const summaryAmount = document.getElementById('summary-amount');
        const summaryFee = document.getElementById('summary-fee');
        const summaryTotal = document.getElementById('summary-total');
        const paymentTotalValue = document.getElementById('payment-total-value');
        const pixCodeInput = document.getElementById('pix-copy-paste-code');
        const copyCodeBtn = document.getElementById('copy-pix-code-btn');
        const countdownTimerEl = document.getElementById('countdown-timer');
        const paymentView = document.getElementById('payment-view');
        const confirmationView = document.getElementById('confirmation-view');
        const simulatePaymentBtn = document.getElementById('simulate-payment-btn');
        let countdownInterval;

        const openModal1 = () => { amountInput.value = ''; updateDepositFee(0); depositModal1.classList.remove('hidden'); };
        const closeModal1 = () => depositModal1.classList.add('hidden');
        const openModal2 = () => { depositModal2.classList.remove('hidden'); startTimer(600); paymentView.classList.remove('hidden'); confirmationView.classList.add('hidden'); depositModal2.querySelector('.close-button').classList.add('hidden'); };
        const closeModal2 = () => { depositModal2.classList.add('hidden'); clearInterval(countdownInterval); };

        function updateDepositFee(amount) {
            const value = parseFloat(amount) || 0;
            const feeRate = 0.02;
            const fee = value * feeRate;
            const total = value + fee;
            const formatBRL = (num) => num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
                if (--timer < 0) { clearInterval(countdownInterval); countdownTimerEl.textContent = "Tempo esgotado!"; }
            }, 1000);
        }

        openDepositBtns.forEach(btn => btn.addEventListener('click', openModal1));
        depositModal1.querySelector('.close-button').addEventListener('click', closeModal1);
        document.getElementById('deposit-back-btn-1').addEventListener('click', closeModal1);
        amountInput.addEventListener('input', (e) => updateDepositFee(e.target.value));

        form1.addEventListener('submit', (e) => {
            e.preventDefault();
            const depositValue = parseFloat(amountInput.value);
            if (!depositValue || depositValue < 20) { alert("O valor mínimo para depósito é de R$ 20,00."); return; }
            const advanceButton = form1.querySelector('.btn-entrar');
            advanceButton.disabled = true; advanceButton.textContent = "Gerando PIX...";

            fetch(`${API_BASE_URL}/api/Game/GenerateNewOrder?userId=${userId}&value=${depositValue}`, {
                method: 'POST', headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(response => { if (!response.ok) return response.json().then(err => { throw new Error(err.message || 'Erro ao gerar pedido PIX.') }); return response.json(); })
            .then(data => { pixCodeInput.value = data.pixQrCode; closeModal1(); openModal2(); })
            .catch(error => { alert(error.message); })
            .finally(() => { advanceButton.disabled = false; advanceButton.textContent = "Avançar"; });
        });

        copyCodeBtn.addEventListener('click', () => { navigator.clipboard.writeText(pixCodeInput.value).then(() => { copyCodeBtn.textContent = 'Copiado!'; setTimeout(() => { copyCodeBtn.textContent = 'Copiar'; }, 2000); }); });
        
        // MODIFICADO: Adicionado fetchWalletBalance() para atualizar o saldo após simular o pagamento
        simulatePaymentBtn.addEventListener('click', () => { 
            clearInterval(countdownInterval); 
            paymentView.classList.add('hidden'); 
            confirmationView.classList.remove('hidden'); 
            depositModal2.querySelector('.close-button').classList.remove('hidden');
            fetchWalletBalance(); // <-- ATUALIZA O SALDO AQUI
        });
        document.getElementById('close-confirmation-btn').addEventListener('click', closeModal2);
        document.getElementById('deposit-back-btn-2').addEventListener('click', () => { closeModal2(); openModal1(); });
    }

    // ===================================================
    // LÓGICA DO MODAL DE SAQUE (SEM MÁSCARA)
    // ===================================================
    const openWithdrawButton = document.querySelector('.btn-withdraw');
    const withdrawModal = document.getElementById('withdraw-modal-overlay');

    if (openWithdrawButton && withdrawModal) {
        const withdrawForm = document.getElementById('withdraw-form');
        const withdrawAmountInput = document.getElementById('withdraw-amount');
        const closeWithdrawButton = withdrawModal.querySelector('.close-button');
        const withdrawSubmitBtn = document.getElementById('withdraw-submit-btn');
        const summaryAmount = document.getElementById('withdraw-summary-amount');
        const summaryFee = document.getElementById('withdraw-summary-fee');
        const summaryTotal = document.getElementById('withdraw-summary-total');

        function openWithdrawModal() {
            withdrawAmountInput.value = '';
            updateWithdrawFee();
            withdrawModal.classList.remove('hidden');
        }

        function closeWithdrawModal() {
            withdrawModal.classList.add('hidden');
        }

        function parseInputValue() {
            const raw = withdrawAmountInput.value.trim();
            const numeric = raw.replace(/\./g, '').replace(',', '.');
            return parseFloat(numeric) || 0;
        }

        function updateWithdrawFee() {
            const value = parseInputValue();
            const feeRate = 0.01;
            const fee = value * feeRate;
            const total = value - fee;

            const formatBRL = (num) =>
                isNaN(num) ? 'R$ 0,00' : num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            summaryAmount.textContent = formatBRL(value);
            summaryFee.textContent = formatBRL(fee);
            summaryTotal.textContent = formatBRL(total);
        }

        openWithdrawButton.addEventListener('click', openWithdrawModal);
        closeWithdrawButton.addEventListener('click', closeWithdrawModal);
        withdrawAmountInput.addEventListener('input', updateWithdrawFee);

        withdrawForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const valueToWithdraw = parseInputValue();

            if (!valueToWithdraw || valueToWithdraw < 20) {
                alert("O valor mínimo para saque é de R$ 20,00.");
                return;
            }

            withdrawSubmitBtn.disabled = true;
            withdrawSubmitBtn.textContent = "Processando...";

            fetch(`${API_BASE_URL}/api/Game/Withdraw?userId=${userId}&value=${valueToWithdraw}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Erro ao processar o saque.');
                }
                return response.json();
            })
            // MODIFICADO: Removemos o cálculo local e chamamos a função que busca o saldo real do servidor
            .then(data => {
                alert(data.message || "Saque solicitado com sucesso!");
                fetchWalletBalance(); // <-- ATUALIZA O SALDO AQUI
                closeWithdrawModal();
            })
            .catch(error => {
                alert(error.message);
            })
            .finally(() => {
                withdrawSubmitBtn.disabled = false;
                withdrawSubmitBtn.textContent = "Confirmar Saque";
            });
        });
    }

});