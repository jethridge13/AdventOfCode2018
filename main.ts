import fs = require('fs');
const DepGraph = require('dependency-graph').DepGraph;

class Test {

	static helloWorld(): string {
		return 'Hello, World!'
	}
}

class Helper {

	getCharCount(word: string): Map<string, number> {
		const chars = new Map<string, number>();
		for (const char of word) {
			let currentCount = chars.get(char);
			if (currentCount === undefined) {
				currentCount = 0;
			}
			chars.set(char, currentCount + 1);
		}
		return chars;
	}

	/**
	 *	Returns a list of indices of differing characters
	 */
	getDifferingCharacters(str1: string, str2: string): number[] {
		if (str1.length !== str2.length) {
			throw new Error('This method is designed for use with strings of equal length');
		}
		const chars: number[] = [];
		Array.from(str1).forEach((char, index) => {
			if (char !== str2[index]) {
				chars.push(index);
			}
		});
		return chars;
	}

	getManhattanDistance(a: Point, b: Point): number {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}

	loadFileSync(path: string): string {
		return fs.readFileSync(path, 'utf8');
	}

	loadFileLinesSync(path: string): string[] {
		const data = this.loadFileSync(path);
		return data.split('\n');
	}

	*loadFileSyncGenerator(path: string): IterableIterator<string> {
		const lines = this.loadFileLinesSync(path);
		for (const line of lines) {
			yield line;
		}
	}

	parseIntWithSign(str: string): number {
		return Number(str);
	}

	printGrid(array: any[][]): void {
		for (const row of array) {
			let buffer = '';
			for(const item of row) {
				buffer += item;
			}
			console.log(buffer);
		}
	}
}

class Day1 {

	private helper = new Helper();

	part1(): number {
		// 578
		let frequency = 0;
		const data = this.helper.loadFileSync('Day1.txt');
		const lines = data.split('\n');
		for (const line of lines) {
			frequency += this.helper.parseIntWithSign(line);
		}
		return frequency;
	}

	part2(): number {
		// 82516
		let frequency = 0;
		const data = this.helper.loadFileSync('Day1.txt');
		const lines = data.split('\n');
		const frequencyMap = new Map<number, number>();
		for (const line of lines) {
			frequencyMap.set(frequency, 1);
			frequency += this.helper.parseIntWithSign(line);
			if (frequencyMap.has(frequency)) {
				return frequency;
			}
			lines.push(line);
		}
		return frequency;
	}
}

class Day2 {

	private helper = new Helper();

	part1(): number {
		// 7776
		const data = this.helper.loadFileSync('Day2.txt');
		const lines = data.split('\n');
		let doubleChars = 0;
		let tripleChars = 0;
		for (const line of lines) {
			const chars = this.helper.getCharCount(line);
			const values = Array.from(chars.values());
			if (values.includes(2)) {
				doubleChars += 1;
			}
			if (values.includes(3)) {
				tripleChars += 1;
			}
		}
		return doubleChars * tripleChars;
	}

	part2(): string {
		// wlkigsqyfecjqqmnxaktdrhbz
		const data = this.helper.loadFileSync('Day2.txt');
		const lines = data.split('\n');
		let id = '';
		let index = 0;
		for (const line of lines) {
			for (const innerLine of lines) {
				if (line === innerLine) {
					continue;
				}
				const differingChars = this.helper.getDifferingCharacters(line, innerLine);
				if (differingChars.length === 1) {
					index = differingChars[0];
					id = line;
					break;
				}
			}
		}
		return id.slice(0, index) + id.slice(index + 1);
	}

}

class Day3 {

	parseClaim(line: string): {id: string; start: string; size: string;} {
		const parts = line.split(' ');
		const id = parts[0].slice(1);
		const start = parts[2].slice(0, parts[2].length - 1);
		const size = parts[3];
		return {id, start, size};
	}

	getClaimedArea(parts: {id: string; start: string; size: string;}): number[][] {
		const startCoords = parts.start.split(',');
		const startX = parseInt(startCoords[0]);
		const startY = parseInt(startCoords[1]);

		const size = parts.size.split('x');
		const sizeX = parseInt(size[0]);
		const sizeY = parseInt(size[1]);

		const claims: number[][] = [];
		for (let i = startX; i < startX + sizeX; i++) {
			for (let j = startY; j < startY + sizeY; j++) {
				const coords = [i, j];
				claims.push(coords);
			}
		}
		return claims;
	}

	part1(): number {
		// 119572
		const help = new Helper();
		const lineGenerator = help.loadFileSyncGenerator('Day3.txt');
		let curLine = lineGenerator.next();
		const coordsMap = new Map<string, number>();
		while (!curLine.done) {
			let parts = this.parseClaim(curLine.value);
			let set = this.getClaimedArea(parts);
			set.forEach((coords) => {
				const coordsSet = coords.toString();
				let setCount = coordsMap.get(coordsSet);
				if (setCount === undefined) {
					setCount = 0;
				}
				setCount += 1;
				coordsMap.set(coordsSet, setCount);
			});
			curLine = lineGenerator.next();
		}
		let dupCount = 0;
		Array.from(coordsMap.values()).forEach(count => {
			if (count > 1) {
				dupCount += 1;
			}
		});
		return dupCount;
	}

	part2(): string {
		const help = new Helper();
		const lineGenerator = help.loadFileSyncGenerator('Day3.txt');
		let curLine = lineGenerator.next();
		while (!curLine.done) {
			let parts = this.parseClaim(curLine.value);
			let set = this.getClaimedArea(parts);
			console.log(set);
			curLine = lineGenerator.next();
		}

		return '';
	}
}

interface GuardShift {
	id: number;
	ranges: {
		min: number;
		max: number;
	}[]
}

class Day4 {
	help = new Helper();

	parseInstruction(line: string): {date: string, time: string, info: string} {
		const timestamp = line.slice(line.indexOf('[')+1, line.indexOf(']')).split(' ');
		const date = timestamp[0];
		const time = timestamp[1];
		if (line.includes('falls asleep')) {
			return {date, time, info: 'sleep'};
		} else if (line.includes('wakes up')) {
			return {date, time, info: 'wake'};
		}
		line = line.slice(line.indexOf(']'));
		return {date, time, info: line.split(' ')[2].slice(1)};
	}

	getGuardWithMostHoursSlept(guardShifts: GuardShift[]): number {
		const guards = new Map<number, number>();
		for (const guard of guardShifts) {
			let minutesSlept = 0;
			for (const range of guard.ranges) {
				minutesSlept += range.max - range.min;
			}
			let minutes = guards.get(guard.id);
			if (minutes === undefined) {
				minutes = 0;
			}
			guards.set(guard.id, minutes + minutesSlept);
		}
		let sleepiestGuard = -1;
		let mostMinutesSlept = 0;
		for (const key of guards.keys()) {
			const minutes = guards.get(key);
			if (minutes !== undefined && minutes > mostMinutesSlept) {
				mostMinutesSlept = minutes;
				sleepiestGuard = key;
			}
		}
		return sleepiestGuard;
	}

	part1() {
		// 142515
		const data = this.help.loadFileLinesSync('Day4.txt').sort();
		let currentGuard = 0;
		const guardShifts: GuardShift[] = [];
		let currentShift: GuardShift = {id: 0, ranges: []};
		let min = -1;
		let max = -1;
		for (const line of data) {
			let ins = this.parseInstruction(line);
			if (ins.info === 'wake') {
				max = Number(ins.time.split(':')[1]);
				currentShift.ranges.push({min, max})
				min = -1;
				max = -1;
			} else if (ins.info === 'sleep') {
				min = Number(ins.time.split(':')[1]);
			} else {
				if (min > 0) {
					currentShift.ranges.push({min, max: 60});
					min = -1;
					max = -1;
				}
				guardShifts.push(currentShift);
				currentShift = {id: 0, ranges: []};
				currentGuard = Number(ins.info);
				currentShift.id = currentGuard;
			}
		}

		const guardWithMostHoursSlept = this.getGuardWithMostHoursSlept(guardShifts);
		const shifts: GuardShift[] = [];
		for (const shift of guardShifts) {
			if (shift.id === guardWithMostHoursSlept) {
				shifts.push(shift);
			}
		}
		const minutes: number[] = new Array(60).fill(0);
		for (const shift of shifts) {
			for (const range of shift.ranges) {
				for (let i = range.min; i < range.max; i++) {
					minutes[i]++;
				}
			}
		}

		let maxIndex = -1;
		let maxFreq = -1;
		minutes.forEach((freq, index) => {
			if (freq > maxFreq) {
				maxFreq = freq;
				maxIndex = index;
			}
		});
		return guardWithMostHoursSlept * maxIndex;
	}

	part2() {

	}
}

class Day5 {

	help = new Helper();

	getReversedPolarity(char: string): string {
		let asciiCode = char.charCodeAt(0);
		if (asciiCode >= 97 && asciiCode <= 122) {
			asciiCode -= 32;
		} else if (asciiCode >= 65 && asciiCode <= 90) {
			asciiCode += 32;
		}
		return String.fromCharCode(asciiCode);
	}

	reduceString(data: string): string {
		for (let i = 0; i < data.length - 1; i++) {
			if (data[i+1] === this.getReversedPolarity(data[i])) {
				data = data.slice(0, i) + data.slice(i + 2);
				i -= 2;
				if (i < 0) {
					i = -1;
				}
			}
		}
		return data;
	}

	parseString(data: string): string {
		let shortestLength = Number.MAX_SAFE_INTEGER;
		let shortestString = '';
		for (let i = 0; i < 26; i++) {
			let lowerCase = String.fromCharCode(65 + i);
			let upperCase = String.fromCharCode(97 + i);
			let parsedData = data.replace(new RegExp(lowerCase, 'g'), '')
			.replace(new RegExp(upperCase, 'g'), '');
			let reducedData = this.reduceString(parsedData);
			if (reducedData.length < shortestLength) {
				shortestLength = reducedData.length;
				shortestString = reducedData;
			}
		}
		return shortestString;
	}

	part1() {
		// 10180
		const data = this.help.loadFileSync('Day5.txt');
		return this.reduceString(data).length;
	}

	part2() {
		// 5668
		const data = this.help.loadFileSync('Day5.txt');
		return this.parseString(data).length;
	}
}

interface Point {
	x: number;
	y: number;
}

class Day6 {
	help = new Helper();

	fillBoard(board: string[][], points: Point[]): string[][] {
		while (points.length > 0) {
			const newPoints = new Map<Point, string>();
			for(const point of points) {
				let pointChar = board[point.y][point.x];
				if (pointChar === '.') {
					continue;
				}
				let pointsToCheck: Point[] = [];
				pointsToCheck.push({x: point.x + 1, y: point.y});
				pointsToCheck.push({x: point.x - 1, y: point.y});
				pointsToCheck.push({x: point.x, y: point.y + 1});
				pointsToCheck.push({x: point.x, y: point.y - 1});

				for (const p of pointsToCheck) {
					if (board[p.y] !== undefined
						&& board[p.y][p.x] !== undefined) {
						if (newPoints.get(p) === undefined) {
							board[p.y][p.x] = pointChar;
							newPoints.set(p, pointChar);
						} else {
							board[p.y][p.x] = '.';
							newPoints.set(p, '.');
						}
					}
				}
			}
			points = Array.from(newPoints.keys());
		}
		return board;
	}

	getBoardFreq(board: string[][]): Map<string, number> {
		const freqMap = new Map<string, number>();
		for (const row of board) {
			for (const item of row) {
				let freq = freqMap.get(item);
				if (freq === undefined) {
					freq = 0;
				}
				freqMap.set(item, freq + 1);
			}
		}

		return freqMap;
	}

	part1() {
		const lineGenerator = this.help.loadFileSyncGenerator('Day6.txt');
		let curLine = lineGenerator.next();
		const points: Point[] = [];
		let maxX = 0;
		let maxY = 0;
		while (!curLine.done) {
			let x = Number(curLine.value.split(', ')[0]);
			let y = Number(curLine.value.split(', ')[1]);
			const newPoint: Point = {x, y};
			points.push(newPoint);

			if (x > maxX) {
				maxX = x;
			}
			if (y > maxY) {
				maxY = y;
			}

			curLine = lineGenerator.next();
		}
		const board: string[][] = []
		for (let i = 0; i < maxX; i++) {
			let array = new Array(maxY).fill('?');
			board.push(array);
		}

		let asciiCharCode = 65;
		for (const point of points) {
			board[point.y][point.x] = String.fromCharCode(asciiCharCode);
			asciiCharCode++;
			if (asciiCharCode > 90) {
				asciiCharCode = 97;
			}
		}

		const filledBoard = this.fillBoard(board, points);
		this.help.printGrid(filledBoard);
		const gridMap = this.getBoardFreq(filledBoard);
		return Math.max(...gridMap.values());
	}

	part2() {

	}
}

class Day7 {

	help = new Helper();

	parseNode(line: string): {name: string, dependsOn: string} {
		const parts = line.split(' ');
		const name = parts[7];
		const dependsOn = parts[1]
		return {name, dependsOn};
	}

	part1() {
		// NOT FOXCGRMUIKAZHYTJDNESWLPQBV
		const lineGenerator = this.help.loadFileSyncGenerator('Day7.txt');
		let curLine = lineGenerator.next();
		const graph = new DepGraph();
		while (!curLine.done) {
			let parts = this.parseNode(curLine.value);
			if (!graph.hasNode(parts.name)) {
				graph.addNode(parts.name);
			}
			if (!graph.hasNode(parts.dependsOn)) {
				graph.addNode(parts.dependsOn);
			}
			graph.addDependency(parts.name, parts.dependsOn);
			curLine = lineGenerator.next();
		}
		return graph.overallOrder().join('');
	}

	part2() {

	}
}

interface Day10Pt {
	position: {
		x: number;
		y: number;
	};
	velocity: {
		x: number;
		y: number;
	};
}

class Day10 {

	help = new Helper();

	parseLine(line: string): Day10Pt {
		const parts = line.split('<');
		let posLine = parts[1].split('>')[0];
		let velLine = parts[2];

		posLine = posLine.replace('<', '').replace('>', '');
		velLine = velLine.replace('<', '').replace('>', '');

		const posParts = posLine.split(', ');
		const velParts = velLine.split(', ');

		return {
			position: {
				x: Number(posParts[0]),
				y: Number(posParts[1])
			},
			velocity: {
				x: Number(velParts[0]),
				y: Number(velParts[1])
			}
		};
	}

	part1() {
		// PANLPAPR
		const lines = this.help.loadFileLinesSync('Day10.txt');
		const pts: Day10Pt[] = [];
		for (const line of lines) {
			pts.push(this.parseLine(line));
		}

		// Magic numbers, WOOT!
		const time = 10304;
		const dim = 80;
		const array: string[][] = [];
		for(let i = 0; i < dim; i++) {
			array.push(new Array(dim).fill('.'));
		}
		for (const pt of pts) {
			const x = pt.position.x + pt.velocity.x * time - 180;
			const y = pt.position.y + pt.velocity.y * time - 180;
			array[y][x] = '*';
		}

		this.help.printGrid(array);
		return 'PANLPAPR';
	}

	part2() {

	}
}

export {
	Test,
	Helper,
	Day1,
	Day2,
	Day3,
	Day4,
	Day5,
	Day6,
	Day7,
	Day10
}
