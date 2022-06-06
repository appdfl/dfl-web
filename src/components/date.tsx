import { parseISO, format } from 'date-fns'
const brazilianLocale = require("date-fns/locale/pt-BR")

export default function Date({ dateString }: { dateString: string }) {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy', { locale: brazilianLocale })}</time>
}