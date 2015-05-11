'use strict'

const test         = require('tap').test
const generatorify = require('../index')

function funcWithCallbacks(arg, callback) {
  if (!callback)
    return false

  if (arg === 0) {
    callback()
  } else if (arg === 1) {
    callback(arg + 1);
  } else {
    callback(arg + 1, arg + 2)
  }
}

function *generatorFunc(arg) {
  let genFunction = generatorify(funcWithCallbacks, null, true)

  let result = yield genFunction(arg)

  return result
}

test('Callback with 0, 1 and more argument, not node style function (`function(arg1, arg2, ...) { ... }`)', function(t) {
  t.plan(3)

  let genFunc1     = generatorFunc(0)
  let genFunc2     = generatorFunc(1)
  let genFunc3     = generatorFunc(2)
  let genFuncNext1 = genFunc1.next()
  let genFuncNext2 = genFunc2.next()
  let genFuncNext3 = genFunc3.next()

  genFuncNext1.value.then(function(response) {
    t.equal(response, undefined, 'Request should be undefined')
  })

  genFuncNext2.value.then(function(response) {
    t.equal(response, 2, 'Response should be 2')
  })

  genFuncNext3.value.then(function(response) {
    t.similar(response, [3, 4], 'Request should be [3, 4]')
  })
})
