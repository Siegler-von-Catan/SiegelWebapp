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

import Api, {Endpoint} from "./api";

const publicAPI = "userupload/public";
const privateAPI = "create";

export interface CreateSettings {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
    isInversed: boolean;
    isLowQuality: boolean;
}

export async function getCreateModel(uploadId: number) {
    return await Api.getFile("result", {
        params: {id: uploadId, type: "model"},
        endpoint: Endpoint.micro,
        prefix: publicAPI});
}

export async function getCreateHeightmap(uploadId: number) {
    return await Api.getFile("result", {
        params: {id: uploadId, type: "heightmap"},
        endpoint: Endpoint.micro,
        prefix: publicAPI});
}

/**
 * Returns a session id which is used throughout a user FabSeal Create session to access
 * the private API
 */
export async function startCreateSession() {
    const result = await Api.post("new", {
        endpoint: Endpoint.micro,
        prefix: privateAPI});
    return result.id as number;
}

/**
 * Returns an upload id which is used to retrieve the data resulting from a FabSeal Create session
 * from the public API
 * @param sessionId
 */
export async function finishCreateSession(sessionId: number) {
    const result = await Api.post("finish", {
        params: {id: sessionId},
        endpoint: Endpoint.micro,
        prefix: privateAPI});
    return result.id as number;
}

export async function uploadCreatedImage(sessionId: number, formData: FormData) {
    return await Api.post("upload", {
        data: formData,
        params: {id: sessionId},
        endpoint: Endpoint.micro,
        prefix: privateAPI});
}

export async function startProcessing(sessionId: number, settings: CreateSettings) {
    return await Api.post("start", {
        data: settings,
        params: {id: sessionId},
        endpoint: Endpoint.micro,
        prefix: privateAPI});
}

export async function getCreateSessionHeightmap(sessionId: number) {
    return await Api.getFile("result", {
        params: {id: sessionId, type: "heightmap"},
        endpoint: Endpoint.micro,
        prefix: privateAPI});
}

export async function getCreateSessionModel(sessionId: number) {
    return await Api.getFile("result", {
        params: {id: sessionId, type: "model"},
        endpoint: Endpoint.micro,
        prefix: privateAPI});
}
