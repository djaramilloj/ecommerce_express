const express = require('express');
const router = express.Router();

const products = [
    {
        name: 'shoes',
        price: 80,
        image: "https://source.unsplash.com/164_6wVEHfI"
    },
    {
        name: 'shirts',
        price: 30,
        image: "https://source.unsplash.com/xPJYL0l5Ii8"
    }
]

router.get('/', (req, res) => {
    res.render("products", {products})
})


module.exports = router;