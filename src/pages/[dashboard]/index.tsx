import Head from 'next/head';
import Link from 'next/link';

import styles from "/src/styles/dashboard.module.css"
import Date from '../../components/date';

import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import DashboardHeader from '../../components/Dashboard/Header/Header';

/* import { getSortedPostsData } from '../../utils/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
} */

export default function Dashboard() {
    return (
        <body className={styles.body}>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Sidebar />

            <div className={styles.content}>
                <DashboardHeader title='Dashboard' />
            </div>
        </body>
    );
}