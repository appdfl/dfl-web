import Head from 'next/head';
import Link from 'next/link';

import styles from "/src/styles/dashboard/dashboard.module.css";

import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardHeader from '../../components/Dashboard/Header';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import DashboardModal from '../../components/Dashboard/Modal';

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DashboardButton from '../../components/Dashboard/Button';

import { motion, AnimatePresence } from "framer-motion";
import DashboardSectionTitle from '../../components/Dashboard/SectionTitle';
import ReportsList from '../../components/Dashboard/ReportsList';
import Map from '../../components/Dashboard/Map';
import StatFrame from '../../components/Dashboard/Statistics/StatFrame';
import { getReportsData } from '../../utils/reports';
import { Profile, Report } from '../../@types/application';
import { getUsersData } from '../../utils/users';

export default function Dashboard() {

    const [stats, setStats] = useState({
        reports: {
            reports: [] as any,
            today: 0,
            needApproval: 0,
            total: 0
        },
        users: {
            today: 0,
            total: 0
        }
    })

    useEffect(() => {
        async function getStats() {
            const reports = await getReportsData() as Array<Report>;
            const users = await getUsersData() as Array<Profile>;

            if (reports && users) {
                const newStats = {
                    reports: {
                        reports: reports,
                        today: reports.filter(report => new Date(report.createdAt).getDate() === new Date().getDate()).length,
                        needApproval: reports.filter(report => report.approved === false).length,
                        total: reports.length
                    },
                    users: {
                        today: 0/* users.filter(user => user.createdAt.getDate() === new Date().getDate()).length */,
                        total: users.length,
                    }
                }
                setStats(newStats)
                sessionStorage.setItem('stats', JSON.stringify(newStats))
            } else {
                console.log("Não foi possível obter os relatórios e perfis de usuários.")
            }
        }
        const statsFromSessionStorage = sessionStorage.getItem('stats')
        const parsedStatsFromSessionStorage = JSON.parse(statsFromSessionStorage)
        if (parsedStatsFromSessionStorage && parsedStatsFromSessionStorage.length > 0) {
            console.log("Já há relatórios salvos no armazenamento do navegador.")
            setStats({
                reports: {
                    reports: parsedStatsFromSessionStorage.reports.reports,
                    needApproval: parsedStatsFromSessionStorage.reports.needApproval,
                    today: parsedStatsFromSessionStorage.reports.today,
                    total: parsedStatsFromSessionStorage.reports.total,
                },
                users: {
                    today: parsedStatsFromSessionStorage.users.today,
                    total: parsedStatsFromSessionStorage.users.total,
                }
            })
        } else {
            console.log("Obtendo relatórios no servidor.")
            getStats()
        }
    }, [])

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
        <div className={`dashboard`}>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Sidebar />

            <AnimatePresence>
                <motion.div
                    style={{ height: "100vh", paddingBottom: "7rem" }}
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    variants={opacityVariants}
                    className={styles.content}
                >
                    <DashboardHeader title='Dashboard' />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                        <div className={styles.wrapper2}>
                            <DashboardSectionTitle title='Relatórios' />
                            <div className={styles.holder}>
                                <div style={{ flex: 0.5 }}>
                                    <Map latitude={-14.235004} longitude={-51.92528} />
                                </div>
                                <div style={{ flex: 0.5, height: "100%" }}>
                                    <ReportsList reports={stats.reports.reports} simpleLayout />
                                </div>
                            </div>
                        </div>
                        <div className={styles.wrapper2}>
                            <DashboardSectionTitle title='Estatísticas' />
                            <div className={styles.holder}>
                                <div className={styles.wrapper} style={{ flex: 0.5 }}>
                                    <h3>Usuários</h3>
                                    <div className={styles.holder}>
                                        <StatFrame children={
                                            <>
                                                <span>Usuários cadastrados hoje</span>
                                                <h4>{`+${stats.users.today}`}</h4>
                                            </>
                                        } />
                                        <StatFrame children={
                                            <>
                                                <span>Usuários cadastrados</span>
                                                <h4>{`${stats.users.total} no total`}</h4>
                                            </>
                                        } />
                                    </div>
                                </div>
                                <div className={styles.wrapper} style={{ flex: 0.5 }}>
                                    <h3>Relatórios</h3>
                                    <div className={styles.holder}>
                                        <StatFrame minWidth='24rem' children={
                                            <>
                                                <span>Relatórios cadastrados hoje</span>
                                                <h4>{`+${stats.reports.today}`}</h4>
                                            </>
                                        } />
                                        <StatFrame minWidth='22.5rem' backgroundGradient='var(--attention-gradient)' children={
                                            <>
                                                <h4>{`${stats.reports.needApproval} relatórios`}</h4>
                                                <span>requerem aprovação</span>
                                            </>
                                        } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}