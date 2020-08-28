const productMock = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductService {
    constructor(){
        this.collection = 'products';
        this.mongodb = new MongoLib();
    }

    async getProducts({ tags }) {
        const query = tags && {tags: {$in: tags}};
        const products = await this.mongodb.getAll(this.collection, query);
        return products;
    }

    async getProduct({ productId }) {
        const product = await this.mongodb.get(this.collection, productId)
        return product || {}
    }

    async createProduct({ product }) {
        const productCreated = this.mongodb.create(this.collection, product)
        return productCreated
    }

    async updateProduct({ productId, product }) {
        const productUpdated = this.mongodb.update(this.collection, productId, product)
        return productUpdated
    }

    async deleteProduct({ productId }) {
        const productDeleted = this.mongodb.delete(this.collection, productId)
        return productDeleted
    }
}

module.exports = ProductService;