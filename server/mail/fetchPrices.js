const request = require('request');
require('dotenv').config()

const fetchPrices =() => {

    return new Promise((resolve, reject) => {

        request(process.env.API, function (error, response, body) {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });

}

module.exports = { fetchPrices }