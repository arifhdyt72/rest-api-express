const express = require('express');
const bodyParser = require('body-parser');
const app = express()

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//get router
let routes = require('./router');
routes(app);

app.listen(3000, () => {
    console.info("Server started on port 3000")
});