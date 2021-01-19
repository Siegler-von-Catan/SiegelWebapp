/*
 * ShapeFromShading - Creating heightmaps out of 2D seal images.
 * Copyright (C) 2021
 * Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
