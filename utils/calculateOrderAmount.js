const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0
  items.forEach((item) => {
    total += item.amount
  })
  return total
}
module.exports = { calculateOrderAmount }
