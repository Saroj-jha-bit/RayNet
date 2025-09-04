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

    // Animate hero text elements on page load
    const heroElements = document.querySelectorAll('.hero-title');
    heroElements.forEach(el => {
        // Use a minimal timeout to ensure transition is applied after initial render
        setTimeout(() => {
            el.classList.add('visible');
        }, 100);
    });

    // Animate feature cards when they scroll into view
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Create an Intersection Observer to watch for when elements enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Tell the observer to watch each feature card
    featureCards.forEach(card => {
        observer.observe(card);
    });
});
