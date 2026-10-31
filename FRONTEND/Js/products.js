
const Products = {

    // Store products
    list: [],

    // Get all products
    async loadProducts() {
        try {
            const data = await API.get("/products");

            this.list = data.products || data;

            this.displayProducts();

            return this.list;

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Display products
    displayProducts() {
        const container = document.getElementById("productsList");

        if (!container) return;

        container.innerHTML = "";

        this.list.forEach(product => {
            const row = document.createElement("div");

            row.innerHTML = `
                <h3>${this.escapeHTML(product.name)}</h3>
                <p>Type: ${this.escapeHTML(product.type)}</p>
                <p>Sales Price: ${product.salesPrice}</p>
                <p>Cost Price: ${product.costPrice}</p>
                <p>Notes: ${this.escapeHTML(product.notes || "None")}</p>
                <button data-edit-product="${product.id}">Edit</button>
                <button data-delete-product="${product.id}">Delete</button>
            `;

            container.appendChild(row);
        });
    },

    // Add a product
    async addProduct(productData) {
        try {
            const result = await API.post("/products", productData);

            App.notify("Product added successfully", "success");

            await this.loadProducts();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Update a product
    async updateProduct(id, productData) {
        try {
            const result = await API.put(`/products/${id}`, productData);

            App.notify("Product updated successfully", "success");

            await this.loadProducts();

            return result;

        } catch (error) {
            App.notify(error.message, "error");
            throw error;
        }
    },

    // Delete a product
    async deleteProduct(id) {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            await API.delete(`/products/${id}`);

            App.notify("Product deleted successfully", "success");

            await this.loadProducts();

        } catch (error) {
            App.notify(error.message, "error");
        }
    },

    // Prevent HTML injection
    escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

};

window.Products = Products;
