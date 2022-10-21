const express = require("express");
const auth = require('./auth');
const verification = require("./varification");
let router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

router.get('/api/v1/secret-page', verification(), auth.secretPage);

module.exports = router;