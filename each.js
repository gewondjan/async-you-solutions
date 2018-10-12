/* eslint-disable */

asynclib = require('async');
http = require('http');

asynclib.each([process.argv[2], process.argv[3]], function (item, cb) {
        http.get(item, function (res) {
            res.on('data', function (portion) {
                //Not retrieving any data, we just want to make the get request
            });
            res.on('end', () => cb(null));
            res.on('error', (error) => cb(error));
        });
    },
    function (error) {
        if (error) {
            console.error(error);
        }
    });