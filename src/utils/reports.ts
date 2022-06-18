import fs from 'fs'
import path from 'path'
import useSWR from 'swr';

import { Report } from "../@types/application";
import { api } from "./api";

const fetcher = url => api.get(url).then(res => res.data)

export async function getReportsData(location: string) {
    try {
        const { data, error } = useSWR(`/report?location=${location}`, fetcher)
        if (!data || error) {
            return []
        } else {
            return data as Array<Report>
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export function GetRatingsAverage(actualReport) {
    //console.log("Atualizando rating do relatório atual.")
    const ratings = [actualReport.note1, actualReport.note2, actualReport.note3, actualReport.note4, actualReport.note5]
    const sum = ratings.reduce((a, b) => a + b, 0)
    return sum / 5
}