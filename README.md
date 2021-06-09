# binsize.js
![install size](https://packagephobia.com/badge?p=binsize)
[![license](https://img.shields.io/github/license/octoman90/binsize.js)](https://github.com/octoman90/binsize.js/blob/master/LICENSE)

A JavaScript library for working with binary size units.

## Installation

With Yarn:

```bash
yarn add binsize
```

With NPM:

```bash
npm install binsize
```

## Importing
You can use either ES6 syntax (e.g. in React):
```javascript
import BinSize from "binsize"
```
or CommonJS syntax (e.g. in Node.js):
```javascript
const BinSize = require("binsize")
```
## Conversion between prefixes

BinSize can convert from and to: bits, kilobits, megabits, gigabits, terabits, petabits, exabits, zettabits, yottabits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, exabytes, zettabytes and yottabytes.

```javascript
console.log("15Kb is equal to " + BinSize.fromKilobits(15).bytes + "B!")
// 15Kb is equal to 1920B!
```

## Conversion to string

BinSize can automatically convert to string with pretty formatting.

```javascript
const halfMegabyte = BinSize.fromKilobytes(512)

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString() + "!")
// 1/2 of a megabyte is equal to 0.5MB!

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString({ fixed: 3 }) + "!")
// 1/2 of a megabyte is equal to 0.500MB!

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString({ whole: true }) + "!")
// 1/2 of a megabyte is equal to 512KB!
```

## Parsing from string

BinSize can parse size from a string containing a number and units.

```javascript
const userSays = "1MB"

console.log("User says: " + BinSize.parse(userSays).kilobytes + "KB!")
// User says: 1024KB!
```

## Arithmetic functions

BinSize objects support four basic arithmetic operations: adding `BinSize`, substracting `BinSize`, multiplying by `number` and dividing by `number`.

```javascript
const sixMB = BinSize.fromMegabytes(6)
const twoMB = BinSize.fromMegabytes(2)

console.log("The sum of 6 megabytes and 2 megabytes is " + sixMB.add(twoMB).megabytes + " megabytes!")
// The sum of 6 megabytes and 2 megabytes is 8 megabytes!

console.log("The difference between 6 megabytes and 2 megabytes is " + sixMB.substract(twoMB).megabytes + " megabytes!")
// The difference between 6 megabytes and 2 megabytes is 4 megabytes!

console.log("2 megabytes is 6 times less than " + twoMB.multiply(6).megabytes + " megabytes!")
// 2 megabytes is 6 times less than 12 megabytes!

console.log("6 megabytes is 2 times more than " + sixMB.divide(2).megabytes + " megabytes!")
// 6 megabytes is 2 times more than 3 megabytes!

```

## Usage with JSON

When `object` gets converted to `JSON`, `BinSize` gets converted to `number`. You can convert it back to `BinSize` by using the constructor:

```javascript
let obj = { size: BinSize.fromKilobits(15) }
let serialised = JSON.stringify(obj)

let deserialised = JSON.parse(serialised)
deserialised.size = new BinSize(deserialised.size)

console.log("Size is " + deserialised.size.megabits.toFixed(2) + "Mb!")
// Size is 0.01Mb!
```
