require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { calculateOrderAmount } = require('./utils/calculateOrderAmount')
const app = express()
app.use(cors())
// This is your test secret API key.
const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE)

app.use(express.static('public'))
app.use(express.json())

app.get('/create-payment-intent', async (req, res) => {
  res.status(200).json('goten')
})
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items } = req.body
    console.log(calculateOrderAmount(items))

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'eur',
      payment_method_types: ['card', 'klarna', 'paypal', 'sepa_debit']
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      // automatic_payment_methods: {
      //   enabled: true
      // }
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(4000, () => console.log('Node server listening on port 4000!'))
