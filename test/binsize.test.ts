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

test('should convert from petabits', () => {
	expect(BinSize.fromPetabits(8796093022208).petabits).toBe(8796093022208)
})

test('should convert from exabits', () => {
	expect(BinSize.fromExabits(8589934592).petabits).toBe(8796093022208)
})

test('should convert from zettabits', () => {
	expect(BinSize.fromZettabits(8388608).petabits).toBe(8796093022208)
})

test('should convert from yottabits', () => {
	expect(BinSize.fromYottabits(8192).petabits).toBe(8796093022208)
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

test('should convert from petabytes', () => {
	expect(BinSize.fromPetabytes(1099511627776).petabits).toBe(8796093022208)
})

test('should convert from exabytes', () => {
	expect(BinSize.fromExabytes(1073741824).petabits).toBe(8796093022208)
})

test('should convert from zettabytes', () => {
	expect(BinSize.fromZettabytes(1048576).petabits).toBe(8796093022208)
})

test('should convert from yottabytes', () => {
	expect(BinSize.fromYottabytes(1024).petabits).toBe(8796093022208)
})

const terabyte = new BinSize([8, 4])
const yottabyte = new BinSize([8, 8])

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

test('should convert to petabits', () => {
	expect(yottabyte.petabits).toBe(8589934592)
})

test('should convert to exabits', () => {
	expect(yottabyte.exabits).toBe(8388608)
})

test('should convert to zettabits', () => {
	expect(yottabyte.zettabits).toBe(8192)
})

test('should convert to yottabits', () => {
	expect(yottabyte.yottabits).toBe(8)
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

test('should convert to petabytes', () => {
	expect(yottabyte.petabytes).toBe(1073741824)
})

test('should convert to exabytes', () => {
	expect(yottabyte.exabytes).toBe(1048576)
})

test('should convert to zettabytes', () => {
	expect(yottabyte.zettabytes).toBe(1024)
})

test('should convert to yottabytes', () => {
	expect(yottabyte.yottabytes).toBe(1)
})

test('should get serialised and deserialised from JSON', () => {
	const obj = {
		size: BinSize.fromKilobits(1)
	}

	expect(new BinSize(JSON.parse(JSON.stringify(obj))['size']).bits).toBe(obj.size.bits)
})

test('should automatically convert to string', () => {
	let params = {}
	expect(BinSize.fromBits(4).toString(params)).toBe('0.5B')
	expect(BinSize.fromBytes(512).toString(params)).toBe('0.5KB')
	expect(BinSize.fromKilobytes(512).toString(params)).toBe('0.5MB')
	expect(BinSize.fromMegabytes(512).toString(params)).toBe('0.5GB')
	expect(BinSize.fromGigabytes(512).toString(params)).toBe('0.5TB')
	expect(BinSize.fromTerabytes(512).toString(params)).toBe('0.5PB')
	expect(BinSize.fromPetabytes(512).toString(params)).toBe('0.5EB')
	expect(BinSize.fromExabytes(512).toString(params)).toBe('0.5ZB')
	expect(BinSize.fromZettabytes(512).toString(params)).toBe('0.5YB')
	expect(BinSize.fromYottabytes(512).toString(params)).toBe('512.0YB')

	params = { whole: true }
	expect(BinSize.fromBits(4).toString(params)).toBe('4b')
	expect(BinSize.fromBytes(512).toString(params)).toBe('512B')
	expect(BinSize.fromKilobytes(512).toString(params)).toBe('512KB')
	expect(BinSize.fromMegabytes(512).toString(params)).toBe('512MB')
	expect(BinSize.fromGigabytes(512).toString(params)).toBe('512GB')
	expect(BinSize.fromTerabytes(512).toString(params)).toBe('512TB')
	expect(BinSize.fromPetabytes(512).toString(params)).toBe('512PB')
	expect(BinSize.fromExabytes(512).toString(params)).toBe('512EB')
	expect(BinSize.fromZettabytes(512).toString(params)).toBe('512ZB')
	expect(BinSize.fromYottabytes(512).toString(params)).toBe('512YB')

	params = { fixed: 2 }
	expect(BinSize.fromBits(4).toString(params)).toBe('0.50B')
	expect(BinSize.fromBytes(512).toString(params)).toBe('0.50KB')
	expect(BinSize.fromKilobytes(512).toString(params)).toBe('0.50MB')
	expect(BinSize.fromMegabytes(512).toString(params)).toBe('0.50GB')
	expect(BinSize.fromGigabytes(512).toString(params)).toBe('0.50TB')
	expect(BinSize.fromTerabytes(512).toString(params)).toBe('0.50PB')
	expect(BinSize.fromPetabytes(512).toString(params)).toBe('0.50EB')
	expect(BinSize.fromExabytes(512).toString(params)).toBe('0.50ZB')
	expect(BinSize.fromZettabytes(512).toString(params)).toBe('0.50YB')
	expect(BinSize.fromYottabytes(512).toString(params)).toBe('512.00YB')

	params = { bytes: false, whole: true }
	expect(BinSize.fromBits(512).toString(params)).toBe('512b')
	expect(BinSize.fromKilobits(512).toString(params)).toBe('512Kb')
	expect(BinSize.fromMegabits(512).toString(params)).toBe('512Mb')
	expect(BinSize.fromGigabits(512).toString(params)).toBe('512Gb')
	expect(BinSize.fromTerabits(512).toString(params)).toBe('512Tb')
	expect(BinSize.fromPetabits(512).toString(params)).toBe('512Pb')
	expect(BinSize.fromExabits(512).toString(params)).toBe('512Eb')
	expect(BinSize.fromZettabits(512).toString(params)).toBe('512Zb')
	expect(BinSize.fromYottabits(512).toString(params)).toBe('512Yb')

	params = { bytes: false }
	expect(BinSize.fromBits(512).toString(params)).toBe('0.5Kb')
	expect(BinSize.fromKilobits(512).toString(params)).toBe('0.5Mb')
	expect(BinSize.fromMegabits(512).toString(params)).toBe('0.5Gb')
	expect(BinSize.fromGigabits(512).toString(params)).toBe('0.5Tb')
	expect(BinSize.fromTerabits(512).toString(params)).toBe('0.5Pb')
	expect(BinSize.fromPetabits(512).toString(params)).toBe('0.5Eb')
	expect(BinSize.fromExabits(512).toString(params)).toBe('0.5Zb')
	expect(BinSize.fromZettabits(512).toString(params)).toBe('0.5Yb')
	expect(BinSize.fromYottabits(512).toString(params)).toBe('512Yb')
})

test('should add sizes', () => {
	expect(BinSize.fromBytes(3).add(BinSize.fromBytes(4)).bytes).toBe(7)
	expect(BinSize.fromBytes(3).add(BinSize.fromKilobytes(1)).bytes).toBe(1027)
	expect(BinSize.fromKilobytes(1).add(BinSize.fromBytes(3)).bytes).toBe(1027)
})

test('should substract sizes', () => {
	expect(BinSize.fromBytes(4).substract(BinSize.fromBytes(3)).bytes).toBe(1)
	expect(BinSize.fromBytes(3).substract(BinSize.fromBytes(4)).bytes).toBe(-1)
	expect(BinSize.fromKilobytes(1).substract(BinSize.fromBytes(3)).bytes).toBe(1021)
	expect(BinSize.fromBytes(3).substract(BinSize.fromKilobytes(1)).bytes).toBe(-1021)
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

test('should throw when the operation result is not a safe integer', () => {
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).bits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).kilobits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).megabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).gigabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).terabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).petabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).exabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).zettabits).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).yottabits).toThrow(Error)

	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).bytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).kilobytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).megabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).gigabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).terabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).petabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).exabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).zettabytes).toThrow(Error)
	expect(() => BinSize.fromYottabytes(Number.MAX_SAFE_INTEGER * 2).yottabytes).toThrow(Error)
})
