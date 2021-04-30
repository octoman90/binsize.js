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
}
