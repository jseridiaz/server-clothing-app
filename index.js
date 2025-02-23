require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { calculateOrderAmount } = require('./utils/calculateOrderAmount')
const app = express()
const corsOptions = {
  origin: 'https://proyect-react-advanced-clothes-ecommerce.vercel.app', // Tu frontend en producción
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions))
const production = true
// This is your test secret API key.
const stripe = require('stripe')(
  production
    ? process.env.SECRET_KEY_STRIPE_PRODUCTION
    : process.env.SECRET_KEY_STRIPE
)
app.use(express.static('public'))
app.use(express.json())

app.get('/create-payment-intent', async (req, res) => {
  try {
    res.status(200).json('goten in production')
  } catch (error) {
    console.log(error)
  }
})
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items } = req.body

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

app.listen(4000, () => console.log('Node server listening !'))
