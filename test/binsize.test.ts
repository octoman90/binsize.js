import BinSize from "../src/binsize"

test('should convert from bits', () => {
	expect(BinSize.fromBits(8796093022208)._bits).toBe(8796093022208)
})

test('should convert from kilobits', () => {
	expect(BinSize.fromKilobits(8589934592)._bits).toBe(8796093022208)
})

test('should convert from megabits', () => {
	expect(BinSize.fromMegabits(8388608)._bits).toBe(8796093022208)
})

test('should convert from gigabits', () => {
	expect(BinSize.fromGigabits(8192)._bits).toBe(8796093022208)
})

test('should convert from terabits', () => {
	expect(BinSize.fromTerabits(8)._bits).toBe(8796093022208)
})

test('should convert from bytes', () => {
	expect(BinSize.fromBytes(1099511627776)._bits).toBe(8796093022208)
})

test('should convert from kilobytes', () => {
	expect(BinSize.fromKilobytes(1073741824)._bits).toBe(8796093022208)
})

test('should convert from megabytes', () => {
	expect(BinSize.fromMegabytes(1048576)._bits).toBe(8796093022208)
})

test('should convert from gigabytes', () => {
	expect(BinSize.fromGigabytes(1024)._bits).toBe(8796093022208)
})

test('should convert from terabytes', () => {
	expect(BinSize.fromTerabytes(1)._bits).toBe(8796093022208)
})

const terabyte = new BinSize(8796093022208)

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

test('should get serialised to JSON as a number of bits', () => {
	const obj = {
		size: BinSize.fromKilobits(1)
	}

	expect(JSON.stringify(obj)).toBe('{"size":1024}')
})

test('should automatically convert to string', () => {
	expect(BinSize.fromBits(4).toString()).toBe('0.5B')
	expect(BinSize.fromBytes(512).toString()).toBe('0.5KB')
	expect(BinSize.fromKilobytes(512).toString()).toBe('0.5MB')
	expect(BinSize.fromMegabytes(512).toString()).toBe('0.5GB')
	expect(BinSize.fromGigabytes(512).toString()).toBe('0.5TB')
	expect(BinSize.fromTerabytes(512).toString()).toBe('512TB')

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
	expect(BinSize.fromTerabytes(512).toString({ fixed: 2 })).toBe('512TB')
})
