export class SimpleCache {
	constructor({ max = 100, ttl = 60_000 } = {}) {
		this.max = max;
		this.ttl = ttl;
		this.map = new Map();
	}

	_evictIfNeeded() {
		while (this.map.size > this.max) {
			const oldestKey = this.map.keys().next().value;
			this.map.delete(oldestKey);
		}
	}

	_isExpired(entry) {
		return entry && entry.expiresAt < Date.now();
	}

	get(key) {
		const entry = this.map.get(key);
		if (!entry) return undefined;
		if (this._isExpired(entry)) {
			this.map.delete(key);
			return undefined;
		}
		this.map.delete(key);
		this.map.set(key, entry);
		return entry.value;
	}

	set(key, value) {
		const entry = { value, expiresAt: Date.now() + this.ttl };
		this.map.set(key, entry);
		this._evictIfNeeded();
		return value;
	}
}
