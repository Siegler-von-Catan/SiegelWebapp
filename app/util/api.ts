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
import {defaults} from "lodash";

const domainServer = process.env.DOMAIN || "";
const domainMicro = process.env.DOMAIN_MICRO || "";

export class Endpoint {
    static readonly server = process.env.NODE_ENV === "development" ? domainServer : domainServer + "/api/v1";
    static readonly micro = domainMicro + "/api/v1";
}

interface RequestOptions {
    data?: any;
    params?: any;
    config?: any;
    endpoint?: string;
    prefix?: string;
}

const defaultOptions = {data: {}, params: {}, config: {}, endpoint: Endpoint.server, prefix: undefined}

export default class Api {
    static readonly post = async (url: string, options?: RequestOptions) => await Api.request(url, "POST", options);
    static readonly get = async (url: string, options?: RequestOptions) => await Api.request(url, "GET", options);

    static async request(url: string, method: string, options?: RequestOptions): Promise<any> {
        const {data, params, config, endpoint, prefix} = defaults(options, defaultOptions);
        const fullUrl = `${endpoint}${prefix ? `/${prefix}` : ""}/${url}`;
        const result = await axios.request({url: fullUrl, method, data, params: params, ...config, withCredentials: true});
        return result.data;
    }

    static async getFile(url: string, options: RequestOptions = {}): Promise<string> {
        options.config = {responseType: "blob", ...options?.config};
        const response = await Api.get(url, options);
        return await Api.readFileBlob(response);
    }

    private static async readFileBlob(blob: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
        });
    }

    static staticUrl(path: string) {
        return `${domainServer}/${path}`;
    }
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
    return `${domainServer}/${path}`;
}

export async function postGetFile(url: string, data: any, params: any = {}): Promise<string> {
    const response = await axios.post(url, data, {responseType: "blob", withCredentials: true});
    return await readFileBlob(response);
}
