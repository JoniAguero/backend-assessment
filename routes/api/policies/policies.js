var request = require('request');

const API_PATH = '/api';
const URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
module.exports = (app) => {
    app.get(`${API_PATH}/policies`, (req, res) => {
        request({
            url: URL,
            json: true
        }, function (error, response, body) {
            if (error) console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode);
            res.send(body)
        });
    });

}