const hash = require('object-hash');

export default class HashMap {
	
	private _map: Map<any, any>;

	constructor() {
		this._map = new Map();
	}

	set(key: any, value: any): void {
		const h = hash(key);
		this._map.set(h, value);
	}

	get(key: any): any {
		return this._map.get(hash(key));
	}
}