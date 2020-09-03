const express = require('express');
const ProductServices = require('../../services/products');
const passport = require('passport');

const validation = require('../../utils/middleware/validationHandler');
const { productIdSchema, updateProductSchema, createProductSchema } = require('../../utils/schema/product');
const cacheResponse = require('../../utils/cacheresponse');
const time = require('../../utils/time');

// jwt strategy
require('../../utils/auth/strategies/jwt');

function productsApi(app) {
    const router = express.Router();
    app.use('api/products', router);
    const ProductService = new ProductServices();
    router.get('/', async (req, res, next) => {
        cacheResponse(res, time.SIXTY_MINUTES_IN_SECONDS); 
        const { tags } = req.query;
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
        passport.authenticate('jwt', {session: false}),
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
    
    
    router.delete(
        '/:productId', 
        passport.authenticate('jwt', {session: false}),
        async (req, res, next) => {
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
}


module.exports = productsApi;