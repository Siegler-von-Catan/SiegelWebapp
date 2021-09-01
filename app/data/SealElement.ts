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

