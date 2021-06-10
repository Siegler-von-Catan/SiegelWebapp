import axios from "axios";

const domain = process.env.DOMAIN || "";

export interface SealElement {
    id: number
    title: string
    heightmap: string
    preRendered: string
}

export async function loadElements(): Promise<SealElement[]> {
    const result = await axios.get(domain + "/staticMerge/components.json");
    const elements = result.data.components as SealElement[];
    elements.forEach(elem => {
        elem.heightmap = domain + "/staticMerge/heightmaps/" + elem.heightmap;
        elem.preRendered = domain + "/staticMerge/preRendered/" + elem.preRendered;
    });
    return elements;
}
