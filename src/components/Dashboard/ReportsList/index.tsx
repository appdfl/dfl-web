import styles from './reports-list.module.css';
import dashboardStyles from '/src/styles/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';

/* type Props = {
    title: string;
} */

export function GetRatingsAverage(actualReport) {
    //console.log("Atualizando rating do relatório atual.")
    const ratings = [actualReport.note1, actualReport.note2, actualReport.note3, actualReport.note4, actualReport.note5]
    const sum = ratings.reduce((a, b) => a + b, 0)
    return sum / 5
}

export default function ReportsList(/* { title }: Props */) {

    const reports = [
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
        }
    ]
    /* as={`/dashboard/reports/report_${report.id}`} */
    const reportsItems = reports.map((report) => {
        const date = new Date(report.createdAt)
        const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
        const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()
        return (
            <Link href={{ pathname: "/dashboard/reports/report", query: { report: JSON.stringify(report) } }} as="/dashboard/reports/report">
                <li className={styles.reportItem}>
                    <h3 className={styles.address}>{report.address}</h3>

                    <div className={styles.user}>
                        <img className={dashboardStyles.profileImage} src={report.profile.image_url} alt="Imagem de perfil do usuário que publicou o relatório" />
                        <p >{report.profile.username}</p>
                    </div>
                    <p className={styles.date}>{`${day}/${month}/${date.getUTCFullYear()}`}</p>
                    <p className={styles.rating}>{GetRatingsAverage(report)}</p>
                    {
                        report.hasTrashBins ?
                            <input className={styles.hasTrashBins} type="checkbox" readOnly checked />
                            :
                            <input className={styles.hasTrashBins} type="checkbox" readOnly />
                    }
                    {
                        report.resolved ?
                            <input className={styles.resolved} type="checkbox" readOnly checked />
                            :
                            <input className={styles.resolved} type="checkbox" readOnly />
                    }
                </li>
            </Link>
        )
    });

    return (
        <div className={styles.holder}>
            <header className={styles.header}>
                <ul>
                    <li className={styles.address}>
                        Endereço
                    </li>
                    <li className={styles.user}>
                        Usuário
                    </li>
                    <li className={styles.date}>
                        Data
                    </li>
                    <li className={styles.rating}>
                        Avaliação
                    </li>
                    <li className={styles.hasTrashBins}>
                        Possui lixeiras
                    </li>
                    <li className={styles.resolved}>
                        Resolvido
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