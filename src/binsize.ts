function throwIfZero(n: number): number {
	if (0 === n) {
		throw new RangeError('Argument can\'t be 0.')
	}

	return n
}

function throwIfUnsafe(n: number): number {
	if (!Number.isSafeInteger(n)) {
		throw new Error('Operation result is not a safe integer.')
	}

	return n
}

export default class BinSize {
	#bits: number
	#prefixPower: number

	// Total size in bits = arg[0] * 1024 ** arg[1]
	constructor([bits = 0, prefixPower = 0]: [number?, number?]) {
		// Prefix power can't be negative
		prefixPower = Math.max(prefixPower, 0)

		this.#bits = bits
		this.#prefixPower = prefixPower

		// Store numbers as smaller coefficient powers rather than fractions of bigger coefficient powers
		while (!Number.isInteger(bits)) {
			if (prefixPower < 1) {
				this.#bits = 0
				this.#prefixPower = 0

				return this
			}

			this.#bits *= 1024
			this.#prefixPower -= 1
		}

		// Store numbers as bigger coefficient powers rather than bigger numbers of smaller coefficient powers
		while (this.#bits >= 1024 && this.#prefixPower <= 8) {
			this.#bits /= 1024
			this.#prefixPower += 1
		}

		// Store numbers as bigger numbers rather than coefficient powers above yotta
		while (this.#prefixPower > 8) {
			this.#bits *= 1024
			this.#prefixPower -= 1
		}
	}

	static fromBits(n: number): BinSize {
		return new BinSize([n, 0])
	}

	static fromKilobits(n: number): BinSize {
		return new BinSize([n, 1])
	}

	static fromMegabits(n: number): BinSize {
		return new BinSize([n, 2])
	}

	static fromGigabits(n: number): BinSize {
		return new BinSize([n, 3])
	}

	static fromTerabits(n: number): BinSize {
		return new BinSize([n, 4])
	}

	static fromPetabits(n: number): BinSize {
		return new BinSize([n, 5])
	}

	static fromExabits(n: number): BinSize {
		return new BinSize([n, 6])
	}

	static fromZettabits(n: number): BinSize {
		return new BinSize([n, 7])
	}

	static fromYottabits(n: number): BinSize {
		return new BinSize([n, 8])
	}

	static fromBytes(n: number): BinSize {
		return new BinSize([n * 8, 0])
	}

	static fromKilobytes(n: number): BinSize {
		return new BinSize([n * 8, 1])
	}

	static fromMegabytes(n: number): BinSize {
		return new BinSize([n * 8, 2])
	}

	static fromGigabytes(n: number): BinSize {
		return new BinSize([n * 8, 3])
	}

	static fromTerabytes(n: number): BinSize {
		return new BinSize([n * 8, 4])
	}

	static fromPetabytes(n: number): BinSize {
		return new BinSize([n * 8, 5])
	}

	static fromExabytes(n: number): BinSize {
		return new BinSize([n * 8, 6])
	}

	static fromZettabytes(n: number): BinSize {
		return new BinSize([n * 8, 7])
	}

	static fromYottabytes(n: number): BinSize {
		return new BinSize([n * 8, 8])
	}

	static parse(s: string): BinSize {
		const letters = s.match(/[tgmkib]+/i)
		const digits = s.match(/[0-9.]+/)
		if (letters === null || digits === null) return new BinSize([0, 0])

		const bits: number = parseFloat(digits[0]) * (letters[0].slice(-1) === "B" ? 8 : 1)
		const prefixPower: number = ['b', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y'].indexOf(letters[0].slice(0, 1).toLowerCase())

		if (-1 === prefixPower) {
			return new BinSize([0, 0])
		}

		return new BinSize([bits, prefixPower])
	}

	get bits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** this.#prefixPower)
	}

	get kilobits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 1))
	}

	get megabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 2))
	}

	get gigabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 3))
	}

	get terabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 4))
	}

	get petabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 5))
	}

	get exabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 6))
	}

	get zettabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 7))
	}

	get yottabits(): number {
		return throwIfUnsafe(this.#bits * 1024 ** (this.#prefixPower - 8))
	}

	get bytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** this.#prefixPower)
	}

	get kilobytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 1))
	}

	get megabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 2))
	}

	get gigabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 3))
	}

	get terabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 4))
	}

	get petabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 5))
	}

	get exabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 6))
	}

	get zettabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 7))
	}

	get yottabytes(): number {
		return throwIfUnsafe(this.#bits / 8 * 1024 ** (this.#prefixPower - 8))
	}

	toJSON() {
		return [this.#bits, this.#prefixPower]
	}

	toString(parameters?: { whole?: boolean, fixed?: number, bytes?: boolean }): string {
		const prefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
		const p = Object.assign({
			whole: false,
			fixed: 1,
			bytes: true,
		}, parameters)

		if (p.bytes) {
			let bytes = this.#bits / 8
			let prefixPower = this.#prefixPower

			while (!Number.isInteger(bytes) && 0 < prefixPower) {
				bytes *= 1024
				prefixPower -= 1
			}

			if (p.whole) {
				if (Number.isInteger(bytes)) {
					return bytes + prefixes[prefixPower] + 'B'
				}
			} else {
				if (Number.isInteger(bytes)) {
					return (bytes / 1024).toFixed(p.fixed) + prefixes[prefixPower + 1] + 'B'
				} else {
					return bytes.toFixed(p.fixed) + prefixes[prefixPower] + 'B'
				}
			}
		}

		if (p.whole) {
			return this.#bits + prefixes[this.#prefixPower] + 'b'
		} else {
			return (this.#bits / 1024).toFixed(p.fixed) + prefixes[this.#prefixPower + 1] + 'b'
		}
	}

	add(b: BinSize): BinSize {
		if (this.#prefixPower > b.#prefixPower) {
			return new BinSize([this.#bits * 1024 ** (this.#prefixPower - b.#prefixPower) + b.#bits, b.#prefixPower])
		} else {
			return new BinSize([this.#bits + b.#bits * 1024 ** (b.#prefixPower - this.#prefixPower), this.#prefixPower])
		}
	}

	substract(b: BinSize): BinSize {
		if (this.#prefixPower > b.#prefixPower) {
			return new BinSize([this.#bits * 1024 ** (this.#prefixPower - b.#prefixPower) - b.#bits, b.#prefixPower])
		} else {
			return new BinSize([this.#bits - b.#bits * 1024 ** (b.#prefixPower - this.#prefixPower), this.#prefixPower])
		}
	}

	multiply(n: number): BinSize {
		return new BinSize([this.#bits * n, this.#prefixPower])
	}

	divide(n: number): BinSize {
		return new BinSize([this.#bits / throwIfZero(n), this.#prefixPower])
	}
}

module.exports = BinSize
