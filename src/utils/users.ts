import { Report } from "../@types/application";
import { api } from "./api";

export async function getUsersData(location?: string) {
    try {
        const usersResponse = await api.get(`/profile${location ? `?location=${location}` : ""}`)
        return usersResponse.data as Array<Report>;
    } catch (error) {
        console.log(error)
        return []
    }
}