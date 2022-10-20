'use strict';

let response = require('./res');
let connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("My Controller Router has been running.", res);
}

exports.getAllMhs = function(req, res) {
    connection.query("SELECT * FROM mahasiswa", function(error, rows, fields){
        if(error){
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

exports.getDetailMhsById = function(req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?", [id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
}

exports.addMhs = function(req, res) {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query("INSERT INTO mahasiswa(nim, nama, jurusan) VALUES(?,?,?)", [nim, nama, jurusan],
        function(error, rows, fields){
            if (error){
                console.log(error);
            }else{
                response.ok("Successfully add data mhs!", res);
            }
        }
    );
}

exports.updateMhs = function(req, res){
    let id = req.body.id;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?", [nim,nama,jurusan,id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok('Successfully to update data!', res)
        }
    });
}

exports.deleteMhs = function(req, res){
    let id = req.params.id;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id],
    function(error, rows, fields) {
        if(error){
            console.log(error)
        }else{
            response.ok("Successfully to delete data!", res)
        }
    });
}