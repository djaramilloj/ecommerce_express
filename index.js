const express = require('express');
const app = express();
const path = require('path');
const expressJsx = require('./express-jsx');
const productRouter = require('./routes/products');

// CUSTOM ENGINE    
// app.engine("jsx", expressJsx);
// app.set("views", "./views")
// app.set("view engine", "jsx");
app.use("/static", express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/products', productRouter)

const server = app.listen(8000, ()=> console.log('server running on port: http://localhost:' + server.address().port))