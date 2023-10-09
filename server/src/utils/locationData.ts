import axios from "axios"

import config from "@/config"

export const locationData = async (): Promise<string[]> => {
    // const repos = await axios.get(config.locationUrl, configx)
    // return repos.data.map((repo: any) => repo.name).filter((name: string) => name);
    return ["Tokyo", "Osaka", "Hokkaido"]
}