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

export async function getFile(siegel: string) {
    const res = await axios.get("siegel", {
        params: {file: siegel},
        responseType: "arraybuffer"
    });
    return Buffer.from(res.data, "binary").toString("base64");
}
