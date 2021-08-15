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

import axios from "axios";

const domain = process.env.DOMAIN || "";

async function awaitOnload(reader: window.FileReader): Promise<string> {
    return new Promise((resolve) => {
        reader.onload = () => {
            resolve(reader.result);
        };
    });
}

export async function merge(data: object): Promise<string> {
    const response = await axios.post(domain + "/merge", data, {responseType: "blob"});
    const reader = new window.FileReader();
    reader.readAsDataURL(response.data);
    return await awaitOnload(reader);
}
