const request = require('request')

const routeDVB = (callback) => {
    const url = 'https://www.dvb.de/de-de/apps/triprequest?submit=true&originid=33000027&destinationid=33000007&arrival=false&date=23.10.2021&time=17:30&mobilityrestriction=None&solidstairs=true&escalators=true&entrance=Any&maxchanges=Unlimited&mot=Tram&mot=CityBus&mot=IntercityBus&mot=SuburbanRailway&mot=Cableway&mot=Ferry&mot=HailedSharedTaxi&mot=Train&walkingspeed=Normal&footpathtostop=5&excludealternativestops=false' 

    request({ url, html: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to DVB service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = routeDVB