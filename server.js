const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const morgan = require('morgan');

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//get router
let routes = require('./router');
routes(app);

app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.info("Server started on port 3000")
});