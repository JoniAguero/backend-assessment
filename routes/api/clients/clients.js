var request = require('request');

const API_PATH = '/api';
const URL = 'http://www.mocky.io/v2/5808862710000087232b75ac';
module.exports = (app) => {

    const options = {
        uri: URL,
        json: true // Automatically parses the JSON string in the response
    };
    app.get(`${API_PATH}/clients`, (req, res)=>{
        request(options, function (error, response, body) {
            if(error) console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode);
            res.send(body)
        });
    });
    app.get(`${API_PATH}/clients/id/:id`, (req, res) => {
        const id = req.params.id;
        request(options, function (error, response, body) {
            if (error) console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode);
            const client = body.clients.find(client => client.id === id);
            res.send(client)
        });
    });
    app.get(`${API_PATH}/clients/name/:name`, (req, res) => {
        const name = req.params.name;
        request(options, function (error, response, body) {
            if (error) console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode);
            const client = body.clients.find(client => client.name === name);
            res.send(client)
        });
    });

}