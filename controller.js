'use strict';

let response = require('./res');
let connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("My Controller Router has been running.", res);
}