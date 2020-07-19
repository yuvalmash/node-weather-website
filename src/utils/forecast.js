const request = require('request')



//old ver
// const url = 'http://api.openweathermap.org/data/2.5/weather?appid=8a866af00ee82ce111ea4a7a0ea10e2a&units=metric&lat=37.7648&lon=-122.463'
// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log("unable to connect!")
//     } else if (response.body.message) {
//         console.log("unable to find location!")
//     } else {
//         const sky = response.body.weather[0].description
//         const temp = response.body.main.temp
//         console.log("Today there is a %s with %s celsius on Tel-Aviv", sky, temp)
//     }
// })

//new ver
const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?appid=8a866af00ee82ce111ea4a7a0ea10e2a&units=metric&lat=' + lon + '&lon=' + lat
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect!', undefined)
        } else if (body.message) {
            callback("unable to find location!", undefined)
        } else {
            // console.log(body)
            callback(undefined, 'Today there is a ' + body.weather[0].description + ' with ' + body.main.temp + ' celsius in ' + body.name + ' .The max temperature of this day will be ' + body.main.temp_min + ' celsius \nand the max temperature of this day will be ' + body.main.temp_max + ' celsius')
        }
    })
}

module.exports = forecast