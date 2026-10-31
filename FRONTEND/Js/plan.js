
const Plans = {

    list: [],

    // Load all plans
    async loadPlans() {
        try {
            const data = await API.get("/plans");

            this.list = data.plans || data;

            this.displayPlans();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display plans
    displayPlans() {
        const container = document.getElementById("plansList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(plan => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(plan.name)}</h3>
                <p>Price: ₹${Number(plan.price).toFixed(2)}</p>
                <p>Billing: ${Products.escapeHTML(plan.frequency)}</p>
                <p>Minimum Quantity: ${plan.minQuantity}</p>
                <button data-edit-plan="${plan.id}">Edit</button>
                <button data-delete-plan="${plan.id}">Delete</button>
            `;

            container.appendChild(card);
        });
    },

    // Add a new plan
    async addPlan(planData) {
        try {
            const result = await API.post("/plans", planData);

            App.notify("Plan added successfully", "success");

            await this.loadPlans();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a plan
    async updatePlan(id, planData) {
        try {
            const result = await API.put(`/plans/${id}`, planData);

            App.notify("Plan updated successfully", "success");

            await this.loadPlans();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a plan
    async deletePlan(id) {
        if (!confirm("Are you sure you want to delete this plan?")) {
            return;
        }

        try {
            await API.delete(`/plans/${id}`);

            App.notify("Plan deleted successfully", "success");

            await this.loadPlans();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Plans = Plans;
