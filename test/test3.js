'use strict'

const test         = require('tap').test
const generatorify = require('../index')

function funcWithCallbacks(arg, callback) {
  if (!callback)
    return false

  if (arg === 0) {
    callback(null)
  } else if (arg === 1) {
    callback(null, arg + 1);
  } else {
    callback(null, arg + 1, arg + 2)
  }
}
 
function *generatorFunc(arg) {
  let genFunction = generatorify(funcWithCallbacks)

  let result = yield genFunction(arg)
  
  return result
}

test('Callback with 2 or more arguments', function(t) {
  t.plan(1)

  let genFunc     = generatorFunc(2)
  let genFuncNext = genFunc.next()

  genFuncNext.value.then(function(response) {
    t.similar(response, [3, 4], 'Request should be [3, 4]')
  })
})
