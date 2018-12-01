import fs = require('fs');

class Test {

	static helloWorld(): string {
		return 'Hello, World!'
	}
}

class Helper {

	loadFileSync(path: string): string {
		return fs.readFileSync(path, 'utf8');
	}

	parseIntWithSign(str: string): number {
		return Number(str);
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

export {
	Test,
	Helper,
	Day1
}
