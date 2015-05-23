[![Build Status](https://travis-ci.org/stojanovic/generatorify.svg?branch=master)](https://travis-ci.org/stojanovic/generatorify) [![npm version](https://badge.fury.io/js/generatorify.svg)](http://badge.fury.io/js/generatorify)

# Generatorify

Name is a bit misleading, this package wrap a function with callback into 
native ES6 promise so it can be used with generators.
Module is based on this [gist](https://gist.github.com/yanatan16/8216252).

## Prerequests

This library works with io.js or node.js with `--harmony` flag. It requires 
native Promises and Generators.

## Usage

```

'use strict'

const request      = require('request')
const generatorify = require('generatorify')

const requestGenerator = generatorify(request)

const load = function* () {
  let result = yield requestGenerator('http://www.google.com')

  ...
}

```

## Test

`tap test/*.js`

## Limitations

As mentioned above, this module requires io.js or node.js with `--harmony` flag.
Also it works only with functions with one callback, if you have more than one,
only one will be converted.
