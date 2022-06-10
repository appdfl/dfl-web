import fs from 'fs'
import path from 'path'

import { Report } from "../@types/application";
import { api } from "./api";

export async function getReportsData(location: string) {
    try {
        const reportsResponse = await api.post("/reports/search", {
            location: location,
            includeInfo: false
        })
        console.log(reportsResponse)
        if (!reportsResponse) return [];
        return reportsResponse.data as Array<Report>;
    } catch (error) {
        console.log(error)
        return []
    }
}