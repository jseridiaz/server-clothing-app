const { createPayment } = require('../controller/createPayment')

const routerMain = require('express').Router()
routerMain.post('/create-payment-intent', createPayment)

module.exports = routerMain
