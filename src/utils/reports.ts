import useSWR from 'swr';

import { Report } from "../@types/application";
import { api } from "./api";

const fetcher = url => api.get(url).then(res => res.data)

export async function getReportsData(location?: string, searchCount?: number, includeInfo?: boolean) {
    try {
        const dataResponse = await api.get(`/report?${location ? `location=${location}` : ""}${searchCount ? location ? `&searchCount=${searchCount}` : `searchCount=${searchCount}` : ""}${location || searchCount ? `&includeInfo=${includeInfo}` : `includeInfo=${includeInfo}`}`)
        console.log("Relatórios obtidos com sucesso!")
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
    const note1Medium = actualReport.note1 * 1
    const note2Medium = actualReport.note2 * 2
    const note3Medium = actualReport.note3 * 3
    const note4Medium = actualReport.note4 * 4
    const note5Medium = actualReport.note5 * 5

    const somaDasNotasComOsPesos = note1Medium + note2Medium + note3Medium + note4Medium + note5Medium
    const mediaPonderada = (somaDasNotasComOsPesos) / (actualReport.note1 + actualReport.note2 + actualReport.note3 + actualReport.note4 + actualReport.note5)
    const string = mediaPonderada.toString().split(".")
    if (string.length > 1) {
        return `${string[0]}.${string[1].substring(0, 2)}`
    } else {
        return `${mediaPonderada}.0`
    }
}