import { Test, Helper } from './main'
import { Day1, Day2, Day3, Day4, Day5, Day7, Day10 } from './main'

describe('Basic tests', () => {
	it('Module is able to export basic class function', () => {
		expect(Test.helloWorld()).toEqual('Hello, World!')
	});
});

describe('Helper tests', () => {
	const help = new Helper();
	const path = 'test.txt';
	it('loadFileSync loads file', () => {
		expect(help.loadFileSync(path)).toContain('Hello world');
	});

	it('loadFileLinesSync returns correct array', () => {
		const data = help.loadFileLinesSync(path)
		expect(data).toHaveLength(10);
		expect(data[0]).toEqual('Hello world');
	});

	it('loadFileSyncGenerator', () => {
		const lineGenerator = help.loadFileSyncGenerator(path)
		expect(lineGenerator.next().value).toEqual('Hello world');
		expect(lineGenerator.next().value).toEqual('1');
	});

	it('parseIntWithSign works with number with no sign', () => {
		expect(help.parseIntWithSign('1')).toEqual(1);
	});
	it('parseIntWithSign works with positive sign', () => {
		expect(help.parseIntWithSign('+1')).toEqual(1);
	});
	it('parseIntWithSign works with negative sign', () => {
		expect(help.parseIntWithSign('-1')).toEqual(-1);
	});
	it('parseIntWithSign returns NaN for non-numbers', () => {
		expect(help.parseIntWithSign('blarg')).toBeNaN();
	});
});

describe('Day 1', () => {
	const day1 = new Day1();
	it('Part 1 answer equals 578', () => {
		expect(day1.part1()).toEqual(578)
	});

	it('Part 2 answer equals 82516', () => {
		expect(day1.part2()).toEqual(82516)
	});
});

describe('Day 2', () => {
	const day2 = new Day2();
	it('Part 1 answer equals 7776', () => {
		expect(day2.part1()).toEqual(7776)
	});

	it('Part 2 answer equals wlkigsqyfecjqqmnxaktdrhbz', () => {
		expect(day2.part2()).toEqual('wlkigsqyfecjqqmnxaktdrhbz');
	});
});

describe('Day 3', () => {
	const day3 = new Day3();
	const parts = day3.parseClaim('#123 @ 3,2: 5x4');
	it('parseClaim works as intended', () => {
		expect(parts.id).toEqual('123');
		expect(parts.start).toEqual('3,2');
		expect(parts.size).toEqual('5x4');
	});

	it('getClaimedArea works as intended', () => {
		const area = day3.getClaimedArea(parts);
		expect(area).toContainEqual([3,2]);
		expect(area).toContainEqual([3,3]);
		expect(area).toContainEqual([7,5]);
		expect(area).not.toContainEqual([3,1]);
		expect(area).not.toContainEqual([2,2]);
	});

	it('Part 1 answer equals 119572', () => {
		expect(day3.part1()).toEqual(119572);
	});
});

describe('Day 4', () => {
	const day4 = new Day4();
	it('parseInstruction works for guard number', () => {
		const insObj = day4.parseInstruction('[1518-11-01 00:00] Guard #10 begins shift');
		expect(insObj.date).toEqual('1518-11-01');
		expect(insObj.time).toEqual('00:00');
		expect(insObj.info).toEqual('10');
	});
	it('parseInstruction works for sleep', () => {
		const insObj = day4.parseInstruction('[1518-11-01 00:05] falls asleep');
		expect(insObj.date).toEqual('1518-11-01');
		expect(insObj.time).toEqual('00:05');
		expect(insObj.info).toEqual('sleep');
	});
	it('parseInstruction works for wake', () => {
		const insObj = day4.parseInstruction('[1518-11-01 00:25] wakes up');
		expect(insObj.date).toEqual('1518-11-01');
		expect(insObj.time).toEqual('00:25');
		expect(insObj.info).toEqual('wake');
	});

	it('Part 1 answer equals 142515', () => {
		expect(day4.part1()).toEqual(142515);
	})
});

describe('Day 5', () => {
	const day5 = new Day5();
	it('reduceString works as intended', () => {
		expect(day5.reduceString('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
	});

	it('parseString works as intended', () => {
		expect(day5.parseString('dabAcCaCBAcCcaDA')).toEqual('daDA');
	})

	it('getReversedPolarity works as intended', () => {
		expect(day5.getReversedPolarity('c')).toEqual('C');
		expect(day5.getReversedPolarity('C')).toEqual('c');
		expect(day5.getReversedPolarity('a')).toEqual('A');
		expect(day5.getReversedPolarity('z')).toEqual('Z');
		expect(day5.getReversedPolarity('A')).toEqual('a');
		expect(day5.getReversedPolarity('Z')).toEqual('z');
	});

	it('Part 1 answer equals 10180', () => {
		expect(day5.part1()).toEqual(10180);
	});

	it('Part 2 answer equals 5668', () => {
		expect(day5.part2()).toEqual(5668);
	});
});

describe('Day 7', () => {
	const day7 = new Day7();
	it('parseNode works as intended', () => {
		expect(day7.parseNode('Step C must be finished before step A can begin.'))
		.toEqual({name: 'A', dependsOn: 'C'});
	});
});

describe('Day 10', () => {
	const day10 = new Day10();

	it('parseLine works as intended', () => {
		expect(day10.parseLine('position=< 9,  1> velocity=< 0,  2>'))
		.toEqual({position: {x: 9, y: 1}, velocity: {x: 0, y: 2}});
	});
});