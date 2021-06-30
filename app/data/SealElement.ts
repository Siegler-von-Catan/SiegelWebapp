import axios from "axios";
import {fabric} from "fabric";

const domain = process.env.DOMAIN || "";

export interface SealElement {
    id: number
    title: string
    heightmap: string
    preRendered: string
}

export interface FabricSealElement extends fabric.Image {
    sealElement: SealElement;
}

export async function loadElements(): Promise<SealElement[]> {
    const result = await axios.get(domain + "/staticMerge/components.json");
    const elements = result.data.components as SealElement[];
    elements.forEach(elem => {
        elem.heightmap = `${domain}/staticMerge/heightmaps/${elem.id}.png`;
        elem.preRendered = `${domain}/staticMerge/preRendered/${elem.id}.png`;
    });
    return elements;
}
