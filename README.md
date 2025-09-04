RayNet - Community Solar Energy Platform
RayNet is a modern, responsive web application designed as a prototype for a community-level solar energy distribution and power bank rental service. This project showcases a complete frontend user journey, from initial landing to user authentication, booking, and account management.

🚀 Core Concept
The mission of RayNet is to make solar energy accessible and manageable for everyone. The platform is built around two main ideas:

Power Bank Rentals (Phase 1): An on-demand service allowing users to rent solar-charged power banks of various capacities for events, homes, or businesses.

Community Energy Dashboard (Phase 2, in progress): A future-facing feature where registered users can monitor and manage their solar energy consumption and potentially trade surplus energy within their community.

✨ Key Features
This project is a fully-featured frontend prototype with a consistent, professional design across all pages.

General Features
Fully Responsive Design: The entire application is optimized for a seamless experience on desktops, tablets, and mobile devices.

Day/Night Mode: A theme toggle is available on every page, allowing users to switch between light and dark modes. The preference is saved in the browser for a consistent experience.

Modern UI/UX: Clean, intuitive layouts, smooth animations, and interactive elements are used throughout the site to enhance user experience.

Page-Specific Features
1. Landing Page (landing.html)

An engaging hero section with a clear call-to-action.

A "Why Choose Us" section with animated cards that appear on scroll.

Consistent header and footer navigation.

2. User Authentication (signup.html, raynet.html)

Secure Signup: A user-friendly registration form with real-time validation for:

Password Strength: A visual meter indicates how strong the user's password is.

Password Confirmation: An instant icon shows if the passwords match.

User Sign-in: A clean login page that authenticates users against data stored in the browser.

Local Storage Backend: Simulates a backend by storing user accounts and login sessions in localStorage, allowing for a persistent demo experience.

3. Booking System (book.html, confirmation.html)

Dynamic Power Bank Selection: Users can add multiple power banks of different capacities and quantities to a single order.

Real-Time Cost Calculation: An interactive cost summary updates automatically as users add or remove items, based on a variable pricing model.

Informational Popup: A helpful modal explains energy units (kWh) in simple terms to assist users.

Document Verification: A secure file upload feature for user identity verification.

Date & Time Scheduling: Users can select delivery and pickup dates (with constraints) and times.

Confirmation Page: A dedicated page confirms a successful booking.

4. Dashboard (dashboard.html)(currently not for use)

Personalized Welcome: Greets the logged-in user by name.

Energy Statistics: Displays key metrics like energy stored, used, and remaining.

Interactive Calendar: A fully functional calendar that shows mock daily energy usage data in a popup modal.

5. Contact & Blog Pages (contact.html, blog.html)

Conditional Contact Form: A smart form that dynamically shows an "Address" field if the user selects "Technician Visit."

Professional Blog Layout: A clean, two-column layout for articles and a sidebar.

🛠️ Technology Stack
This project was built using standard frontend technologies, focusing on a clean and maintainable codebase without relying on a larger framework.

HTML5: For the core structure and content of all pages.

CSS3: For custom styling, animations, and the implementation of the day/night theme.

JavaScript (ES6): Powers all the interactivity, form validation, dynamic content generation, and localStorage management.

Tailwind CSS: Used for its utility-first classes to create a responsive and modern layout.

Font Awesome: For a rich set of icons used throughout the application.

📂 File Structure
The project is organized logically, with each page having its own dedicated HTML, CSS, and JavaScript file.

/RayNet
├── logo.png
├── landing.html
├── landing.css
├── landing.js
├── signup.html
├── signup.css
├── signup.js
├── raynet.html         (Sign-in Page)
├── raynet.css
├── raynet.js
├── dashboard.html
├── dashboard.css
├── dashboard.js
├── book.html
├── book.css
├── book.js
├── confirmation.html   (Static page)
├── contact.html
├── contact.css
├── contact.js
├── blog.html
├── blog.css
├── blog.js
└── README.md

⚙️ How It Works
As a frontend-only prototype, the application cleverly uses the browser's localStorage to simulate a database and user sessions.

User Accounts: When a user signs up, their details (fullname, username, email, password) are saved as an object in an array under the raynetUsers key in localStorage.

Login Session: Upon a successful login, the user's full name is saved under the loggedInUser key. The dashboard page reads this key to display a personalized welcome message.

🔮 Future Scope (Phase 2-includes sign-in,dashboard)
This project serves as a solid foundation for a full-stack application. The next steps would involve:

Backend Development: Building a robust server using a framework like Node.js and Express.

Database Integration: Replacing localStorage with a real database like MongoDB or PostgreSQL to permanently store user and booking data.

Full Dashboard Functionality: Connecting the dashboard to the backend to display real energy usage data.

Payment Gateway: Integrating a payment system for the booking process# RayNet
