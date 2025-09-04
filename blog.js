document.addEventListener('DOMContentLoaded', () => {
    const modeBtn = document.getElementById('mode-toggle');

    /**
     * Applies the theme (day/night) saved in localStorage.
     */
    function applySavedMode() {
        const isNight = localStorage.getItem('mode') === 'night';
        document.body.classList.toggle('night-mode', isNight);
        if (modeBtn) {
            modeBtn.innerHTML = isNight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    }

    /**
     * Toggles the theme, updates the button icon, and saves the preference.
     */
    function toggleMode() {
        const isNight = document.body.classList.toggle('night-mode');
        localStorage.setItem('mode', isNight ? 'night' : 'day');
        if (modeBtn) {
            modeBtn.innerHTML = isNight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    }

    // Apply theme on initial load
    applySavedMode();
    
    // Add event listener for the mode toggle button
    if (modeBtn) {
        modeBtn.addEventListener('click', toggleMode);
    }
});
