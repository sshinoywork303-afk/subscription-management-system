
const Subscriptions = {

    list: [],

    // Load subscriptions
    async loadSubscriptions() {
        try {
            const data = await API.get("/subscriptions");

            this.list = data.subscriptions || data;

            this.displaySubscriptions();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display subscriptions
    displaySubscriptions() {
        const container = document.getElementById("subscriptionsList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(subscription => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(subscription.subscriptionNumber)}</h3>
                <p>Customer: ${Products.escapeHTML(subscription.customerName)}</p>
                <p>Plan: ${Products.escapeHTML(subscription.planName)}</p>
                <p>Start Date: ${Products.escapeHTML(subscription.startDate)}</p>
                <p>Expiry Date: ${Products.escapeHTML(subscription.expiryDate)}</p>
                <p>Total: ₹${Number(subscription.totalAmount).toFixed(2)}</p>
                <p>Status: ${Products.escapeHTML(subscription.status)}</p>
                <button data-edit-subscription="${subscription.id}">Edit</button>
                <button data-delete-subscription="${subscription.id}">Delete</button>
            `;

            container.appendChild(card);
        });
    },

    // Create a subscription
    async addSubscription(subscriptionData) {
        try {
            const result = await API.post("/subscriptions", subscriptionData);

            App.notify("Subscription created successfully", "success");

            await this.loadSubscriptions();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a subscription
    async updateSubscription(id, subscriptionData) {
        try {
            const result = await API.put(
                `/subscriptions/${id}`,
                subscriptionData
            );

            App.notify("Subscription updated successfully", "success");

            await this.loadSubscriptions();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Change subscription status
    async updateStatus(id, status) {
        try {
            const result = await API.put(
                `/subscriptions/${id}/status`,
                { status }
            );

            App.notify("Subscription status updated", "success");

            await this.loadSubscriptions();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a subscription
    async deleteSubscription(id) {
        if (!confirm("Are you sure you want to delete this subscription?")) {
            return;
        }

        try {
            await API.delete(`/subscriptions/${id}`);

            App.notify("Subscription deleted successfully", "success");

            await this.loadSubscriptions();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Subscriptions = Subscriptions;
