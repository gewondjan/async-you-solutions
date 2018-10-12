/* eslint-disable */

asynclib = require('async');
http = require('http');


asynclib.map(process.argv.slice(2), function (item, cb) {
        http.get(item, function (res) {
            var text = "";
            res.on('data', function (portion) {
                text += portion.toString();
            });
            res.on('end', () => cb(null, text));
            res.on('error', (error) => cb(error));
        });

    },
    function (error, results) {
        if (error) {
            console.error(error);
            return;
        }
        console.log(results);

    });