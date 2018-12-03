import fs = require('fs');

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

export {
	Test,
	Helper,
	Day1,
	Day2
}
