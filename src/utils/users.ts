import { Report } from "../@types/application";
import { api } from "./api";

export async function getUsersData(location?: string) {
    try {
        const reportsResponse = await api.post("/users/search", {
            location: location && location,
        })
        return reportsResponse.data as Array<Report>;
    } catch (error) {
        console.log(error)
        return []
    }
}