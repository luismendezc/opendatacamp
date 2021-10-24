const request = require('request')

const parking = (callback) => {
    const url = 'https://api.parkendd.de/Dresden' 

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Parking Information!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = parking