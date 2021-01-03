export function randomSubArray<T>(arr: T[], amount: number): T[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amount);
}

export function times<T>(n: number, iterator: (i: number) => T): T[] {
	const accum = Array(Math.max(0, n)) as T[];
	for (let i = 0; i < n; i++) {
		accum[i] = iterator(n);
	}
	return accum;
}

const re = /[?&]?([^=]+)=([^&]*)/g;
export function getQueryParams() {
	const qs = window.location.search.split('+').join(' ');

	const params: {[key: string]: string} = {};
	let tokens;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}
