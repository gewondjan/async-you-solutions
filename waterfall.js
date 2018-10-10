/* eslint-disable */
var asynclib = require('async');
var fs = require('fs');
var http = require('http');

asynclib.waterfall([
    function (cb) {
        cb(null, fs.readFileSync(process.argv[2]).toString());
    },
    function (url, cb) {
        results = '';
        http.get(url, function (res) {
            res.on('data', function (portion) {
                results += portion.toString();
            });
            res.on('end', () => cb(null, body));
            res.on('error', (err) => cb(err));
        });
    }
], function (err, results) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(results);
});