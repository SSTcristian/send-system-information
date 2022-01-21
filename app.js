const express = require('express')
const app = express()

const api = require('./public/system/exports_functions.js')
const port = 3000

const moment = require('moment');

require('moment-duration-format');

moment.locale('pt-br')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')

})

app.get('/arch', (req, res) => {
    res.status(200).json(`Windows ${api.arch()}`)
}),

app.get('/cpu', (req, res) => {
    res.status(200).json(JSON.stringify(api.cpu()[0]).substring(0, 49).replace('{', ''))
}),


app.get('/hostname', (req, res) => {
    res.status(200).json(api.hostname())

})

app.get('/homedir', (req, res) => {
    res.status(200).json(api.homedir())
})

app.get('/network', (req, res) => {
    res.status(200).json(api.networkInterfaces())
})

app.get('/plataform', (req, res) => {
    res.status(200).json(api.plataform())
})

app.get('/uptime', (req, res) => {
    const transform_date = moment.duration(api.uptime()).format('dd [dias], hh [horas], mm [minutos], ss [segundos]').replace('minsutos', 'minutos')

    res.status(200).json(transform_date)
})

app.get('/userinfo', (req, res) => {
    res.status(200).json(api.userinfo())
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})