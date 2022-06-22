import { firstBy } from "thenby";

export default function sortReports(reports, dateFilter, ratingFilter, hasTrashBinFilter, resolvedFilter, approvedFilter) {
    reports.sort(
        firstBy("date", dateFilter === 0 ? -1 : 0)
            .thenBy("ratingFilter", ratingFilter === 0 ? -1 : 0)
            .thenBy("hasTrashBins", hasTrashBinFilter === 0 ? -1 : 0)
            .thenBy("resolvedFilter", resolvedFilter === 0 ? -1 : 0)
            .thenBy("approvedFilter", approvedFilter === 0 ? -1 : 0)
    )
}