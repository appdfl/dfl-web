import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"

import Sidebar from '../../../components/Dashboard/Menu';
import DashboardHeader from '../../../components/Dashboard/Header';
import ReportsList from '../../../components/Dashboard/ReportsList';
import { getReportsData } from '../../../utils/reports';

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Layout from '../../../components/Dashboard/Layout';
import { useScreenSize } from '../../../utils/hooks/useScreenSize';

export default function Reports() {
    const router = useRouter();
    const { updateReports, successDeleting } = router.query;
    const [reports, setReports] = useState([])

    useEffect(() => {
        async function getReports() {
            const reportsData = await getReportsData(null, null, true)
            if (reportsData) {
                console.log("Conseguimos os reports")
                setReports(reportsData)
                sessionStorage.setItem('reports', JSON.stringify(reportsData))
            } else {
                console.log("Error getting reports")
                setReports(["error"])
            }
        }

        const reportsFromSessionStorage = sessionStorage.getItem('reports')
        const parsedReportsFromSessionStorage = JSON.parse(reportsFromSessionStorage)
        if (parsedReportsFromSessionStorage && parsedReportsFromSessionStorage.length > 0 && !updateReports && !successDeleting) {
            console.log("Já há relatórios salvos no armazenamento do navegador.")
            setReports(JSON.parse(reportsFromSessionStorage))
        } else {
            console.log("Obtendo relatórios no servidor.")
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

    const { isScreenWide } = useScreenSize();

    return <>
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
                    <ReportsList simpleLayout={!isScreenWide ? "mobile" : null} reports={reports} />
                </div>
            </motion.div>
        </AnimatePresence>
    </>
}

Reports.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}