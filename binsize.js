"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _bits, _prefixPower;
Object.defineProperty(exports, "__esModule", { value: true });
function throwIfZero(n) {
    if (0 === n) {
        throw new RangeError('Argument can\'t be 0.');
    }
    return n;
}
function throwIfUnsafe(n) {
    if (!Number.isSafeInteger(n)) {
        throw new Error('Operation result is not a safe integer.');
    }
    return n;
}
class BinSize {
    constructor([bits = 0, prefixPower = 0]) {
        _bits.set(this, void 0);
        _prefixPower.set(this, void 0);
        prefixPower = Math.max(prefixPower, 0);
        __classPrivateFieldSet(this, _bits, bits);
        __classPrivateFieldSet(this, _prefixPower, prefixPower);
        while (!Number.isInteger(bits)) {
            if (prefixPower < 1) {
                __classPrivateFieldSet(this, _bits, 0);
                __classPrivateFieldSet(this, _prefixPower, 0);
                return this;
            }
            __classPrivateFieldSet(this, _bits, __classPrivateFieldGet(this, _bits) * 1024);
            __classPrivateFieldSet(this, _prefixPower, __classPrivateFieldGet(this, _prefixPower) - 1);
        }
        while (__classPrivateFieldGet(this, _bits) >= 1024) {
            __classPrivateFieldSet(this, _bits, __classPrivateFieldGet(this, _bits) / 1024);
            __classPrivateFieldSet(this, _prefixPower, __classPrivateFieldGet(this, _prefixPower) + 1);
        }
    }
    static fromBits(n) {
        return new BinSize([n, 0]);
    }
    static fromKilobits(n) {
        return new BinSize([n, 1]);
    }
    static fromMegabits(n) {
        return new BinSize([n, 2]);
    }
    static fromGigabits(n) {
        return new BinSize([n, 3]);
    }
    static fromTerabits(n) {
        return new BinSize([n, 4]);
    }
    static fromPetabits(n) {
        return new BinSize([n, 5]);
    }
    static fromExabits(n) {
        return new BinSize([n, 6]);
    }
    static fromZettabits(n) {
        return new BinSize([n, 7]);
    }
    static fromYottabits(n) {
        return new BinSize([n, 8]);
    }
    static fromBytes(n) {
        return new BinSize([n * 8, 0]);
    }
    static fromKilobytes(n) {
        return new BinSize([n * 8, 1]);
    }
    static fromMegabytes(n) {
        return new BinSize([n * 8, 2]);
    }
    static fromGigabytes(n) {
        return new BinSize([n * 8, 3]);
    }
    static fromTerabytes(n) {
        return new BinSize([n * 8, 4]);
    }
    static fromPetabytes(n) {
        return new BinSize([n * 8, 5]);
    }
    static fromExabytes(n) {
        return new BinSize([n * 8, 6]);
    }
    static fromZettabytes(n) {
        return new BinSize([n * 8, 7]);
    }
    static fromYottabytes(n) {
        return new BinSize([n * 8, 8]);
    }
    static parse(s) {
        const letters = s.match(/[tgmkib]+/i);
        const digits = s.match(/[0-9.]+/);
        if (letters === null || digits === null)
            return new BinSize([0, 0]);
        const bits = parseFloat(digits[0]) * (letters[0].slice(-1) === "B" ? 8 : 1);
        const prefixPower = ['b', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y'].indexOf(letters[0].slice(0, 1).toLowerCase());
        if (-1 === prefixPower) {
            return new BinSize([0, 0]);
        }
        return new BinSize([bits, prefixPower]);
    }
    get bits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, __classPrivateFieldGet(this, _prefixPower)));
    }
    get kilobits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 1)));
    }
    get megabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 2)));
    }
    get gigabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 3)));
    }
    get terabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 4)));
    }
    get petabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 5)));
    }
    get exabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 6)));
    }
    get zettabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 7)));
    }
    get yottabits() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 8)));
    }
    get bytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, __classPrivateFieldGet(this, _prefixPower)));
    }
    get kilobytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 1)));
    }
    get megabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 2)));
    }
    get gigabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 3)));
    }
    get terabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 4)));
    }
    get petabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 5)));
    }
    get exabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 6)));
    }
    get zettabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 7)));
    }
    get yottabytes() {
        return throwIfUnsafe(__classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 8)));
    }
    toJSON() {
        return [__classPrivateFieldGet(this, _bits), __classPrivateFieldGet(this, _prefixPower)];
    }
    toString(parameters) {
        const prefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        const p = Object.assign({
            whole: false,
            fixed: 1,
            bytes: true,
        }, parameters);
        if (p.bytes) {
            let bytes = __classPrivateFieldGet(this, _bits) / 8;
            let prefixPower = __classPrivateFieldGet(this, _prefixPower);
            while (!Number.isInteger(bytes) && 0 < prefixPower) {
                bytes *= 1024;
                prefixPower -= 1;
            }
            if (p.whole) {
                if (Number.isInteger(bytes)) {
                    return bytes + prefixes[prefixPower] + 'B';
                }
            }
            else {
                if (Number.isInteger(bytes)) {
                    return (bytes / 1024).toFixed(p.fixed) + prefixes[prefixPower + 1] + 'B';
                }
                else {
                    return bytes.toFixed(p.fixed) + prefixes[prefixPower] + 'B';
                }
            }
        }
        if (p.whole) {
            return __classPrivateFieldGet(this, _bits) + prefixes[__classPrivateFieldGet(this, _prefixPower)] + 'b';
        }
        else {
            return (__classPrivateFieldGet(this, _bits) / 1024).toFixed(p.fixed) + prefixes[__classPrivateFieldGet(this, _prefixPower) + 1] + 'b';
        }
    }
    add(b) {
        if (__classPrivateFieldGet(this, _prefixPower) > __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - __classPrivateFieldGet(b, _prefixPower))) + __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(b, _prefixPower)]);
        }
        else {
            return new BinSize([__classPrivateFieldGet(this, _bits) + __classPrivateFieldGet(b, _bits) * Math.pow(1024, (__classPrivateFieldGet(b, _prefixPower) - __classPrivateFieldGet(this, _prefixPower))), __classPrivateFieldGet(this, _prefixPower)]);
        }
    }
    substract(b) {
        if (__classPrivateFieldGet(this, _prefixPower) > __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - __classPrivateFieldGet(b, _prefixPower))) - __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(b, _prefixPower)]);
        }
        else {
            return new BinSize([__classPrivateFieldGet(this, _bits) - __classPrivateFieldGet(b, _bits) * Math.pow(1024, (__classPrivateFieldGet(b, _prefixPower) - __classPrivateFieldGet(this, _prefixPower))), __classPrivateFieldGet(this, _prefixPower)]);
        }
    }
    multiply(n) {
        return new BinSize([__classPrivateFieldGet(this, _bits) * n, __classPrivateFieldGet(this, _prefixPower)]);
    }
    divide(n) {
        return new BinSize([__classPrivateFieldGet(this, _bits) / throwIfZero(n), __classPrivateFieldGet(this, _prefixPower)]);
    }
}
exports.default = BinSize;
_bits = new WeakMap(), _prefixPower = new WeakMap();
module.exports = BinSize;
