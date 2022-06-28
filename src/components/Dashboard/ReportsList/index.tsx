import styles from './reports-list.module.css';
import dashboardStyles from '/src/styles/dashboard/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { GetRatingsAverage } from '../../../utils/reports';
import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    reports: Array<Report> | Array<string>;
}

import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';

/* const reports = [
        {
            profile: {
                id: 1,
                username: "theduardomaciel",
                image_url: "https://github.com/theduardomaciel.png",
                level: 1,
                experience: 200,
                reports: [],
                ratings: [],
            },
            id: 1,
            createdAt: "Thu Jun 09 2022 22:40:45 GMT+0000",
            address: "Loteamento Luz do Vale, Feirinha do Tabuleiro, 57081-005, Maceió, AL",
            coordinates: [-54.52256, 24.54711],
            images_urls: ["https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg", "https://www.bio.fiocruz.br/images/aumento-lixo-eletronico.jpg", "https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg"],
            suggestion: "Deveriam fazer umas coisas assim, é isso ae",
            hasTrashBins: true,
            profile_id: 1,
            note1: 23,
            approved: true,
            note2: 12,
            note3: 54,
            note4: 2,
            note5: 21,
            resolved: false,
            comments: []
        },
        {
            profile: {
                id: 2,
                username: "andrezingameplays",
                image_url: "https://github.com/extreme.png",
                level: 1,
                experience: 200,
                reports: [],
                ratings: [],
            },
            id: 2,
            createdAt: "Fri Jul 09 2022 22:40:45 GMT+0000",
            address: "Rua Sargento Silício, Pedra Molhada, Roraima",
            coordinates: [-25.52256, 200.54711],
            images_urls: ["https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg", "https://www.bio.fiocruz.br/images/aumento-lixo-eletronico.jpg", "https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg"],
            suggestion: "",
            hasTrashBins: false,
            profile_id: 2,
            note1: 12,
            approved: true,
            note2: 5,
            note3: 23,
            note4: 65,
            note5: 12,
            resolved: true,
            comments: []
        }
    ] */
/* as={`/dashboard/reports/report_${report.id}`} */

export default function ReportsList({ reports }: Props) {
    function renderItems() {
        const items = reports.map((report) => {
            const date = new Date(report.createdAt)
            const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
            const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()
            return (
                <Link href={{ pathname: "/dashboard/reports/report", query: { report: JSON.stringify(report) } }} as={`/dashboard/reports/report/`}>
                    <li className={styles.reportContainer} key={report.id}>
                        <div className={styles.reportItem}>
                            <h3 className={styles.address}>{report.address}</h3>

                            <div className={styles.user}>
                                <img className={dashboardStyles.profileImage} src={report.profile.image_url} alt="Imagem de perfil do usuário que publicou o relatório" />
                                <p className={styles.username}>{report.profile.username}</p>
                            </div>
                            <p className={styles.date}>{`${day}/${month}/${date.getUTCFullYear()}`}</p>
                            <p className={styles.rating}>{GetRatingsAverage(report)}</p>
                            {
                                <input type="checkbox" className={styles.hasTrashBins} name="hasTrashBins" readOnly checked={report.hasTrashBins} />
                            }
                            {
                                <input type="checkbox" className={styles.resolved} name="resolved" readOnly checked={report.resolved} />
                            }
                            {
                                <input type="checkbox" className={styles.approved} name="approved" readOnly checked={report.approved} />
                            }
                        </div>
                    </li>
                </Link>
            )
        });
        return items;
    }

    let reportsItems = renderItems()

    // descending = 0
    // ascending = 1

    const [dateFilter, setDateFilter] = useState(0) // (topo = mais recentes = maior data)
    const [ratingFilter, setRatingFilter] = useState(0) // (topo = maior nota)
    const [hasTrashBinFilter, setHasTrashBinFilter] = useState(1) // (topo = sem lata de lixo)
    const [resolvedFilter, setResolvedFilter] = useState(1) // (topo = não resolvidos)
    const [approvedFilter, setApprovedFilter] = useState(1) // (topo = não aprovados)

    function sortReports() {
        reports.sort(function (a, b) {
            const dateFromA = Date.parse(a.createdAt)
            const dateFromB = Date.parse(b.createdAt)

            const ratingFromA = parseFloat(GetRatingsAverage(a));
            const ratingFromB = parseFloat(GetRatingsAverage(b));

            return (dateFilter === 1 ? dateFromB - dateFromA : dateFromA - dateFromB) ||
                (ratingFilter === 1 ? ratingFromB - ratingFromA : ratingFromA - ratingFromB) ||
                (hasTrashBinFilter === 0 ? Number(a.hasTrashBins) - Number(b.hasTrashBins) : Number(b.hasTrashBins) - Number(a.hasTrashBins)) ||
                (resolvedFilter === 0 ? Number(a.resolved) - Number(b.resolved) : Number(b.resolved) - Number(a.resolved)) ||
                (approvedFilter === 0 ? Number(a.approved) - Number(b.approved) : Number(b.approved) - Number(a.approved))
        })
    }

    const switchDateFilter = () => {
        setDateFilter(dateFilter < 1 ? dateFilter + 1 : 0)
        sortReports()
        console.log("Atualizando filtro de data.", dateFilter)
    }

    const switchRatingFilter = () => {
        setRatingFilter(ratingFilter < 1 ? ratingFilter + 1 : 0)
        sortReports()
        console.log("Atualizando filtro de avaliação.", ratingFilter)
    }

    const switchTrashBinFilter = () => {
        setHasTrashBinFilter(hasTrashBinFilter < 1 ? hasTrashBinFilter + 1 : 0)
        sortReports()
        console.log("Atualizando filtro de lata de lixo.", hasTrashBinFilter)
    }

    const switchResolvedFilter = () => {
        setResolvedFilter(resolvedFilter < 1 ? resolvedFilter + 1 : 0)
        sortReports()
        console.log("Atualizando filtro de resolução.", resolvedFilter)
    }

    const switchApprovedFilter = () => {
        setApprovedFilter(approvedFilter < 1 ? approvedFilter + 1 : 0)
        sortReports()
        console.log("Atualizando filtro de aprovação.", approvedFilter)
    }

    useEffect(() => {
        sortReports()
    }, [reports])

    return (
        reports.length === 0 ?
            <Skeleton baseColor={`var(--background-02)`} highlightColor={`var(--border)`} borderRadius={`1.5rem`} height={`15rem`} />
            : reports[0] === "error" ?
                <p>error</p> :
                <div className={styles.holder}>
                    <header className={styles.header}>
                        <ul>
                            <li className={styles.address}>
                                Endereço
                            </li>
                            <li className={styles.user}>
                                Usuário
                            </li>
                            <li onClick={switchDateFilter} className={styles.date}>
                                Data
                                {/* {
                            dateFilter === 0 ?
                                <ArrowUpIcon className={dashboardStyles.arrowIcon} />
                                : <ArrowDownIcon className={dashboardStyles.arrowIcon} />
                        } */}
                            </li>
                            <li onClick={switchRatingFilter} className={styles.rating}>
                                Avaliação
                                {/* {
                            ratingFilter === 0 ?
                                <ArrowUpIcon className={dashboardStyles.arrowIcon} />
                                : <ArrowDownIcon className={dashboardStyles.arrowIcon} />
                        } */}
                            </li>
                            <li onClick={switchTrashBinFilter} className={styles.hasTrashBins}>
                                Possui lixeiras
                                {/* {
                            hasTrashBinFilter === 0 ?
                                <ArrowUpIcon className={dashboardStyles.arrowIcon} />
                                : <ArrowDownIcon className={dashboardStyles.arrowIcon} />
                        } */}
                            </li>
                            <li onClick={switchResolvedFilter} className={styles.resolved}>
                                Resolvido
                                {/* {
                            resolvedFilter === 0 ?
                                <ArrowUpIcon className={dashboardStyles.arrowIcon} />
                                : <ArrowDownIcon className={dashboardStyles.arrowIcon} />
                        } */}
                            </li>
                            <li onClick={switchApprovedFilter} className={styles.approved}>
                                Aprovado
                                {/* {
                            approvedFilter === 0 ?
                                <ArrowUpIcon className={dashboardStyles.arrowIcon} />
                                : <ArrowDownIcon className={dashboardStyles.arrowIcon} />
                        } */}
                            </li>
                        </ul>
                    </header>
                    <div className={styles.list}>
                        <ul>
                            {reportsItems}
                        </ul>
                    </div>
                </div>
    );
}