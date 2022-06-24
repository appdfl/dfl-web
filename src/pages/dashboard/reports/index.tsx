import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"

import Sidebar from '../../../components/Dashboard/Sidebar';
import DashboardHeader from '../../../components/Dashboard/Header';
import ReportsList from '../../../components/Dashboard/ReportsList';
import { getReportsData } from '../../../utils/reports';

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';

export default function Reports() {
    const router = useRouter();
    const updateReports = router.query.updateReports;
    const [reports, setReports] = useState([])

    useEffect(() => {
        async function getReports() {
            const reportsData = await getReportsData(null, null, true)
            if (reportsData) {
                setReports(reportsData)
                sessionStorage.setItem('reports', JSON.stringify(reportsData))
            } else {
                setReports(["error"])
            }
        }

        const reportsFromSessionStorage = sessionStorage.getItem('reports')
        if (reportsFromSessionStorage && !updateReports) {
            setReports(JSON.parse(reportsFromSessionStorage))
        } else {
            getReports()

        }
    }, [])

    const opacityVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 0
        }
    };

    return (
        <div suppressHydrationWarning className={`dashboard`}>
            <Head>
                <title>Relatórios</title>
            </Head>

            <Sidebar />
            <AnimatePresence>
                <motion.div
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    key={"reports"}
                    variants={opacityVariants}
                    className={dashboardStyles.content}
                >
                    <DashboardHeader title='Relatórios' />
                    <div style={{ width: "100%" }}>
                        <ReportsList reports={reports} />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}