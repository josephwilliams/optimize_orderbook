import { CONTENT_TYPE_CODE } from './utils'

// NOTE: JSON.stringify to preserve escape characters such as '\r'
const SAMPLE_STRING_1 = JSON.stringify('carrot|order1\rbanana|order2\rbeef|order3')
const SAMPLE_STRING_2 = JSON.stringify('carrot|order1\rbanana|order2\rbeef|order3\r')
const SAMPLE_STRING_3 = JSON.stringify('\rcarrot|order1\rbanana|order2\rbeef|order3')
const SAMPLE_STRING_4 = JSON.stringify('carrot|order1|quantity1\rbanana|order1|quantity8')

const data = [
  {
    content: `The following are some common and edge cases that could be used to test the 'computeRegularItems' and 'computeRegularItemsV2' functions. As I've been using JavaScript, Mocha would be my go-to test suite, as I've used it often in conjuction with Cypress for web integration and API unit tests. I've included some example mocha-esque test assertions below.`
  },
  // 1
  {
    title: 'TEST CASE',
    content: `All foods + quantities ordered same number of times`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'Array is returned with orders in same order as data string'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_1}
    const data = computeRegularItems(SAMPLE_STRING, 3)
    it('should return orders in the order they appear in data string if all ordered equal number of times', function () {
      assert.equal(data, [['carrot', 1], ['banana', 1], ['beef', 1]]);
    });
    `,
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  // 2
  {
    title: 'TEST CASE',
    content: `No orders, i.e. empty order string`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'Empty array is returned'
  },
  {
    content: `
    const SAMPLE_STRING = ''
    const data = computeRegularItems(SAMPLE_STRING, 3)
    it('should return an empty array if order string contains no characters', function () {
      assert.equal(data, []);
    });
    `,
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  // 3
  {
    title: 'TEST CASE',
    content: `'0' input for topItemsCount`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'Empty array is returned'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_1}
    const data = computeRegularItems(SAMPLE_STRING, 0)
    it('should return an empty array if 'topItemsCount' arg is 0', function () {
      assert.equal(data, []);
    });
    `,
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  // 4
  {
    title: 'TEST CASE',
    content: `topItemsCount input more than total number of items in data set`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'All orders are returned'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_1}
    const data = computeRegularItems(SAMPLE_STRING, 4)
    it('should return array of all items if 'topItemsCount' arg is greater than total number of orders', function () {
      assert.equal(data, [['carrot', 1], ['banana', 1], ['beef', 1]]);
    });
    `,
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  // 5
  {
    title: 'TEST CASE',
    content: `data string includes extra '\r' at end of string`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'No change'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_2}
    const data = computeRegularItems(SAMPLE_STRING, 3)
    it('should return array of items as intended if extra '\r' is added to data string', function () {
      assert.equal(data, [['carrot', 1], ['banana', 1], ['beef', 1]]);
    });
    `,
    type: CONTENT_TYPE_CODE,
    endWithLineBreak: true,
  },
  // 6
  {
    title: 'TEST CASE',
    content: `data string includes extra '\r' at beginning of string`
  },
  {
    title: 'EXPECTED RESULT',
    content: '(breaking) Empty subarray is returned as part of returned array; subsequent subarrays include valid data'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_3}
    const data = computeRegularItems(SAMPLE_STRING, 3)
    it('should return array of items as intended if extra '\r' is prepended to data string', function () {
      assert.equal(data, [['carrot', 1], ['banana', 1], ['beef', 1]]);
    });
    `,
    type: CONTENT_TYPE_CODE,
  },
  {
    content: 'NOTE: This is the first breaking test. We would need to add string format validation, or throw an error, if this test case occurred.',
    endWithLineBreak: true,
  },
  // 7
  {
    title: 'TEST CASE (only for computeRegularItemsV2)',
    content: `Most frequent orders all of same food, but different quantity`
  },
  {
    title: 'EXPECTED RESULT',
    content: 'Order array is returned with orders in same order as data string'
  },
  {
    content: `
    const SAMPLE_STRING = ${SAMPLE_STRING_4}
    const data = computeRegularItems(SAMPLE_STRING, 2)
    it('should return array of orders in same order as data string if no "most frequent" order; i.e. all individual orders and their respective quantities are unique combinations', function () {
      assert.equal(data, [['carrot', 'quantity1'], ['banana', 'quantity8']]);
    });
    `,
    type: CONTENT_TYPE_CODE,
  },
]

export default data
