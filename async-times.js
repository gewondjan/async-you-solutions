/* eslint-disable */

const http = require('http');
const asynclib = require('async');


var postOptions = {
    hostname: process.argv[2],
    path: '/users/create',
    method: 'POST',
    port: process.argv[3]
};


var getOptions = {
    hostname: process.argv[2],
    path: '/users',
    method: 'GET',
    port: process.argv[3]
};

function getUsers(seriesCallBack) {
    http.get(getOptions, function (response) {
        var body = '';
        response.setEncoding('utf8');
        response.on('data', function (portion) {
            body += portion;
        });
        response.on('end', () => seriesCallBack(null, body));
        response.on('error', (error) => seriesCallBack(error));
    });
}

function createUsers(seriesCallBack) {

    asynclib.times(5, function (i, timesCb) {
        var userObject = JSON.stringify({
            user_id: i + 1
        });
        var request = http.request(postOptions, function (response) {
            response.on('data', function (portion) {});
            response.on('end', () => timesCb(null, userObject));
            response.on('error', (error) => {
                return timesCb(error);
            });
        });

        request.write(userObject);
        request.end();


    }, function (error, results) {
        if (error) {
            seriesCallBack(error);
            return;
        }
        //Uncomment to debug
        //console.log(results);
        seriesCallBack(null, results);

    });
}

asynclib.series([
        function (createUserCallBack) {
            createUsers(createUserCallBack);
        },
        function (getUsersCallBack) {
            getUsers(getUsersCallBack);
        }
    ],
    function (err, results) {
        if (err) {
            console.log('Error: ', err);
            return;
        }

        console.log(results[1]);

    });