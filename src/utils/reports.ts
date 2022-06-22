import useSWR from 'swr';

import { Report } from "../@types/application";
import { api } from "./api";

const fetcher = url => api.get(url).then(res => res.data)

export async function getReportsData(location?: string, searchCount?: number, includeInfo?: boolean) {
    try {
        const dataResponse = await api.get(`/report?${location ? `location=${location}` : ""}${searchCount ? location ? `&searchCount=${searchCount}` : `searchCount=${searchCount}` : ""}${location || searchCount ? `&includeInfo=${includeInfo}` : `includeInfo=${includeInfo}`}`)
        console.log("Relatórios obtidos com sucesso!", dataResponse.data)
        return dataResponse.data;
    } catch (error) {
        console.log(error)
        return []
    }
    /* const { data, error } = useSWR('/report', fetcher)
    return {
        reports: data,
        isLoading: !error && !data,
        isError: error
    } */
}

export function GetRatingsAverage(actualReport) {
    //console.log("Atualizando rating do relatório atual.")
    const note1Medium = actualReport.note1 / 5
    const note2Medium = actualReport.note2 / 5
    const note3Medium = actualReport.note3 / 5
    const note4Medium = actualReport.note4 / 5
    const note5Medium = actualReport.note5 / 5
    return (note1Medium + note2Medium + note3Medium + note4Medium + note5Medium) / 5
}