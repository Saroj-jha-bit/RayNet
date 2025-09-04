// Self-invoking function to encapsulate the dashboard logic
(function () {
    // --- DOM Element References ---
    const modeBtn = document.getElementById('mode-toggle');
    const logoutBtn = document.getElementById('logout-btn');
    const calendarEl = document.getElementById('calendar');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const welcomeMessage = document.getElementById('welcome-message');
    const modal = document.getElementById('usage-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDateEl = document.getElementById('modal-date');
    const modalUsageEl = document.getElementById('modal-usage');

    // --- State and Constants ---
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let mockUsageData = {}; // Cache for generated demo data

    // --- Core Functions ---

    /**
     * Checks if a user is logged in by checking localStorage.
     * If not, redirects to the login page.
     */
    function requireLogin() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            // For demo purposes in a preview, we'll just show a default user
            if (welcomeMessage) {
                welcomeMessage.textContent = `Welcome, Demo User!`;
            }
            // In a real app, this redirect would be active:
            // window.location.href = 'raynet.html';
            return;
        }
        // Personalize the welcome message
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${loggedInUser.fullname}!`;
        }
    }

    /**
     * Applies the theme (day/night) saved in localStorage.
     */
    function applySavedMode() {
        const savedMode = localStorage.getItem('mode');
        const isNight = savedMode === 'night';
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

    /**
     * Logs the user out by clearing their session from localStorage.
     */
    function logout() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'raynet.html';
    }

    /**
     * Populates the month and year dropdown selectors.
     */
    function initMonthYearControls() {
        // Populate months
        monthSelect.innerHTML = months.map((month, index) =>
            `<option value="${index}" ${index === currentMonth ? 'selected' : ''}>${month}</option>`
        ).join('');

        // Populate years (current year +/- 5)
        yearSelect.innerHTML = '';
        for (let y = currentYear - 5; y <= currentYear + 5; y++) {
            yearSelect.innerHTML += `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`;
        }
    }
    
    /**
     * Generates a consistent, pseudo-random energy usage value for a given day.
     * @param {number} year - The year.
     * @param {number} month - The month (0-11).
     * @param {number} day - The day.
     * @returns {number} The energy usage in kWh.
     */
    function getDailyUsage(year, month, day) {
        const key = `${year}-${month}-${day}`;
        if (!mockUsageData[key]) {
            // Simple seeded random number generator for consistency
            const seed = year * 10000 + month * 100 + day;
            const random = Math.sin(seed) * 10000;
            mockUsageData[key] = parseFloat(((random - Math.floor(random)) * (4.5 - 1.5) + 1.5).toFixed(1)); // Random value between 1.5 and 4.5
        }
        return mockUsageData[key];
    }


    /**
     * Generates and displays the calendar for the given month and year.
     */
    function generateCalendar(month, year) {
        if (!calendarEl) return;
        calendarEl.innerHTML = ''; // Clear previous calendar

        // Create table header (Sun, Mon, etc.)
        const thead = `<thead><tr>${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => `<th>${d}</th>`).join('')}</tr></thead>`;
        calendarEl.insertAdjacentHTML('beforeend', thead);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const tbody = document.createElement('tbody');

        let date = 1;
        for (let i = 0; i < 6; i++) { // Max 6 rows
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { // 7 days a week
                const cell = document.createElement('td');
                if (i === 0 && j < firstDayOfMonth || date > daysInMonth) {
                    cell.classList.add('inactive');
                } else {
                    const usage = getDailyUsage(year, month, date);
                    cell.innerHTML = `
                        <div class="calendar-day">
                            <span class="day-number">${date}</span>
                        </div>
                    `;
                    
                    if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                        cell.classList.add('today');
                    }
                    
                    cell.addEventListener('click', () => showUsageModal(date, month, year, usage));
                    date++;
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
            if (date > daysInMonth) break; // Stop if all dates are rendered
        }
        calendarEl.appendChild(tbody);
    }
    
    /**
     * Shows the modal with usage details for a specific day.
     */
    function showUsageModal(day, month, year, usage) {
        modalDateEl.textContent = `${months[month]} ${day}, ${year}`;
        modalUsageEl.textContent = `${usage} kWh`;
        modal.classList.remove('hidden');
    }

    /**
     * Hides the usage modal.
     */
    function hideUsageModal() {
        modal.classList.add('hidden');
    }

    /**
     * Updates the calendar to show the previous or next month.
     * @param {number} direction - -1 for previous, 1 for next.
     */
    function changeMonth(direction) {
        currentMonth += direction;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        initMonthYearControls();
        generateCalendar(currentMonth, currentYear);
    }

    // --- Event Listeners ---
    if (modeBtn) modeBtn.addEventListener('click', toggleMode);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));
    if (monthSelect) monthSelect.addEventListener('change', (e) => {
        currentMonth = parseInt(e.target.value, 10);
        generateCalendar(currentMonth, currentYear);
    });
    if (yearSelect) yearSelect.addEventListener('change', (e) => {
        currentYear = parseInt(e.target.value, 10);
        generateCalendar(currentMonth, currentYear);
    });
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideUsageModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) hideUsageModal(); // Close if clicking on the overlay
    });


    // --- Initialization ---
    function init() {
        requireLogin();
        applySavedMode();
        initMonthYearControls();
        generateCalendar(currentMonth, currentYear);
    }

    // Run the initialization function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);

})();
