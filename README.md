# binsize.js

A JavaScript library for binary size format conversion.

## Installation

With Yarn:

```bash
yarn add binsize
```

With NPM:

```bash
npm install binsize
```

## Conversion between prefixes

BinSize can convert from and to: bits, kilobits, megabits, gigabits, terabits, bytes, kilobytes, megabytes, gigabytes and terabytes.

```javascript
import BinSize from "binsize"

console.log("15Kb is equal to " + BinSize.fromKilobits(15).bytes + "B!")
// 15Kb is equal to 1920B!
```

## Conversion to string

BinSize can automatically convert to string with pretty formatting.

```javascript
import BinSize from "binsize"

const halfMegabyte = BinSize.fromKilobytes(512)

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString() + "!")
// 1/2 of a megabyte is equal to 0.5MB!

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString({ fixed: 3 }) + "!")
// 1/2 of a megabyte is equal to 0.500MB!

console.log("1/2 of a megabyte is equal to " + halfMegabyte.toString({ whole: true }) + "!")
// 1/2 of a megabyte is equal to 512KB!
```

## Arithmetic functions

BinSize objects support four basic arithmetic operations: adding `BinSize`, substracting `BinSize`, multiplying by `number` and dividing by `number`.

```javascript
import BinSize from "binsize"

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
import BinSize from "binsize"

let obj = { size: BinSize.fromKilobits(15) }
let serialised = JSON.stringify(obj)

let deserialised = JSON.parse(serialised)
deserialised.size = new BinSize(deserialised.size)

console.log("Size is " + deserialised.size.megabits.toFixed(2) + "Mb!")
// Size is 0.01Mb!
```

## To-do

-   Node.js require( ) support
-   A function for parsing size from a string
-   Support of sizes bigger than 1023TB
