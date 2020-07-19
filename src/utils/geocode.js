const request = require('request')

//old ver
// const geocodURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoieXV2YWxtYWEiLCJhIjoiY2tjbXh4bHBhMDV2dzJybGYzMHNlMmI4cSJ9.6fvfYSOornQVPIxDKcJyVw&limit=1'
// request({ url: geocodURL, json: true }, (error, response) => {
//     if (error) {
//         console.log("unable to connect!")
//     } else if (response.body.features.length === 0) {
//         console.log("couldn't find location!")
//     } else {
//         const lat = response.body.features[0].center[1]
//         const lot = response.body.features[0].center[0]
//         console.log("lat= ", lat)
//         console.log("lot= ", lot)
//     }
// })

//new ver
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieXV2YWxtYWEiLCJhIjoiY2tjbXh4bHBhMDV2dzJybGYzMHNlMmI4cSJ9.6fvfYSOornQVPIxDKcJyVw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect!', undefined)
        } else if (body.features.length === 0) {
            callback("couldn't find location!", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[0],
                lon: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
