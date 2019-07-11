const fs = require('fs')
const test = require('tape')
const transform = require('../')

test('transform', (t) => {
  const content = fs.readFileSync(require.resolve('./yarn.lock-before'), 'utf8')
  const expected = fs.readFileSync(require.resolve('./yarn.lock-after'), 'utf8')

  const result = transform(content)
  t.equal(result, expected)

  t.end()
})
