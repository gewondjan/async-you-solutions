/* eslint-disable */

const http = require('http');
const asyncLib = require('async');

var body = '';
var count = 0;
asyncLib.whilst(
    function () {
        return body.trim() !== 'meerkat';
    },
    function (whilstCallBack) {
        count++;
        http.get(process.argv[2], function (response) {
            var requestContents = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                requestContents += chunk;
            });
            response.on('end', () => {
                body = requestContents;
                whilstCallBack(null, count);
            });
            response.on('error', (error) => whilstCallBack(error));
        }).on('error', (error) => whilstCallBack(error));
    },
    function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(results);
    }
);