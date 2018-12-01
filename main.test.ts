import { Test } from './main'
import { Day1 } from './main'

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