
const Discounts = {

    list: [],

    // Load discounts
    async loadDiscounts() {
        try {
            const data = await API.get("/discounts");

            this.list = data.discounts || data;

            this.displayDiscounts();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display discounts
    displayDiscounts() {
        const container = document.getElementById("discountsList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(discount => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${Products.escapeHTML(discount.name)}</h3>
                <p>Type: ${Products.escapeHTML(discount.type)}</p>
                <p>Value: ${discount.value}</p>
                <p>Minimum Quantity: ${discount.minQuantity ?? 1}</p>
                <p>Valid Until: ${Products.escapeHTML(discount.endDate || "No end date")}</p>
                <p>Usage Limit: ${discount.usageLimit ?? "Unlimited"}</p>
            `;

            container.appendChild(card);
        });
    },

    // Create a discount
    async addDiscount(discountData) {
        try {
            const result = await API.post("/discounts", discountData);

            App.notify("Discount created successfully", "success");

            await this.loadDiscounts();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a discount
    async updateDiscount(id, discountData) {
        try {
            const result = await API.put(
                `/discounts/${id}`,
                discountData
            );

            App.notify("Discount updated successfully", "success");

            await this.loadDiscounts();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a discount
    async deleteDiscount(id) {
        if (!confirm("Are you sure you want to delete this discount?")) {
            return;
        }

        try {
            await API.delete(`/discounts/${id}`);

            App.notify("Discount deleted successfully", "success");

            await this.loadDiscounts();

        } catch (error) {
            App.notify(error.message, "error");
        }
    }

};

window.Discounts = Discounts;
