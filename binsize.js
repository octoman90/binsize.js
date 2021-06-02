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
class BinSize {
    constructor([bits = 0, prefixPower = 0]) {
        _bits.set(this, void 0);
        _prefixPower.set(this, void 0);
        if (bits < 0 || prefixPower < 0) {
            __classPrivateFieldSet(this, _bits, 0);
            __classPrivateFieldSet(this, _prefixPower, 0);
            return this;
        }
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
    static parse(s) {
        const letters = s.match(/[tgmkib]+/i);
        const digits = s.match(/[0-9.]+/);
        if (letters === null || digits === null)
            return new BinSize([0, 0]);
        const n = parseFloat(digits[0]) * (Array.from(letters[0]).pop() === "B" ? 8 : 1);
        switch (letters[0].toLowerCase()) {
            case 'b':
                return BinSize.fromBits(n);
            case 'kb':
            case 'kib':
                return BinSize.fromKilobits(n);
            case 'mb':
            case 'mib':
                return BinSize.fromMegabits(n);
            case 'gb':
            case 'gib':
                return BinSize.fromGigabits(n);
            case 'tb':
            case 'tib':
                return BinSize.fromTerabits(n);
        }
        return new BinSize([0, 0]);
    }
    get bits() {
        return __classPrivateFieldGet(this, _bits) * Math.pow(1024, __classPrivateFieldGet(this, _prefixPower));
    }
    get kilobits() {
        return __classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 1));
    }
    get megabits() {
        return __classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 2));
    }
    get gigabits() {
        return __classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 3));
    }
    get terabits() {
        return __classPrivateFieldGet(this, _bits) * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 4));
    }
    get bytes() {
        return __classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, __classPrivateFieldGet(this, _prefixPower));
    }
    get kilobytes() {
        return __classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 1));
    }
    get megabytes() {
        return __classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 2));
    }
    get gigabytes() {
        return __classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 3));
    }
    get terabytes() {
        return __classPrivateFieldGet(this, _bits) / 8 * Math.pow(1024, (__classPrivateFieldGet(this, _prefixPower) - 4));
    }
    toJSON() {
        return [__classPrivateFieldGet(this, _bits), __classPrivateFieldGet(this, _prefixPower)];
    }
    toString({ whole, fixed, bytes } = { whole: false, fixed: 1, bytes: true }) {
        const prefixes = ['', 'k', 'm', 'g', 't'];
        const suffix = bytes ? 'B' : 'b';
        const prefix = whole ? prefixes[__classPrivateFieldGet(this, _prefixPower)] : prefixes[__classPrivateFieldGet(this, _prefixPower) + 1];
        const number = ((whole ? __classPrivateFieldGet(this, _bits) : __classPrivateFieldGet(this, _bits) / 1024) / (bytes ? 8 : 1)).toFixed(whole ? 0 : fixed);
        return number + prefix + suffix;
    }
    add(b) {
        if (__classPrivateFieldGet(this, _prefixPower) === __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) + __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(this, _prefixPower)]);
        }
        else if (__classPrivateFieldGet(this, _prefixPower) > __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) + __classPrivateFieldGet(b, _bits) * (__classPrivateFieldGet(this, _prefixPower) - __classPrivateFieldGet(b, _prefixPower)), __classPrivateFieldGet(this, _prefixPower)]);
        }
        else {
            return new BinSize([__classPrivateFieldGet(this, _bits) * (__classPrivateFieldGet(b, _prefixPower) - __classPrivateFieldGet(this, _prefixPower)) + __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(b, _prefixPower)]);
        }
    }
    substract(b) {
        if (__classPrivateFieldGet(this, _prefixPower) === __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) - __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(this, _prefixPower)]);
        }
        else if (__classPrivateFieldGet(this, _prefixPower) > __classPrivateFieldGet(b, _prefixPower)) {
            return new BinSize([__classPrivateFieldGet(this, _bits) - __classPrivateFieldGet(b, _bits) * (__classPrivateFieldGet(this, _prefixPower) - __classPrivateFieldGet(b, _prefixPower)), __classPrivateFieldGet(this, _prefixPower)]);
        }
        else {
            return new BinSize([__classPrivateFieldGet(this, _bits) * (__classPrivateFieldGet(b, _prefixPower) - __classPrivateFieldGet(this, _prefixPower)) - __classPrivateFieldGet(b, _bits), __classPrivateFieldGet(b, _prefixPower)]);
        }
    }
    multiply(n) {
        return new BinSize([__classPrivateFieldGet(this, _bits) * n, __classPrivateFieldGet(this, _prefixPower)]);
    }
    divide(n) {
        return new BinSize([__classPrivateFieldGet(this, _bits) / n, __classPrivateFieldGet(this, _prefixPower)]);
    }
}
exports.default = BinSize;
_bits = new WeakMap(), _prefixPower = new WeakMap();
