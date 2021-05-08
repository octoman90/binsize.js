const prefix = {
	kilo: 1024,
	mega: 1048576,
	giga: 1073741824,
	tera: 1099511627776,
}

export default class BinSize {
	_bits: number

	constructor(bits: number) {
		this._bits = bits
	}

	toJSON() {
		return this._bits
	}

	static fromBits(n: number): BinSize {
		return new BinSize(n)
	}

	static fromKilobits(n: number): BinSize {
		return new BinSize(n * prefix.kilo)
	}

	static fromMegabits(n: number): BinSize {
		return new BinSize(n * prefix.mega)
	}

	static fromGigabits(n: number): BinSize {
		return new BinSize(n * prefix.giga)
	}

	static fromTerabits(n: number): BinSize {
		return new BinSize(n * prefix.tera)
	}

	static fromBytes(n: number): BinSize {
		return this.fromBits(n * 8)
	}

	static fromKilobytes(n: number): BinSize {
		return this.fromKilobits(n * 8)
	}

	static fromMegabytes(n: number): BinSize {
		return this.fromMegabits(n * 8)
	}

	static fromGigabytes(n: number): BinSize {
		return this.fromGigabits(n * 8)
	}

	static fromTerabytes(n: number): BinSize {
		return this.fromTerabits(n * 8)
	}

	get bits(): number {
		return this._bits
	}

	get kilobits(): number {
		return this._bits / prefix.kilo
	}

	get megabits(): number {
		return this._bits / prefix.mega
	}

	get gigabits(): number {
		return this._bits / prefix.giga
	}

	get terabits(): number {
		return this._bits / prefix.tera
	}

	get bytes(): number {
		return this.bits / 8
	}

	get kilobytes(): number {
		return this.kilobits / 8
	}

	get megabytes(): number {
		return this.megabits / 8
	}

	get gigabytes(): number {
		return this.gigabits / 8
	}

	get terabytes(): number {
		return this.terabits / 8
	}

	toString({ whole, fixed }: { whole?: boolean, fixed?: number } = { whole: false, fixed: 1 }): string {
		if (this._bits < 8) {
			return whole
				? this.bits.toString() + 'b'
				: this.bytes.toFixed(fixed).toString() + 'B'
		} else if (this._bits < prefix.kilo * 8) {
			return whole
				? this.bytes.toString() + 'B'
				: this.kilobytes.toFixed(fixed).toString() + 'KB'
		} else if (this._bits < prefix.mega * 8) {
			return whole
				? this.kilobytes.toString() + 'KB'
				: this.megabytes.toFixed(fixed).toString() + 'MB'
		} else if (this._bits < prefix.giga * 8) {
			return whole
				? this.megabytes.toString() + 'MB'
				: this.gigabytes.toFixed(fixed).toString() + 'GB'
		} else if (this._bits < prefix.tera * 8) {
			return whole
				? this.gigabytes.toString() + 'GB'
				: this.terabytes.toFixed(fixed).toString() + 'TB'
		} else {
			return this.terabytes.toString() + 'TB'
		}
	}

	add(b: BinSize): BinSize {
		return new BinSize(this.bits + b.bits)
	}

	substract(b: BinSize): BinSize {
		return new BinSize(this.bits - b.bits)
	}

	multiply(n: number): BinSize {
		return new BinSize(this.bits * n)
	}

	divide(n: number): BinSize {
		return new BinSize(this.bits / n)
	}
}
