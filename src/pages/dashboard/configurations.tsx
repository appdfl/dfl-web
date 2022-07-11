import Head from 'next/head';

import styles from "/src/styles/dashboard/dashboard.module.css";

import DashboardHeader from '../../components/Dashboard/Header';
import { useEffect, useState } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';

import menuStyles from "/src/components/Dashboard/Menu/sidebar.module.css";
import reportStyles from "/src/styles/dashboard/report.module.css";

import { motion, AnimatePresence } from "framer-motion";

import DashboardSectionTitle from '../../components/Dashboard/SectionTitle';
import Layout from '../../components/Dashboard/Layout';

import { useTheme } from 'next-themes';

export default function Configurations() {

    const { theme, setTheme } = useTheme()

    const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        console.log(theme)
    }

    const [mounted, setMounted] = useState(false)
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const opacityVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 0
        }
    };

    return (
        <>
            <Head>
                <title>Configurações</title>
            </Head>
            <AnimatePresence>
                <motion.div
                    style={{ height: "100vh", paddingBottom: "7rem" }}
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    variants={opacityVariants}
                    className={styles.content}
                >
                    <DashboardHeader title='Configurações' />
                    <div className={styles.contentFrame}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <DashboardSectionTitle title='Aparência' />
                            <div className={`${reportStyles.holder} ${reportStyles.align} ${reportStyles.option}`}>
                                <div style={{ flex: 0.6 }} className={reportStyles.optionText}>
                                    <h4><strong>Ativar tema escuro</strong> <br /></h4>
                                    <p>Este relatório será ocultado e arquivado automaticamente e o usuário que o postou sofrerá uma penalidade.</p>
                                </div>
                                <div style={{ display: "flex", width: "5rem" }}>
                                    <div className={"toggle_switch"}>
                                        <span onClick={switchTheme} className={`switch active`}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
    /* </div>
); */
}

Configurations.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}