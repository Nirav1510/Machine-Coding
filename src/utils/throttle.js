export function throttle(fn, wait = 200) {
	let last = 0;
	let timeout;
	let lastArgs;
	return function throttled(...args) {
		const now = Date.now();
		lastArgs = args;
		const remaining = wait - (now - last);
		if (remaining <= 0) {
			last = now;
			fn.apply(this, lastArgs);
		} else if (!timeout) {
			timeout = setTimeout(() => {
				last = Date.now();
				timeout = null;
				fn.apply(this, lastArgs);
			}, remaining);
		}
	};
}
