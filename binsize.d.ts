export default class BinSize {
    #private;
    constructor([bits, prefixPower]: [number?, number?]);
    static fromBits(n: number): BinSize;
    static fromKilobits(n: number): BinSize;
    static fromMegabits(n: number): BinSize;
    static fromGigabits(n: number): BinSize;
    static fromTerabits(n: number): BinSize;
    static fromBytes(n: number): BinSize;
    static fromKilobytes(n: number): BinSize;
    static fromMegabytes(n: number): BinSize;
    static fromGigabytes(n: number): BinSize;
    static fromTerabytes(n: number): BinSize;
    static parse(s: string): BinSize;
    get bits(): number;
    get kilobits(): number;
    get megabits(): number;
    get gigabits(): number;
    get terabits(): number;
    get bytes(): number;
    get kilobytes(): number;
    get megabytes(): number;
    get gigabytes(): number;
    get terabytes(): number;
    toJSON(): number[];
    toString({ whole, fixed, bytes }?: {
        whole?: boolean;
        fixed?: number;
        bytes?: boolean;
    }): string;
    add(b: BinSize): BinSize;
    substract(b: BinSize): BinSize;
    multiply(n: number): BinSize;
    divide(n: number): BinSize;
}
