const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0

  items.forEach((item) => {
    total += Number(item.amount.split('.').join(''))
  })
  return total
}
module.exports = { calculateOrderAmount }
