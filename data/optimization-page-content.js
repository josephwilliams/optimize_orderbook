import { CONTENT_TYPE_CODE, formatText } from './utils'

const data = [
  {
    content: 'I decided to try a few minor optimizations, such as memoizing results and various approaches to handling repeated variable cases, such as lengths of arrays. I used some simple JS time functions to test and compare the speed of functions tuned slightly differently. Ultimately, however, even up to 100,000 data items, there was rarely a significant difference when run locally.'
  },
  {
    content: (
`
  // Example time comparison test funcs
  var iterations = 100000;
  console.time('Function #1');
  for(var i = 0; i < iterations; i++ ){
    computeRegularItems(SAMPLE_STRING_1, 5);
  };
  console.timeEnd('Function #1')

  console.time('Function #2');
  for(var i = 0; i < iterations; i++ ){
    computeRegularItemsNoMemoization(SAMPLE_STRING_1, 5);
  };
  console.timeEnd('Function #2')

  // example output:
  Function #1: 172.208ms
  Function #2: 145.846ms

`
),
  type: CONTENT_TYPE_CODE,
  endWithLineBreak: true,
},
{
  content: `I tried a few optimizations, such as an 'ordersLength' variable, to prevent constantly checking orders.length. Additionally, I tried adding the 'orderTypesToOrdersArrIndex' object to essentially memoize the index of order types in the orders array.`
},
{
  content: (
    `
    const mapOrderStrToArr = str => {
      const orders = []
      // separately track orders length to prevent repeatedly counting orders.length to find next available index
      let ordersLength = 0

      // memoize order type by index in orders array
      // by doing this, we only have to iterate a single reduce function
      //  to return orders array with items and their respective counts
      const orderTypesToOrdersArrIndex = {}

      str.split('\r').forEach((o, i) => {
        const order = o.split('|')
        const orderType = order[0]
        if (orderTypesToOrdersArrIndex[orderType]) {
          orders[orderTypesToOrdersArrIndex[orderType]][1] += 1
         } else {
           orderTypesToOrdersArrIndex[orderType] = ordersLength
           orders[ordersLength] = [ orderType, 1 ]
           ordersLength += 1
         }
      })

      return orders
    }
    `
  ),
  type: CONTENT_TYPE_CODE,
  endWithLineBreak: true,
},
{
  content: `I also considered using a helper function to convert the orders array into an object in which the keys were the types and values were the order quantity, but this didn't notably improve run speeds.`
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
}

`
),
  type: CONTENT_TYPE_CODE,
  endWithLineBreak: true,
},
{
  content: formatText(`Lastly, another optimization, although it felt janky, may have been to split the initial order string by \r, rather than by the pipe symbol |.`)
},
]

export default data
