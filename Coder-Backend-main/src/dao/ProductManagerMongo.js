const productModel = require('./models/productModel');

class ProductManagerMongo {
    constructor(io) {
        this.model = productModel;
        this.io = io;
    }

    async getProducts(filter = {}, sort = null, limit = 10, page = 1) {
        try {
            const skip = (page - 1) * limit;
            const products = await this.model.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return products.map(p => p.toObject());
        } catch (error) {
            throw error;
        }
    }

    async countProducts(filter = {}) {
        try {
            const count = await this.model.countDocuments(filter);
            return count;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(pid) {
        try {
            const product = await this.model.findById(pid);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product.toObject();
        } catch (error) {
            throw error;
        }
    }

    async addProduct(data) {
        try {
            // ... Código para validar y agregar un producto ...
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, data) {
        try {
            // ... Código para actualizar un producto ...
        } catch (error) {
            throw error;
        }
    }

    async getProductDetails(productId) {
        try {
            const productDetails = await this.model.findById(productId);

            if (!productDetails) {
                throw new Error('Producto no encontrado en la base de datos');
            }

            return {
                id: productDetails._id,
                title: productDetails.title,
                description: productDetails.description,
                code: productDetails.code,
                price: productDetails.price,
                status: productDetails.status,
                stock: productDetails.stock,
                category: productDetails.category,
                thumbnails: productDetails.thumbnails,
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            // ... Código para eliminar un producto ...
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductManagerMongo;
