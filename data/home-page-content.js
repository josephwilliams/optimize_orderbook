export const CONTENT_TYPE_CODE = 'CONTENT_TYPE_CODE'

const data = [
  {
    content: 'I started by creating a helper function to map the order string to array, with each individual order being a subarray containing the order type (food) and order ID, e.g. ["carrot", "order1"]'
  },
  {
    content: (
  `
  // this function takes the data string and returns an object whose keys
  // are the order types (e.g. 'banana') and values are order count
  // ex: { banana: 3, beef: 2 }
  const mapOrderStrToItemCount = str => {
    const itemCounts = {}
    const orders = str.split('\r')
    orders.forEach(o => {
      const order = o.split('|')
      const orderType = order[0]
      const orderId = order[1]
      itemCounts[orderType] = itemCounts[orderType] ? itemCounts[orderType] + 1 : 1
    })
    return itemCounts
  `
    ),
    type: CONTENT_TYPE_CODE,
  },
]

export default data
