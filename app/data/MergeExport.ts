import axios from "axios";

const domain = process.env.DOMAIN || "";

export async function merge(data: object) {
    const response = await axios.post(domain + "/merge", data);
}
