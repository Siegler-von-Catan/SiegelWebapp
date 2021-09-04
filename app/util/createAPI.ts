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
import {postGetFile} from "./api";

const domain = process.env.DOMAIN || "";
const publicAPI = `${domain}/api/v1/userupload/public`;
const privateAPI = `${domain}/api/v1/create`;

export interface CreateSettings {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
    isInversed: boolean;
    isLowQuality: boolean;
}

export async function getCreateModel() {
    return await postGetFile(`api/v1/userupload/public/result?type=model`, {});
}

export async function getCreateHeightmap() {
    return await postGetFile(`api/v1/userupload/public/result?type=heightmap`, {});
}


/**
 * Returns an upload id which is used to retrieve the data resulting from a FabSeal Create session
 * from the public API
 * @param sessionId
 */
export async function finishCreateSession() {
    const result = await axios.post(`${privateAPI}/finish`, {}, {withCredentials: true});
}

export async function uploadCreatedImage(formData: FormData) {
    const url = `${privateAPI}/upload`;
    const result = await axios.post(url, formData, {withCredentials: true});
    return result.data;
}

export async function startProcessing(settings: CreateSettings) {
    const url = `${privateAPI}/start`;
    const result = await axios.post(url, settings, {withCredentials: true});
    return result.data;
}

export async function getCreateSessionHeightmap() {
    const response = await axios.get(`${privateAPI}/result?type=heightmap`, {responseType: "blob", withCredentials: true});
    const url = URL.createObjectURL(response.data);
    return url;
}

export async function getCreateSessionModel() {
    const response = await axios.get(`${privateAPI}/result?type=model`, {responseType: "blob", withCredentials: true});
    const url = URL.createObjectURL(response.data);
    return url;
}
