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

export async function getCreateModel(uploadId: number) {
    return await postGetFile(`api/v1/userupload/public/result?id=${uploadId}&type=model`, {});
}

export async function getCreateHeightmap(uploadId: number) {
    return await postGetFile(`api/v1/userupload/public/result?id=${uploadId}&type=heightmap`, {});
}

/**
 * Returns a session id which is used throughout a user FabSeal Create session to access
 * the private API
 */
export async function startCreateSession() {
    const result = await axios.post(`${privateAPI}/new`);
    return result.data.id as number;
}

/**
 * Returns an upload id which is used to retrieve the data resulting from a FabSeal Create session
 * from the public API
 * @param sessionId
 */
export async function finishCreateSession(sessionId: number) {
    const result = await axios.post(`${privateAPI}/finish?id=${sessionId}`);
    return result.data.id as number;
}

export async function uploadCreatedImage(sessionId: number, formData: FormData) {
    const url = `${privateAPI}/upload?id=${sessionId}`;
    const result = await axios.post(url, formData);
    return result.data;
}

export async function startProcessing(sessionId: number, settings: CreateSettings) {
    const url = `${privateAPI}/start?id=${sessionId}`;
    const result = await axios.post(url, settings);
    return result.data;
}

export async function getCreateSessionHeightmap(sessionId: number) {
    return await postGetFile(`api/v1/create/result?id=${sessionId}&type=heightmap`, {});
}

export async function getCreateSessionModel(sessionId: number) {
    return await postGetFile(`api/v1/create/result?id=${sessionId}&type=model`, {});
}