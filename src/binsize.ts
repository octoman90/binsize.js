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
		while (this.#bits >= 1024) {
			this.#bits /= 1024
			this.#prefixPower += 1
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

	static parse(s: string): BinSize {
		const letters = s.match(/[tgmkib]+/i)
		const digits = s.match(/[0-9.]+/)
		if (letters === null || digits === null) return new BinSize([0, 0])

		const n: number = parseFloat(digits[0]) * (Array.from(letters[0]).pop() === "B" ? 8 : 1)

		switch (letters[0].toLowerCase()) {
			case 'b':
				return BinSize.fromBits(n)

			case 'kb':
			case 'kib':
				return BinSize.fromKilobits(n)

			case 'mb':
			case 'mib':
				return BinSize.fromMegabits(n)

			case 'gb':
			case 'gib':
				return BinSize.fromGigabits(n)

			case 'tb':
			case 'tib':
				return BinSize.fromTerabits(n)
		}

		return new BinSize([0, 0])
	}

	get bits(): number {
		return this.#bits * 1024 ** this.#prefixPower
	}

	get kilobits(): number {
		return this.#bits * 1024 ** (this.#prefixPower - 1)
	}

	get megabits(): number {
		return this.#bits * 1024 ** (this.#prefixPower - 2)
	}

	get gigabits(): number {
		return this.#bits * 1024 ** (this.#prefixPower - 3)
	}

	get terabits(): number {
		return this.#bits * 1024 ** (this.#prefixPower - 4)
	}

	get bytes(): number {
		return this.#bits / 8 * 1024 ** this.#prefixPower
	}

	get kilobytes(): number {
		return this.#bits / 8 * 1024 ** (this.#prefixPower - 1)
	}

	get megabytes(): number {
		return this.#bits / 8 * 1024 ** (this.#prefixPower - 2)
	}

	get gigabytes(): number {
		return this.#bits / 8 * 1024 ** (this.#prefixPower - 3)
	}

	get terabytes(): number {
		return this.#bits / 8 * 1024 ** (this.#prefixPower - 4)
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
		if (this.#prefixPower === b.#prefixPower) {
			return new BinSize([this.#bits + b.#bits, this.#prefixPower])
		} else if (this.#prefixPower > b.#prefixPower) {
			return new BinSize([this.#bits + b.#bits * (this.#prefixPower - b.#prefixPower), this.#prefixPower])
		} else {
			return new BinSize([this.#bits * (b.#prefixPower - this.#prefixPower) + b.#bits, b.#prefixPower])
		}
	}

	substract(b: BinSize): BinSize {
		if (this.#prefixPower === b.#prefixPower) {
			return new BinSize([this.#bits - b.#bits, this.#prefixPower])
		} else if (this.#prefixPower > b.#prefixPower) {
			return new BinSize([this.#bits - b.#bits * (this.#prefixPower - b.#prefixPower), this.#prefixPower])
		} else {
			return new BinSize([this.#bits * (b.#prefixPower - this.#prefixPower) - b.#bits, b.#prefixPower])
		}
	}

	multiply(n: number): BinSize {
		return new BinSize([this.#bits * n, this.#prefixPower])
	}

	divide(n: number): BinSize {
		if (0 === n) {
			throw new RangeError("Can't divide by 0.")
		}

		return new BinSize([this.#bits / n, this.#prefixPower])
	}
}
