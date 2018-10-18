/* eslint-disable */

const http = require('http');
const asynclib = require('async');

// console.log(process.argv[2]);
console.log(process.argv[3]);

//Will most likely need to ask for help on this one.
//Remember your package.lock file has both async and http in it.

asynclib.series([
        function (cb) {
            console.log("inside first series function");
            asynclib.times(5, function (i, cb) {
                console.log("inside aync times function");
                var options = {
                    hostname: process.argv[2],
                    path: '/users/create',
                    method: 'POST',
                    port: process.argv[3]
                };
                var req = http.request(options, function (response) {
                    console.log("inside http request");
                    response.on('end', function () {
                        var object = {
                            user_id: i
                        };
                        cb(null, JSON.stringify(object));
                    });
                    req.write(JSON.stringify(object));
                    req.end();
                });
            }, function (error, results) {
                if (error) {
                    console.error(error);
                    return;
                }

            });
        },
        function (cb) {
            console.log("inside second series function");
            http.get(process.argv[2] + '/users', function (response) {
                response.on('data', console.log);
                // response.on('end', () => cb(null));
            });
        }


    ],
    function (error, results) {
        if (error) {
            console.error(error);
            return;
        }
        // console.log(results);
    });