document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const modeBtn = document.getElementById('mode-toggle');
    const signinForm = document.getElementById('signin-form');
    const userInput = document.getElementById('signin-user');
    const passwordInput = document.getElementById('signin-password');
    const errorMessage = document.getElementById('error-message');
    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const slideOutPanel = document.getElementById('slide-out-panel');
    const navOverlay = document.getElementById('nav-overlay');

    // --- Theme Functions ---
    function applySavedMode() {
        const savedMode = localStorage.getItem('mode');
        const isNight = savedMode === 'night';
        document.body.classList.toggle('night-mode', isNight);
        if (modeBtn) modeBtn.innerHTML = isNight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
    function toggleMode() {
        const isNight = document.body.classList.toggle('night-mode');
        localStorage.setItem('mode', isNight ? 'night' : 'day');
        if (modeBtn) modeBtn.innerHTML = isNight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
    applySavedMode();
    if (modeBtn) modeBtn.addEventListener('click', toggleMode);

    // --- Navigation Menu Functions ---
    function openNavMenu() {
        if (slideOutPanel) slideOutPanel.classList.add('open');
        if (navOverlay) navOverlay.classList.add('visible');
    }
    function closeNavMenu() {
        if (slideOutPanel) slideOutPanel.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('visible');
    }
    if (menuOpenBtn) menuOpenBtn.addEventListener('click', openNavMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeNavMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeNavMenu);


    // --- Signin Logic ---
    function signin(event) {
        event.preventDefault();
        const userIdentifier = userInput.value.trim();
        const password = passwordInput.value.trim();

        if (!userIdentifier || !password) {
            errorMessage.textContent = "Please fill in all fields!";
            errorMessage.style.display = 'block';
            return;
        }
        errorMessage.style.display = 'none';

        const users = JSON.parse(localStorage.getItem('raynetUsers')) || [];
        const foundUser = users.find(u => (u.username === userIdentifier || u.email === userIdentifier) && u.password === password);

        if (foundUser) {
            // This is the line that saves the name for the dashboard.
            // It requires that 'foundUser' has a 'fullname' property from the signup page.
            localStorage.setItem('loggedInUser', foundUser.fullname);
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = "Invalid username/email or password.";
            errorMessage.style.display = 'block';
        }
    }
    if (signinForm) signinForm.addEventListener('submit', signin);
});
