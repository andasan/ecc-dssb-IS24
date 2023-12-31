import axios from "axios"
import path from 'path'
import fs from 'fs'

import config from "../config";

async function seedLocation() {
    const repos = await axios.get(config.locationUrl)
    const locations = repos.data.map((repo: any) => repo.url).filter((url: string) => url);

    const locationData = `{ "locationData": ${JSON.stringify(locations)} }`
    fs.writeFile(path.join(process.cwd(), 'src/data/locationData.json'), locationData, (err) => {
        if (err) throw err;
        console.info('Location Data has been saved!');
    });
}

seedLocation();