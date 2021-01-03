// @ts-ignore
import axios from "axios";

export interface Siegel {
    name: string;
    heightmap: string;
}

export async function getData() {
    const result = await axios.get("data");
    return result.data.siegel as Siegel[];
}

export async function getDataFor(i: string) {
    const result = await axios.get("data", {params: {i}});
    return result.data.siegel as Siegel;
}

export function getFileUrl(siegel: string) {
    return `/siegel?file=${siegel}`
}
