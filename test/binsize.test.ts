import BinSize from "../src/binsize"

test('should convert from bits', () => {
	expect(BinSize.fromBits(8796093022208).bits).toBe(8796093022208)
})

test('should convert from kilobits', () => {
	expect(BinSize.fromKilobits(8589934592).bits).toBe(8796093022208)
})

test('should convert from megabits', () => {
	expect(BinSize.fromMegabits(8388608).bits).toBe(8796093022208)
})

test('should convert from gigabits', () => {
	expect(BinSize.fromGigabits(8192).bits).toBe(8796093022208)
})

test('should convert from terabits', () => {
	expect(BinSize.fromTerabits(8).bits).toBe(8796093022208)
})

test('should convert from bytes', () => {
	expect(BinSize.fromBytes(1099511627776).bits).toBe(8796093022208)
})

test('should convert from kilobytes', () => {
	expect(BinSize.fromKilobytes(1073741824).bits).toBe(8796093022208)
})

test('should convert from megabytes', () => {
	expect(BinSize.fromMegabytes(1048576).bits).toBe(8796093022208)
})

test('should convert from gigabytes', () => {
	expect(BinSize.fromGigabytes(1024).bits).toBe(8796093022208)
})

test('should convert from terabytes', () => {
	expect(BinSize.fromTerabytes(1).bits).toBe(8796093022208)
})

const terabyte = new BinSize([8, 4])

test('should convert to bits', () => {
	expect(terabyte.bits).toBe(8796093022208)
})

test('should convert to kilobits', () => {
	expect(terabyte.kilobits).toBe(8589934592)
})

test('should convert to megabits', () => {
	expect(terabyte.megabits).toBe(8388608)
})

test('should convert to gigabits', () => {
	expect(terabyte.gigabits).toBe(8192)
})

test('should convert to terabits', () => {
	expect(terabyte.terabits).toBe(8)
})

test('should convert to bytes', () => {
	expect(terabyte.bytes).toBe(1099511627776)
})

test('should convert to kilobytes', () => {
	expect(terabyte.kilobytes).toBe(1073741824)
})

test('should convert to megabytes', () => {
	expect(terabyte.megabytes).toBe(1048576)
})

test('should convert to gigabytes', () => {
	expect(terabyte.gigabytes).toBe(1024)
})

test('should convert to terabytes', () => {
	expect(terabyte.terabytes).toBe(1)
})

test('should get serialised and deserialised from JSON', () => {
	const obj = {
		size: BinSize.fromKilobits(1)
	}

	expect(new BinSize(JSON.parse(JSON.stringify(obj))['size']).bits).toBe(obj.size.bits)
})

test('should automatically convert to string', () => {
	expect(BinSize.fromBits(4).toString()).toBe('0.5B')
	expect(BinSize.fromBytes(512).toString()).toBe('0.5KB')
	expect(BinSize.fromKilobytes(512).toString()).toBe('0.5MB')
	expect(BinSize.fromMegabytes(512).toString()).toBe('0.5GB')
	expect(BinSize.fromGigabytes(512).toString()).toBe('0.5TB')
	expect(BinSize.fromTerabytes(512).toString()).toBe('0.5PB')

	expect(BinSize.fromBits(4).toString({ whole: true })).toBe('4b')
	expect(BinSize.fromBytes(512).toString({ whole: true })).toBe('512B')
	expect(BinSize.fromKilobytes(512).toString({ whole: true })).toBe('512KB')
	expect(BinSize.fromMegabytes(512).toString({ whole: true })).toBe('512MB')
	expect(BinSize.fromGigabytes(512).toString({ whole: true })).toBe('512GB')
	expect(BinSize.fromTerabytes(512).toString({ whole: true })).toBe('512TB')

	expect(BinSize.fromBits(4).toString({ fixed: 2 })).toBe('0.50B')
	expect(BinSize.fromBytes(512).toString({ fixed: 2 })).toBe('0.50KB')
	expect(BinSize.fromKilobytes(512).toString({ fixed: 2 })).toBe('0.50MB')
	expect(BinSize.fromMegabytes(512).toString({ fixed: 2 })).toBe('0.50GB')
	expect(BinSize.fromGigabytes(512).toString({ fixed: 2 })).toBe('0.50TB')
	expect(BinSize.fromTerabytes(512).toString({ fixed: 2 })).toBe('0.50PB')
})

test('should add sizes', () => {
	expect(BinSize.fromBytes(3).add(BinSize.fromBytes(4)).bytes).toBe(7)
})

test('should substract sizes', () => {
	expect(BinSize.fromBytes(4).substract(BinSize.fromBytes(3)).bytes).toBe(1)
	expect(BinSize.fromBytes(3).substract(BinSize.fromBytes(4)).bytes).toBe(-1)
})

test('should multiply size by number', () => {
	expect(BinSize.fromBytes(3).multiply(3).bytes).toBe(9)
})

test('should divide size by number', () => {
	expect(BinSize.fromBytes(3).divide(3).bytes).toBe(1)
})

test('division by 0 should throw an error', () => {
	expect(() => BinSize.fromBytes(3).divide(0).bytes).toThrow(RangeError)
})

test('should parse size from string', () => {
	expect(BinSize.parse('0.2b').bits).toBe(BinSize.fromBits(0.2).bits)
	expect(BinSize.parse('3.1B').bits).toBe(BinSize.fromBytes(3.1).bits)
	expect(BinSize.parse('3MB').bits).toBe(BinSize.fromMegabytes(3).bits)
	expect(BinSize.parse('11GiB').bits).toBe(BinSize.fromGigabytes(11).bits)
	expect(BinSize.parse('7Tb').bits).toBe(BinSize.fromTerabits(7).bits)

	expect(BinSize.parse('b').bits).toBe(0)
	expect(BinSize.parse('7.2').bits).toBe(0)
	expect(BinSize.parse('7ib').bits).toBe(0)
})
