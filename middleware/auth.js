let connection = require('../koneksi');
let mysql = require('mysql');
let md5 = require('md5');
let response = require('../res');
let jwt = require('jsonwebtoken');
let config = require('../config/secret');
let ip = require('ip');

exports.register = function(req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    };

    let query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];
    
    query = mysql.format(query, table)
    connection.query(query, function(error, rows){
        if(error){
            console.error(error);
        }else{
            if(rows.length == 0){
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.error(error);
                    }else{
                        response.ok("Successfully create account!", res);
                    }
                })
            }else{
                response.ok("Email has been registered!!", res);
            }
        }
    });
}

exports.login = function(req, res) {
    const post = {
        password: req.body.password,
        email: req.body.email
    };

    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ['user', 'password', md5(post.password), 'email', post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error, rows){
        if(error){
            console.error(error);
        }else{
            if(rows.length == 1){
                let token = jwt.sign({rows}, config.secret, {
                    //detik
                    expiresIn: 1440
                });
                id_user = rows[0].id;
                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];
                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.error(error);
                    }else{
                         res.json({
                            success: true,
                            message: 'Login has been successfully',
                            token:token,
                            currUser: data.id_user
                         });
                    }
                });
            }else{
                res.json({
                    success: false,
                    message: "Login failed, email or password is wrong!"
                });
            }
        }
    })
}

exports.secretPage = function(req, res){
    response.ok("Page with authorization", res);
}