
const Auth = {

    // Register a new user
    async register(userData) {
        try {
            const result = await API.post("/auth/register", userData);

            App.notify("Registration successful", "success");

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Log in
    async login(email, password) {
        try {
            const result = await API.post("/auth/login", {
                email,
                password
            });

            if (result.token) {
                sessionStorage.setItem("authToken", result.token);
            }

            if (result.user) {
                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify(result.user)
                );

                App.currentUser = result.user;
            }

            App.notify("Login successful", "success");

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Log out
    logout() {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("currentUser");

        App.currentUser = null;

        window.location.href = "login.html";
    },

    // Get logged-in user
    getCurrentUser() {
        const user = sessionStorage.getItem("currentUser");

        return user ? JSON.parse(user) : null;
    },

    // Check login status
    isLoggedIn() {
        return !!sessionStorage.getItem("authToken");
    },

    // Request password reset
    async forgotPassword(email) {
        try {
            const result = await API.post("/auth/forgot-password", {
                email
            });

            App.notify("Password reset request sent", "success");

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    }

};

// Make Auth available to other files
window.Auth = Auth;
