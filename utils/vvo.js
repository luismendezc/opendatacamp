const request = require('request')

const vvo = (callback) => {
    const url = 'https://www.vvo-online.de/open_data/VVO_STOPS.JSON' 

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to DVB service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = vvo