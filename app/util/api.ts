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
const apiEndpoint = process.env.NODE_ENV === "development" ? domain : domain + "/api";


export async function get(url: string, params: any = {}, config: any = {}): Promise<any> {
    const result = await axios.get(`${apiEndpoint}/${url}`, {params, ...config});
    return result.data;
}

export async function post(url: string, data: any, params: any = {}, config: any = {}): Promise<any> {
    const result = await axios.post(`${apiEndpoint}/${url}`, data, {params, ...config});
    return result.data;
}


export async function postGetFile(url: string, data: any, params: any = {}): Promise<string> {
    const response = await axios.post(url, data, {responseType: "blob", withCredentials: true});
    return await readFileBlob(response);
}

export async function readFileBlob(blob: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
    });
}

export function asUrl(path: string) {
    return `${domain}/${path}`;
}
