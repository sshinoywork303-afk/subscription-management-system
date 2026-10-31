
const CONFIG = {
    APP_NAME: "SubSync",
    VERSION: "1.0.0",
    API_BASE_URL: "http://localhost:5000/api"
};

const App = {

    currentUser: null,

    // Start the app
    init() {
        console.log(`${CONFIG.APP_NAME} started`);

        this.setupNavigation();
        this.setupGlobalEvents();
    },

    // Handle navigation
    setupNavigation() {
        document.addEventListener("click", (event) => {
            const link = event.target.closest("[data-page]");

            if (!link) return;

            const page = link.dataset.page;

            if (page) {
                window.location.href = page;
            }
        });
    },

    // Handle common events
    setupGlobalEvents() {
        document.addEventListener("click", (event) => {
            const logoutButton = event.target.closest("[data-logout]");

            if (logoutButton && window.Auth) {
                Auth.logout();
            }
        });
    },

    // Show notifications
    notify(message, type = "info") {
        console.log(`[${type}] ${message}`);
    }

};

// Run when the page loads
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
