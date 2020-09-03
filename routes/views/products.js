const express = require('express');
const config = require('../../config/index');
const router = express.Router();
const ProductService = require('../../services/products');
const cacheResponse = require('../../utils/cacheresponse');
const time = require('../../utils/time');
 
const productService = new ProductService();

router.get('/', async (req, res, next) => {
    cacheResponse(res, time.FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
        const products = await productService.getProducts({ tags });
        res.render("products", {products, dev: config.dev})
    } catch(error) {
        next(error);
    }
})


module.exports = router;