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

## Basic usage

```javascript
import BinSize from "binsize"

console.log("15Kb is equal to " + BinSize.fromKilobits(15).bytes + "B!")
// 15Kb is equal to 1920B!
```

## Usage with JSON

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

-   Parsing size from a string
-   Outputting size as a formatted string
-   Size arithmetic
