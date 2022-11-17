import {
  CONTENT_TYPE_CODE,
  CONTENT_TYPE_TITLE,
  formatText,
} from './utils'

const data = [
  {
    content: 'computeRegularItems',
    type: CONTENT_TYPE_TITLE,
  },
  {
    content: 'I started by creating a helper function to map the order string to array, with each individual order being a subarray containing the order type (food) and order ID, e.g. ["carrot", "order1"]. This functions suffix ("without memorization") refers to not tracking the orders array length or index of orders array types. Ive included an alternate version of this function in the Optimizations section.'
  },
  {
    content: (
  `
  const mapOrderStrToArrWithoutMemoization = str => {
    // create new orders array
    const orders = []

    // split order string by forward-slash-r
    str.split('').forEach((o, i) => {
      // split each order by |, dividing it into order type (food) and quantity
      const order = o.split('|')
      const orderType = order[0]
      // rather than memoizing index of orders array types, we check on each iteration if the type exists in the orders array
      const orderTypeIndex = orders.findIndex(o => o[0] === orderType)
      // If so, we increase quantity by 1
      if (orderTypeIndex !== -1) {
        orders[orderTypeIndex][1] += 1
       } else {
         //  If not, we add the order type as a subarray to the orders array with quantity 1
         const ordersLength = orders.length
         orders[ordersLength] = [ orderType, 1 ]
       }
    })

    // return the list of orders
    return orders
  }
  `
    ),
    type: CONTENT_TYPE_CODE,
  },
  {
    content: 'It seemed that the best strategy for determining which order type had the highest quantity was via sorting the array of all orders and their quantities, mapping the resulting array to include only order type, then slicing the array based on the topItemsCount arg. I used the same sorting based approach in V2.',
  },
  {
    content: (
      `
      const computeRegularItemsNoMemoization = (dataStr, topItemsCount) => {
        return mapOrderStrToArrWithoutMemoization(dataStr)
          .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
          .map(o => o[0])
          .slice(0, topItemsCount)
      }
      `
    ),
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  {
    content: 'computeRegularItemsV2',
    type: CONTENT_TYPE_TITLE,
  },
  {
    content: formatText(`NOTES - after orders are split by \r, only the order type (food) and quantity matter; the order ID can be ignored. As quantity creates a unique order type, each order can be represented as <orderFoodType>-<orderQuantity>. After this subdivision, we can use similar memoization patterns followed by sorting and slicing to determine the most frequently ordered food type + quantity combination.`)
  },
  {
    content: (
`
const formatOrdersWithQuantities = str => {
  return str.split('\r').map(o => {
    o = o.split('|')
    o.splice(1, 1) // remove order ID from individual orders, as its not relevant to task
    o = o.join('-')
    return o
  })
}
`
),
type: CONTENT_TYPE_CODE,
},
{
  content: (
    `
    // Utilizing a similar function to v1 to map orders and their quantities to an arr
    const mapOrderWithQuantitiesStrToArr = str => {
      const strFormatted = formatOrdersWithQuantities(str)

      const orders = []
      // separately track orders length to prevent repeatedly counting orders.length to find next available index
      let ordersLength = 0

      // memoize order type by index in orders array
      // by doing this, we only have to iterate a single reduce function
      //  to return orders array with items and their respective counts
      const orderTypesToOrdersArrIndex = {}

      strFormatted.forEach((orderType, i) => {
        if (orderTypesToOrdersArrIndex[orderType]) {
          orders[orderTypesToOrdersArrIndex[orderType]][1] += 1
         } else {
           orderTypesToOrdersArrIndex[orderType] = ordersLength
           orders[ordersLength] = [ orderType, 1 ]
           ordersLength += 1
         }
      }, [])

      return orders
    }
    `
  ),
  type: CONTENT_TYPE_CODE,
},
{
  content: 'Now, using all of our helper functions, we can call our V2 function:'
},
{
  content: (
    `
    const computeRegularItemsV2 = (dataStr, topItemsCount) => {
      return mapOrderWithQuantitiesStrToArr(dataStr)
        .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
        .map(o => o[0].split('-'))
        .slice(0, topItemsCount)
    }
    `
  ),
  type: CONTENT_TYPE_CODE,
}
]

export default data
