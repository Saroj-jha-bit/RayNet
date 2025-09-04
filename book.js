document.addEventListener('DOMContentLoaded', () => {
    // --- Constants ---
    const PRICES = {
        1: 200,
        2: 400,
        3: 650,
        5: 1200,
        10: 2000
    };

    // --- Element References ---
    const modeBtn = document.getElementById('mode-toggle');
    const bookingForm = document.getElementById('booking-form');
    const messageBox = document.getElementById('message-box');
    const deliveryDateInput = document.getElementById('delivery-date');
    const pickupDateInput = document.getElementById('pickup-date');
    
    // Modal elements
    const energyInfoBtn = document.getElementById('energy-info-btn');
    const energyInfoModal = document.getElementById('energy-info-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Dynamic power bank selection elements
    const addPowerbankBtn = document.getElementById('add-powerbank-btn');
    const powerbankTypeSelect = document.getElementById('powerbank-type-select');
    const powerbankQuantityInput = document.getElementById('powerbank-quantity-input');
    const bookingSummaryContainer = document.getElementById('booking-summary');

    // Cost summary elements
    const subtotalEl = document.getElementById('subtotal-amount');


    // --- Date Picker Logic ---
    function setDateConstraints() {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 2);

        const formatDate = (date) => date.toISOString().split('T')[0];

        if (deliveryDateInput) {
            deliveryDateInput.setAttribute('min', formatDate(today));
            deliveryDateInput.setAttribute('max', formatDate(maxDate));

            deliveryDateInput.addEventListener('change', () => {
                if (pickupDateInput) {
                    pickupDateInput.setAttribute('min', deliveryDateInput.value);
                }
            });
        }
    }
    setDateConstraints();

    // --- Theme Functions ---
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

    // --- Modal Functions ---
    function showEnergyModal() {
        if (energyInfoModal) {
            energyInfoModal.classList.remove('hidden');
            energyInfoModal.classList.add('flex');
        }
    }
    function hideEnergyModal() {
        if (energyInfoModal) {
            energyInfoModal.classList.add('hidden');
            energyInfoModal.classList.remove('flex');
        }
    }
    if (energyInfoBtn) energyInfoBtn.addEventListener('click', showEnergyModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideEnergyModal);
    if (energyInfoModal) energyInfoModal.addEventListener('click', (e) => {
        if (e.target === energyInfoModal) hideEnergyModal();
    });

    // --- Cost Calculation Logic ---
    function updateCostSummary() {
        let subtotal = 0;
        const summaryItems = bookingSummaryContainer.querySelectorAll('.summary-item');

        summaryItems.forEach(item => {
            const kwh = parseInt(item.dataset.kwh, 10);
            const quantity = parseInt(item.dataset.quantity, 10);
            const pricePerUnit = PRICES[kwh] || 0;
            subtotal += pricePerUnit * quantity;
        });
        
        if (subtotalEl) {
            subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        }
    }

    // --- Dynamic Power Bank Selection Logic ---
    function addPowerbankToSummary() {
        const kwh = powerbankTypeSelect.value;
        const typeText = powerbankTypeSelect.options[powerbankTypeSelect.selectedIndex].text;
        const quantity = powerbankQuantityInput.value;

        if (!kwh || !quantity || quantity < 1) {
            showMessage('error', 'Please select a valid capacity and quantity.');
            return;
        }

        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.dataset.kwh = kwh;
        summaryItem.dataset.quantity = quantity;
        summaryItem.innerHTML = `
            <span class="summary-text">${quantity} x ${typeText}</span>
            <button type="button" class="remove-item-btn" aria-label="Remove item">
                <i class="fas fa-times-circle"></i>
            </button>
        `;

        bookingSummaryContainer.appendChild(summaryItem);

        summaryItem.querySelector('.remove-item-btn').addEventListener('click', () => {
            summaryItem.remove();
            updateCostSummary();
        });

        updateCostSummary();
    }
    if (addPowerbankBtn) addPowerbankBtn.addEventListener('click', addPowerbankToSummary);

    // --- Form Handling ---
    function showMessage(type, text) {
        if (messageBox) {
            messageBox.className = `message-box ${type}`;
            messageBox.textContent = text;
            messageBox.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    function handleBooking(event) {
        event.preventDefault();
        
        const formData = {
            fullname: document.getElementById('fullname').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),
            energyNeeded: document.getElementById('energy-needed').value.trim(),
            documentType: document.getElementById('document-type').value,
            documentFile: document.getElementById('document-upload').files[0],
            deliveryDate: deliveryDateInput.value,
            pickupDate: pickupDateInput.value,
            deliveryTime: document.getElementById('delivery-time').value,
            pickupTime: document.getElementById('pickup-time').value,
            powerbanks: []
        };
        
        const summaryItems = bookingSummaryContainer.querySelectorAll('.summary-item');
        summaryItems.forEach(item => {
            formData.powerbanks.push({ 
                type: `${item.dataset.kwh} kWh`, 
                quantity: parseInt(item.dataset.quantity, 10) 
            });
        });

        const requiredFields = [formData.fullname, formData.phone, formData.email, formData.address, formData.documentType, formData.deliveryDate, formData.pickupDate, formData.deliveryTime, formData.pickupTime];
        if (requiredFields.some(field => !field)) {
            showMessage('error', 'Please fill in all required fields in sections 1 and 4.');
            return;
        }
        if (!formData.documentFile) {
            showMessage('error', 'Please upload your verification document.');
            return;
        }
        if (formData.powerbanks.length === 0) {
            showMessage('error', 'Please add at least one power bank to your booking.');
            return;
        }

        console.log('Final Booking Data:', formData);
        
        window.location.href = 'confirmation.html';
    }
    if (bookingForm) bookingForm.addEventListener('submit', handleBooking);
});

