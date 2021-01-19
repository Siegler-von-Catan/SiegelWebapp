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
