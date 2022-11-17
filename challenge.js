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
  }, [])

  return orders
}

// without tracking order length
const mapOrderStrToArrAlt = str => {
  const orders = []

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
       const ordersLength = orders.length
       orderTypesToOrdersArrIndex[orderType] = ordersLength
       orders[ordersLength] = [ orderType, 1 ]
     }
  }, [])

  return orders
}

// without tracking order length
const mapOrderStrToArrWithoutMemoization = str => {
  const orders = []

  str.split('\r').forEach((o, i) => {
    const order = o.split('|')
    const orderType = order[0]
    const orderTypeIndex = orders.findIndex(o => o[0] === orderType)
    if (orderTypeIndex !== -1) {
      orders[orderTypeIndex][1] += 1
     } else {
       const ordersLength = orders.length
       orders[ordersLength] = [ orderType, 1 ]
     }
  }, [])

  return orders
}

const SAMPLE_STRING_1 = 'carrot|order1\rbanana|order1\rbanana|order2\rchicken|order2\rbeef|order2\rbanana|order6\rbeef|order6'

const computeRegularItems = (dataStr, topItemsCount) => {
  return mapOrderStrToArr(dataStr)
    .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
    .map(o => o[0])
    .slice(0, topItemsCount)
}

const computeRegularItemsAlt = (dataStr, topItemsCount) => {
  return mapOrderStrToArrAlt(dataStr)
    .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
    .map(o => o[0])
    .slice(0, topItemsCount)
}

const computeRegularItemsNoMemoization = (dataStr, topItemsCount) => {
  return mapOrderStrToArrWithoutMemoization(dataStr)
    .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
    .map(o => o[0])
    .slice(0, topItemsCount)
}

// NOTES:
// - after orders are split by '\r', only the order type (food) and quantity matter; the order ID can be ignored.
// As quantity creates a unique order type, each order can be represented as `${orderFoodType}-${orderQuantity}`.
// After this subdivision, we can use similar memoization patterns followed by sorting and slicing to determine
// the most frequently ordered food type + quantity combination.

const formatOrdersWithQuantities = str => {
  return str.split('\r').map(o => {
    o = o.split('|')
    o.splice(1, 1) // remove order ID from individual orders, as its not relevant to task
    o = o.join('-')
    return o
  })
}

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

const SAMPLE_STRING_2 = 'carrot|order1|quantity1\rbanana|order1|quantity8\rbanana|order2|quantity8\rbeef|order2|quantity3\rbanana|order6|quantity7\rbeef|order6|quantity3'

// TEST CASE 1
const SAMPLE_STRING_3 = 'carrot|order1|quantity1\rbanana|order1|quantity1\rapple|order2|quantity1\rorange|order2|quantity1\rbeet|order6|quantity1\rpear|order6|quantity1'

// TEST CASE 4
const SAMPLE_STRING_4 = 'carrot|order1|quantity1\rcarrot|order1|quantity8\rcarrot|order1|quantity7\rcarrot|order1|quantity6\rcarrot|order1|quantity5\rcarrot|order1|quantity2'

// TEST CASE 4
const SAMPLE_STRING_5 = '\rcarrot|order1|quantity1\rcarrot|order1|quantity8\rcarrot|order1|quantity7\rcarrot|order1|quantity6\rcarrot|order1|quantity5\rcarrot|order1|quantity2'


const computeRegularItemsV2 = (dataStr, topItemsCount) => {
  return mapOrderWithQuantitiesStrToArr(dataStr)
    .sort((a, b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0)
    .map(o => o[0].split('-'))
    .slice(0, topItemsCount)
}

// const orders = computeRegularItems(SAMPLE_STRING_2, 2)
// console.log('> orders', orders)
//
// const ordersV2 = computeRegularItemsV2(SAMPLE_STRING_2, 5)
// console.log('> orders v2', ordersV2)

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

// TEST CASES
// 1. All foods + quantities ordered same number of times
// RESULT: order array is returned with orders in same order as data string

// 2. No orders, i.e. empty order string
// RESULT: empty array is returned

// 3. Most frequent orders all of same food, but different quantity
// RESULT: order array is returned with orders in same order as data string

// 4. '0' input for topItemsCount
// RESULT: empty array is returned

// 5. topItemsCount input more than total number of items in data set
// RESULT: all orders are returned

// 6. data string includes extra '\r' at end of string
// RESULT: no change

// 6. data string includes extra '\r' at beginning of string
// RESULT: (breaking) empty subarray is returned as part of returned array; subsequent subarrays include valid data
