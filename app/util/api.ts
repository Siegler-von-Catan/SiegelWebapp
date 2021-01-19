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

// @ts-ignore
import axios from "axios";

const domain = process.env.DOMAIN || "";

export interface Siegel {
    id: number;
    name: string;
    heightmap: string;
}

export async function getRandomData(amount: number) {
    const result = await axios.get(domain + "/randomSiegels", {params: {amount}});
    return result.data.siegel as Siegel[];
}

export async function getDataFor(i: string) {
    const result = await axios.get(domain + "/data", {params: {i}});
    return result.data.siegel as Siegel;
}

export function getFileUrl(type: string, siegel: Siegel) {
    return `${domain}/siegel?type=${type}&id=${siegel.id}`;
}

export function openDetails(s: Siegel) {
    window.location.href = `siegel.html?s=${s.id}`;
}
