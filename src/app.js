const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather!",
        name: "yuval mashraki!"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me!",
        name: "yuval mashraki!"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text!",
        title: "Help",
        name: "yuval mashraki!"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "please give an address!" })
    }
    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, lon, (error, forecastResponse) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastResponse,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'must give search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMassage: "Help article not found!",
        title: '404 error',
        name: "yuval mashraki"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMassage: "Page not found...",
        title: '404 error',
        name: "yuval mashraki"
    })
})

app.listen(port, () => {
    console.log('server is up on port ', port)
})