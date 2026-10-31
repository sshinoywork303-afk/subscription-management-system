
const Invoices = {

    list: [],

    // Load invoices
    async loadInvoices() {
        try {
            const data = await API.get("/invoices");

            this.list = data.invoices || data;

            this.displayInvoices();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display invoices
    displayInvoices() {
        const container = document.getElementById("invoicesList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(invoice => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(invoice.invoiceNumber)}</h3>
                <p>Customer: ${Products.escapeHTML(invoice.customerName)}</p>
                <p>Amount: ₹${Number(invoice.totalAmount).toFixed(2)}</p>
                <p>Due Date: ${Products.escapeHTML(invoice.dueDate)}</p>
                <p>Status: ${Products.escapeHTML(invoice.status)}</p>

                <button data-confirm-invoice="${invoice.id}">Confirm</button>
                <button data-cancel-invoice="${invoice.id}">Cancel</button>
                <button data-pay-invoice="${invoice.id}">Mark Paid</button>
                <button data-print-invoice="${invoice.id}">Print</button>
            `;

            container.appendChild(card);
        });
    },

    // Create an invoice
    async createInvoice(invoiceData) {
        try {
            const result = await API.post("/invoices", invoiceData);

            App.notify("Invoice created successfully", "success");

            await this.loadInvoices();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update invoice status
    async updateStatus(id, status) {
        try {
            const result = await API.put(
                `/invoices/${id}/status`,
                { status }
            );

            App.notify("Invoice status updated", "success");

            await this.loadInvoices();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Send invoice
    async sendInvoice(id) {
        try {
            const result = await API.post(
                `/invoices/${id}/send`,
                {}
            );

            App.notify("Invoice sent successfully", "success");

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Print invoice
    printInvoice(id) {
        window.print();
    }

};

window.Invoices = Invoices;
