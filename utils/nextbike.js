const request = require('request')

const nextbike = (radius, callback) => {
    const url = 'https://maps.nextbike.net/maps/nextbike-official.json?lat=51.0474&lng=13.7343&limit='+ radius 

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to next bike service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = nextbike