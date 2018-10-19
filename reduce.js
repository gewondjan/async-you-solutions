/* eslint-disable */

const http = require('http');
const asyncLib = require('async');

// console.log(process.argv[2]);

asyncLib.reduce(['one', 'two', 'three'], 0, function (sum, currentNumberString, reduceCallBack) {

        http.get(process.argv[2] + '?number=' + currentNumberString, function (response) {

            response.setEncoding('utf8');
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', () => {
                reduceCallBack(null, Number(body) + sum);
            });
            response.on('error', (error) => reduceCallBack(error));
        }).on('error', (error) => reduceCallBack(error));

    },
    function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(results);
    });