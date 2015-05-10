'use strict'

// Defer function using native promises
const defer = function() {
  let result = {}
  result.promise = new Promise(function(resolve, reject) {
    result.resolve = resolve
    result.reject  = reject
  })
  return result
}

// Make callback function
const prepareCallback = function(deferred) {
  return function (err) {
    if (err) {
      deferred.reject(err)
    }

    else if (arguments.length < 2) {
      deferred.resolve()
    }

    else if (arguments.length === 2) {
      deferred.resolve(arguments[1])
    }

    else {
      deferred.resolve(Array.prototype.slice.call(arguments, 1))
    }
  }
}

// Transform function with callback to generator
const generatorify = module.exports = function(fn, context) {
  return function() {
    const deferred = defer(),
          callback = prepareCallback(deferred),
          args     = Array.prototype.slice.call(arguments).concat(callback)

    fn.apply(context, args)
    return deferred.promise
  };
}
