// @ts-ignore
import axios from "axios";

const domain = process.env.DOMAIN || "";

export interface Siegel {
    name: string;
    heightmap: string;
}

export async function getData() {
    const result = await axios.get(domain + "/data");
    return result.data.siegel as Siegel[];
}

export async function getDataFor(i: string) {
    const result = await axios.get(domain + "/data", {params: {i}});
    return result.data.siegel as Siegel;
}

export function getFileUrl(siegel: string) {
    return `${domain}/siegel?file=${siegel}`;
}

export function getSealBrowseCoordinatesUrl() {
  return domain + "/staticBrowse/browseSealCoordinates.csv";
}

export function getThumbnailUrl(id: Number, size: Number) {
  return domain + `/staticBrowse/thumbnails/thumb-${size}/record_kuniweb_${id}-img.jpg`;
}
