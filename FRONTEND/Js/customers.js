
const Customers = {

    list: [],

    // Load customers
    async loadCustomers() {
        try {
            const data = await API.get("/customers");

            this.list = data.customers || data;

            this.displayCustomers();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display customers
    displayCustomers() {
        const container = document.getElementById("customersList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(customer => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(customer.name)}</h3>
                <p>Email: ${Products.escapeHTML(customer.email)}</p>
                <p>Phone: ${Products.escapeHTML(customer.phone || "Not provided")}</p>
                <p>Company: ${Products.escapeHTML(customer.company || "Not provided")}</p>

                <button data-edit-customer="${customer.id}">Edit</button>
                <button data-delete-customer="${customer.id}">Delete</button>
            `;

            container.appendChild(card);
        });
    },

    // Add a customer
    async addCustomer(customerData) {
        try {
            const result = await API.post("/customers", customerData);

            App.notify("Customer added successfully", "success");

            await this.loadCustomers();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update customer details
    async updateCustomer(id, customerData) {
        try {
            const result = await API.put(
                `/customers/${id}`,
                customerData
            );

            App.notify("Customer updated successfully", "success");

            await this.loadCustomers();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a customer
    async deleteCustomer(id) {
        if (!confirm("Are you sure you want to delete this customer?")) {
            return;
        }

        try {
            await API.delete(`/customers/${id}`);

            App.notify("Customer deleted successfully", "success");

            await this.loadCustomers();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Customers = Customers;
