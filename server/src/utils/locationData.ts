import path from "path";
import fs from "fs/promises";

export const locationData = async (): Promise<string[]> => {
    const data = await fs.readFile(path.join(process.cwd(), "src/data/locationData.json"));
    return JSON.parse(data.toString()).locationData;
}