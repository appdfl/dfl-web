import Head from 'next/head';
import Link from 'next/link';

import styles from "/src/styles/dashboard.module.css"
import Date from '../../components/date';

import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';

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
        <body>
            <Head>
                <title>Dashboard | Relatórios</title>
            </Head>

            <Sidebar />
            <div>

            </div>
        </body>
    );
}