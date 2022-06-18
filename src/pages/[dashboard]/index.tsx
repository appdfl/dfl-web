import Head from 'next/head';
import Link from 'next/link';

import styles from "/src/styles/dashboard/dashboard.module.css";
import Date from '../../components/date';

import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardHeader from '../../components/Dashboard/Header';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <body className={`dashboard`}>
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