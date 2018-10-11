/* eslint-disable */
var fs = require('fs');
var asynclib = require('async');
var http = require('http');

async.series({
            requestOne: function (cb) {
                var result1 = '';
                http.get(process.argv[2], function (res) {
                    res.on('data', function (portion) {
                        result1 += portion.toString();
                    });
                    res.on('end', () => cb(null, result1));
                    res.on('error', (err) => cb(err));
                });
            },
            requestTwo: function (cb) {
                var result2 = '';
                http.get(process.argv[2], function (res) {
                    res.on('data', function (portion) {
                        result2 += portion.toString();
                    });
                    res.on('end', () => cb(null, result2));
                    res.on('error', (err) => cb(err));
                });
            },
            function (err, results) {
                if (err) {
                    console.log("Error: " + err);
                    return;
                }
                console.log(results);
            });