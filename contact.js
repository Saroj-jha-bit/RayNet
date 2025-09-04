document.addEventListener('DOMContentLoaded', () => {
    const modeBtn = document.getElementById('mode-toggle');
    const contactForm = document.getElementById('contact-form');
    // Element references for the conditional field
    const technicianVisitRadio = document.getElementById('technician-visit');
    const enquiryCallRadio = document.getElementById('enquiry-call');
    const addressFieldContainer = document.getElementById('address-field-container');

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

    // Apply theme on initial load & add listener
    applySavedMode();
    if (modeBtn) {
        modeBtn.addEventListener('click', toggleMode);
    }

    /**
     * Shows or hides the address field based on the selected radio button.
     */
    function toggleAddressField() {
        if (technicianVisitRadio.checked) {
            addressFieldContainer.classList.remove('hidden');
        } else {
            addressFieldContainer.classList.add('hidden');
        }
    }

    // Add event listeners to radio buttons to toggle the address field
    if (technicianVisitRadio) {
        technicianVisitRadio.addEventListener('change', toggleAddressField);
    }
    if (enquiryCallRadio) {
        enquiryCallRadio.addEventListener('change', toggleAddressField);
    }

    /**
     * Handles the contact form submission.
     */
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Data:', data);

        alert('Thank you for your message! We will get back to you soon.');
        
        contactForm.reset(); 
        toggleAddressField(); // Hide address field again after reset
    });
});
