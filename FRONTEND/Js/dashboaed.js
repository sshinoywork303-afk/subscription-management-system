
const Dashboard = {

    // Load dashboard information
    async loadDashboard() {
        try {
            const data = await API.get("/dashboard");

            this.displayStats(data);

            return data;

        } catch (error) {
            console.error("Dashboard loading failed:", error.message);
        }
    },

    // Display dashboard statistics
    displayStats(data) {
        this.updateElement("activeSubscriptions", data.activeSubscriptions);
        this.updateElement("revenueReceived", data.revenueReceived);
        this.updateElement("outstandingPayments", data.outstandingPayments);
        this.updateElement("overdueInvoices", data.overdueInvoices);
    },

    // Update a dashboard element
    updateElement(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value ?? 0;
        }
    }

};

window.Dashboard = Dashboard;
