/* eslint-disable */

http = require('http');
asynclib = require('async');

// console.log(process.argv[2]);
// console.log(process.argv[3]);


var hostUrl = "http://" + process.argv[2] + ":" + process.argv[3];

asynclib.series([
        function (cb) {
            asynclib.times(5, function (i, cb) {
                var opts = {
                    hostname: hostUrl,
                    path: '/users/create',
                    method: 'POST'
                };
                http.request(opts, function (res) {
                    res.on('data', function (portion) {

                    });
                });

            });
        },
        function (cb) {

        }
    ],
    function (error) {
        if (error) {
            console.error(error);
            return;
        }
    });