const { calculateOrderAmount } = require('../../utils/calculateOrderAmount')

const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE)

const createPayment = async (req, res) => {
  const { items } = req.body
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur'
  })
  res.send({ clientSecret: paymentIntent.client_secret })
}

module.exports = { createPayment }
