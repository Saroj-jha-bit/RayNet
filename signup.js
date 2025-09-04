document.addEventListener('DOMContentLoaded', () => {
    const modeBtn = document.getElementById('mode-toggle');
    const signupForm = document.getElementById('signup-form');
    const messageBox = document.getElementById('message-box');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBar1 = document.getElementById('strength-bar-1');
    const strengthBar2 = document.getElementById('strength-bar-2');
    const strengthBar3 = document.getElementById('strength-bar-3');
    const matchIcon = document.getElementById('password-match-icon');

    function applySavedMode() {
        const isNight = localStorage.getItem('mode') === 'night';
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

    function showMessage(type, text) {
        messageBox.className = `message-box ${type}`;
        messageBox.textContent = text;
        messageBox.style.display = 'block';
    }

    function checkPasswordStrength() {
        const pass = passwordInput.value;
        let score = 0;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        
        strengthBar1.className = '';
        strengthBar2.className = '';
        strengthBar3.className = '';

        if (pass.length > 0 && score === 1) strengthBar1.classList.add('weak');
        if (score === 2) {
            strengthBar1.classList.add('medium');
            strengthBar2.classList.add('medium');
        }
        if (score === 3) {
            strengthBar1.classList.add('strong');
            strengthBar2.classList.add('strong');
            strengthBar3.classList.add('strong');
        }
    }

    function checkPasswordMatch() {
        const pass = passwordInput.value;
        const confirmPass = confirmPasswordInput.value;
        
        if (confirmPass.length === 0) {
            matchIcon.classList.remove('visible');
            return;
        }
        
        matchIcon.classList.add('visible');
        if (pass === confirmPass) {
            matchIcon.className = 'password-match-icon visible fas fa-check-circle text-green-500';
        } else {
            matchIcon.className = 'password-match-icon visible fas fa-times-circle text-red-500';
        }
    }

    if (passwordInput) passwordInput.addEventListener('input', checkPasswordStrength);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    function signup(event) {
        event.preventDefault();
        
        const fullname = document.getElementById('signup-fullname').value.trim();
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!fullname || !username || !email || !password || !confirmPassword) {
            showMessage('error', 'Please fill in all fields!');
            return;
        }
        const usernameRegex = /^[A-Za-z]+[0-9]+$/;
        if (!usernameRegex.test(username)) {
            showMessage('error', 'Username must be ColonyName+HouseNo (e.g. GreenValley12)');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            showMessage('error', 'Passwords do not match.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('raynetUsers')) || [];
        const userExists = users.some(u => u.username === username || u.email === email);

        if (userExists) {
            showMessage('error', 'Username or email already exists.');
            return;
        }

        const newUser = { fullname, username, email, password };
        users.push(newUser);
        localStorage.setItem('raynetUsers', JSON.stringify(users));

        showMessage('success', 'Signup successful! Redirecting to login...');
        
        setTimeout(() => {
            window.location.href = 'raynet.html';
        }, 1500);
    }

    if (signupForm) signupForm.addEventListener('submit', signup);
});
