
const Payments = {

    list: [],

    // Load payments
    async loadPayments() {
        try {
            const data = await API.get("/payments");

            this.list = data.payments || data;

            this.displayPayments();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display payments
    displayPayments() {
        const container = document.getElementById("paymentsList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(payment => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>Payment #${payment.id}</h3>
                <p>Invoice: ${Products.escapeHTML(payment.invoiceNumber)}</p>
                <p>Amount: ₹${Number(payment.amount).toFixed(2)}</p>
                <p>Method: ${Products.escapeHTML(payment.method)}</p>
                <p>Date: ${Products.escapeHTML(payment.date)}</p>
                <p>Note: ${Products.escapeHTML(payment.note || "None")}</p>
            `;

            container.appendChild(card);
        });
    },

    // Record a payment
    async addPayment(paymentData) {
        try {
            const result = await API.post("/payments", paymentData);

            App.notify("Payment recorded successfully", "success");

            await this.loadPayments();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a payment
    async updatePayment(id, paymentData) {
        try {
            const result = await API.put(
                `/payments/${id}`,
                paymentData
            );

            App.notify("Payment updated successfully", "success");

            await this.loadPayments();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a payment
    async deletePayment(id) {
        if (!confirm("Are you sure you want to delete this payment?")) {
            return;
        }

        try {
            await API.delete(`/payments/${id}`);

            App.notify("Payment deleted successfully", "success");

            await this.loadPayments();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Payments = Payments;
