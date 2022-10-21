'use strict';

module.exports = function(app){
    let jsonku = require('./controller');

    app.route('/').get(jsonku.index);
    app.route('/get-mhs').get(jsonku.getAllMhs);
    app.route('/get-mhs/:id').get(jsonku.getDetailMhsById);
    app.route('/add-mhs').post(jsonku.addMhs);
    app.route('/update-mhs').put(jsonku.updateMhs);
    app.route('/delete-mhs/:id').delete(jsonku.deleteMhs);
    app.route('/get-mhs-subject').get(jsonku.getJoinMhsAndSubject);
}