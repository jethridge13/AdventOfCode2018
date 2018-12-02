import { Test } from './main'
import { Day1, Day2 } from './main'

describe('Basic tests', () => {
	it('Module is able to export basic class function', () => {
		expect(Test.helloWorld()).toEqual('Hello, World!')
	})
});

describe('Day 1', () => {
	const day1 = new Day1();
	it('Part 1 answer equals 578', () => {
		expect(day1.part1()).toEqual(578)
	})

	it('Part 2 answer equals 82516', () => {
		expect(day1.part2()).toEqual(82516)
	})
});

describe('Day 2', () => {
	const day2 = new Day2();
	it('Part 1 answer equals 7776', () => {
		expect(day2.part1()).toEqual(7776)
	})

	it('Part 2 answer equals wlkigsqyfecjqqmnxaktdrhbz', () => {
		expect(day2.part2()).toEqual('wlkigsqyfecjqqmnxaktdrhbz');
	})
});