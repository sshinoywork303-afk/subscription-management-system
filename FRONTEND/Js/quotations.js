
const Quotations = {

    list: [],

    // Load quotations
    async loadQuotations() {
        try {
            const data = await API.get("/quotations");

            this.list = data.quotations || data;

            this.displayQuotations();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display quotations
    displayQuotations() {
        const container = document.getElementById("quotationsList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(quotation => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(quotation.quotationNumber)}</h3>
                <p>Customer: ${Products.escapeHTML(quotation.customerName)}</p>
                <p>Plan: ${Products.escapeHTML(quotation.planName)}</p>
                <p>Total: ₹${Number(quotation.totalAmount).toFixed(2)}</p>
                <p>Valid Until: ${Products.escapeHTML(quotation.validUntil)}</p>
                <p>Status: ${Products.escapeHTML(quotation.status)}</p>

                <button data-convert-quotation="${quotation.id}">
                    Convert to Subscription
                </button>
            `;

            container.appendChild(card);
        });
    },

    // Create a quotation
    async addQuotation(quotationData) {
        try {
            const result = await API.post("/quotations", quotationData);

            App.notify("Quotation created successfully", "success");

            await this.loadQuotations();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a quotation
    async updateQuotation(id, quotationData) {
        try {
            const result = await API.put(
                `/quotations/${id}`,
                quotationData
            );

            App.notify("Quotation updated successfully", "success");

            await this.loadQuotations();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Convert quotation into subscription
    async convertToSubscription(id) {
        try {
            const result = await API.post(
                `/quotations/${id}/convert`,
                {}
            );

            App.notify("Quotation converted successfully", "success");

            await this.loadQuotations();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a quotation
    async deleteQuotation(id) {
        if (!confirm("Are you sure you want to delete this quotation?")) {
            return;
        }

        try {
            await API.delete(`/quotations/${id}`);

            App.notify("Quotation deleted successfully", "success");

            await this.loadQuotations();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Quotations = Quotations;
