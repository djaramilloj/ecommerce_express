const productMock = require('../utils/mocks/products');

class ProductService {
    constructor(){}

    getProducts({ tags }) {
        return Promise.resolve(productMock);
    }

    getProduct({ productId }) {
        return Promise.resolve(productMock[0]);
    }

    createProduct({ product }) {
        return Promise.resolve(productMock[0]);
    }

    updateProduct({ productId, product }) {
        return Promise.resolve(productMock[0]);
    }

    deleteProduct({ productId }) {
        return Promise.resolve(productMock[0]);
    }
}

module.exports = ProductService;