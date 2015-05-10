# Generatorify

Wrap function with callback into generator.
Based on this [gist](https://gist.github.com/yanatan16/8216252).

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
