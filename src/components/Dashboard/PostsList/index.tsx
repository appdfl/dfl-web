import styles from './posts-list.module.css';
import dashboardStyles from '/src/styles/dashboard/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { GetRatingsAverage } from '../../../utils/reports';

type Props = {
    posts: Array<Object>;
}

export default function ReportsList({ posts }: Props) {

    console.log(posts)

    const reportsItems = posts.map((post) => {
        const date = new Date(posts.createdAt)
        const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
        const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()
        return (
            <Link href={{ pathname: "/dashboard/blog/post", query: { post: JSON.stringify(post) } }} as="/dashboard/blog/post">
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

    return (
        <div className={styles.holder}>
            <header className={styles.header}>
                <ul>
                    <li className={styles.address}>
                        Título
                    </li>
                    <li className={styles.user}>
                        Redator
                    </li>
                    <li className={styles.date}>
                        Ações
                    </li>
                    <li className={styles.rating}>
                        Data
                    </li>
                    <li className={styles.hasTrashBins}>
                        Visualizações
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