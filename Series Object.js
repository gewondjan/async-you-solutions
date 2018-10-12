/* eslint-disable */
var fs = require('fs');
var asynclib = require('async');
var http = require('http');

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log(process.argv[3]);

asynclib.series({
        requestOne: function (cb) {
            var resultOne = "";
            http.get(process.argv[2], function (res) {
                res.on('data', function (portion) {
                    resultOne += portion.toString();
                    // console.log(resultOne);
                });
                res.on('end', () => {
                    // console.log("in the first end");
                    cb(null, resultOne);

                });
                res.on('error', (err) => {
                    // console.log("in the first error");
                    cb(err);

                });
            });
        },
        requestTwo: function (cb) {
            var resultTwo = "";
            http.get(process.argv[3], function (res) {
                res.on('data', function (portion) {
                    resultTwo += portion.toString();
                    // console.log("resultTwo: ", resultTwo);
                });
                res.on('end', () => {
                    // console.log("in the second end");
                    // console.log(resultTwo);
                    cb(null, resultTwo);
                });
                res.on('error', (err) => {
                    // console.log("in the second error");
                    cb(err);
                });
            });
        }
    },
    function (err, results) {
        if (err) {
            console.log("Error: " + err);
            return;
        }
        console.log(results);
    });