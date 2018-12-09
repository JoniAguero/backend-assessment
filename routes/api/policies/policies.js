var request = require('request');
var rp = require('request-promise');

const API_PATH = '/api';
const URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
module.exports = (app) => {

    const options = {
        uri: URL,
        json: true // Automatically parses the JSON string in the response
    };
    app.get(`${API_PATH}/policies`, (req, res) => {
        request(options, function (error, response, body) {
            if (error) console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode);
            res.send(body)
        });
    });


    rp(options)
        .then(function (repos) {
            console.log('User has %d repos', repos.length);
        })
        .catch(function (err) {
            // API call failed...
        });

}