'use strict'

// Make callback function
const prepare = function(resolve, reject, withoutErrorAttr) {

  // By default start with a second attribute
  let base = 2

  // But if it's not node style callback switch to the first one
  if (withoutErrorAttr)
    --base

  return function () {
    // If node style function return an error
    if (arguments[0] && !withoutErrorAttr) {
      reject(arguments[0])
    }

    else if (arguments.length < base) {
      resolve()
    }

    else if (arguments.length === base) {
      resolve(arguments[--base])
    }

    else {
      resolve(Array.prototype.slice.call(arguments, --base))
    }
  }
}

// Transform function with callback to generator
const generatorify = module.exports = function(fn, context, withoutErrorAttr) {
  return function() {

    let fnArgs = arguments

    return new Promise(function(resolve, reject) {
      let args     = Array.prototype.slice.call(fnArgs)
                          .concat(prepare(resolve, reject, withoutErrorAttr))

      return fn.apply(context, args)
    })
  }
}
