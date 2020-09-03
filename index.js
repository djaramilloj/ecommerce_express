const express = require('express');
const path = require('path');
//const expressJsx = require('./express-jsx');
const boom = require('@hapi/boom');
const productRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const errorMiddleware = require('./utils/middleware/errorHandler');
const helmet = require('helmet');
const requestType = require('./utils/requestType');
// app
const app = express();

// CUSTOM ENGINE    
// app.engine("jsx", expressJsx);
// app.set("views", "./views")
// app.set("view engine", "jsx");

// middlewares
app.use(helmet())
app.use(express.json())

// static files handling
app.use("/static", express.static(path.join(__dirname, "public")))

// view engine set up
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use('/products', productRouter) 
productsApiRouter(app);
app.use('/api/auth', authApiRouter)
// redirect
app.get('/', (req, res) => {
    res.redirect('/products');
})


app.use(function(req, res, next) {
    if(requestType(req)) {
        const {
            output: {statusCode, payload}
        } = boom.notFound();
        res.status(statusCode).json(payload);
    } else {
        res.status(404).render("404");
    }
})

// error middleware
app.use(errorMiddleware.logErrors);
app.use(errorMiddleware.wrapErrors);
app.use(errorMiddleware.clientErrorHandler);
app.use(errorMiddleware.errorDefault);

// server 
const server = app.listen(8000, ()=> console.log('server running on port: http://localhost:' + server.address().port))