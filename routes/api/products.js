const express = require('express');
const router = express.Router();
const ProductServices = require('../../services/products');

const validation = require('../../utils/middleware/validationHandler');
const { productIdSchema, productTagSchema, updateProductSchema, createProductSchema } = require('../../utils/schema/product');

const ProductService = new ProductServices();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    console.log('req', req.query);
    try {
        const products = await ProductService.getProducts({ tags })
        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch(error) {
        next(error)
    }
})

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const products = await ProductService.getProduct({ productId })
        res.status(200).json({
            data: products,
            message: 'product retreived'
        })
    }catch (error) {
        next(error);
    }
})

router.post('/', validation(createProductSchema), async (req, res, next) => {
    const { body: product } = req;
    try {
        const products = await ProductService.createProduct({ product })
        res.status(201).json({
            data: products,
            message: 'product created'
        })
    }catch (error) {
        next(error);
    }
})

router.put(
    '/:productId', 
    validation({productId: productIdSchema}, "params"), 
    validation(updateProductSchema), 
    async (req, res, next) => {
        const { productId } = req.params;
        const { body: product } = req;
        try {
            const products = await ProductService.updateProduct({ productId, product })
            res.status(200).json({
                data: products,
                message: 'products updated'
            })
        }catch (error) {
            next(error);
        }
})


router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const products = await ProductService.deleteProduct({ productId })
        res.status(200).json({
            data: products,
            message: 'products deleted'
        })
    }catch (error) {
        next(error);
    }
})


module.exports = router;