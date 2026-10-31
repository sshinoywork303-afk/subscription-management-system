
const Utils = {

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
        }).format(amount || 0);
    },

    // Format date
    formatDate(date) {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN");
    },

    // Check valid email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Check password requirements
    isValidPassword(password) {
        return (
            password.length > 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        );
    },

    // Get element by ID
    getElement(id) {
        return document.getElementById(id);
    },

    // Show element
    show(element) {
        if (element) {
            element.style.display = "block";
        }
    },

    // Hide element
    hide(element) {
        if (element) {
            element.style.display = "none";
        }
    },

    // Check empty values
    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

};

window.Utils = Utils;
