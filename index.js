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
const prepareCallback = function(deferred, withoutErrorAttr) {

  // By default start with a second attribute
  let base = 2

  // But if it's not node style callback switch to the first one
  if (withoutErrorAttr)
    --base

  return function () {
    // If node style function return an error
    if (arguments[0] && !withoutErrorAttr) {
      deferred.reject(arguments[0])
    }

    else if (arguments.length < base) {
      deferred.resolve()
    }

    else if (arguments.length === base) {
      deferred.resolve(arguments[--base])
    }

    else {
      deferred.resolve(Array.prototype.slice.call(arguments, --base))
    }
  }
}

// Transform function with callback to generator
const generatorify = module.exports = function(fn, context, withoutErrorAttr) {
  return function() {
    const deferred = defer(),
          callback = prepareCallback(deferred, withoutErrorAttr),
          args     = Array.prototype.slice.call(arguments).concat(callback)

    fn.apply(context, args)
    return deferred.promise
  };
}
