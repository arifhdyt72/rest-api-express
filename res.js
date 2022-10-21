'use strict';

exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}

exports.oknested = function(value, res){
    const result = value.reduce((acumulate, item) => {
        if(acumulate[item.nama]){
            const group = acumulate[item.nama];
            if(Array.isArray(group.matakuliah)){
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        }else{
            acumulate[item.nama] = item;
        }
        return acumulate;
    },{});

    var data = {
        'status': 200,
        'values': result
    };

    res.json(data);
    res.end();
}