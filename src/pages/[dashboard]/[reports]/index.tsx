import Head from 'next/head';
import Link from 'next/link';

import dashboardStyles from "/src/styles/dashboard.module.css"
import Date from '../../../components/date';

import Sidebar from '../../../components/Dashboard/Sidebar/Sidebar';
import DashboardHeader from '../../../components/Dashboard/Header/Header';
import ReportsList from '../../../components/Dashboard/ReportsList';

/* import { getSortedPostsData } from '../../utils/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
} */

export default function Reports() {
    return (
        <body className={`dashboard`}>
            <Head>
                <title>Relatórios</title>
            </Head>

            <Sidebar />
            <div className={dashboardStyles.content}>
                <DashboardHeader title='Relatórios' />
                <ReportsList />
            </div>
        </body>
    );
}