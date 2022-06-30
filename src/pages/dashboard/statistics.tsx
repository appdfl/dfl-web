import Head from 'next/head';
import { useEffect, useState } from 'react';

import styles from "/src/styles/dashboard/statistics.module.css";
import dashboardStyles from "/src/styles/dashboard/dashboard.module.css";

import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardSectionTitle from '../../components/Dashboard/SectionTitle';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

import { motion, AnimatePresence } from "framer-motion";
import StatFrame from '../../components/Dashboard/Statistics/StatFrame';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel, VictoryLegend, VictoryScatter, VictoryStack, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { useAuthContext } from '../../context/AuthContext';
import { getReportsData } from '../../utils/reports';
import { Profile, Report } from '../../@types/application';
import { getUsersData } from '../../utils/users';

export default function DashboardStatistics() {
    const { admin } = useAuthContext();

    const [stats, setStats] = useState({
        reports: {
            reports: [] as any,
            today: 0,
            needApproval: 0,
            total: 0,
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
                    today: parsedStatsFromSessionStorage.reports.today,
                    needApproval: parsedStatsFromSessionStorage.reports.needApproval,
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

    const reportsWarning = <div className={`${styles.reportsWarning} ${styles.warning}`}>
        <h4>Atenção!</h4>
        <p><span>Já são mais de 500 relatórios não aprovados!</span>
            <br /> Os relatórios não param de chegar e esse número está muito alto! Vai ser difícil abaixá-lo, mas eu confio em você {`:)`}</p>
    </div>

    const reportsAdvise = <div className={styles.reportsWarning}>
        <h4>Cuidado!</h4>
        <p><span>Já são mais de 200 relatórios não aprovados.</span>
            <br /> Se esse número aumentar, um possível efeito bola de neve ocorrerá, dificultando a aprovação de relatórios mais recentes!</p>
    </div>

    const reportsOk = <div className={`${styles.reportsWarning} ${styles.ok}`}>
        <h4>De boa...</h4>
        <p><span>São menos de 50 relatórios não aprovados.</span>
            <br /> Abaixar esse número é fácil, já que ele é bem pequeno, mas não permita que ele aumente! Pode complicar as coisas...</p>
    </div>

    const monthTotal = stats.reports.reports.filter(report => new Date(report.createdAt).getMonth() === new Date().getMonth()).length;
    const monthApproved = stats.reports.reports.filter(report => report.approved === true && new Date(report.createdAt).getMonth() === new Date().getMonth()).length

    const opacityVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 0
        }
    };

    const colors = {
        'recebidos': '#00bcd4',
        'aprovados': '#4caf50',
        'resolvidos': '#ff9800',
    }

    const recebidos = [
        {
            x: 'Janeiro',
            y: 423
        },
        {
            x: 'Fevereiro',
            y: 67
        },
        {
            x: 'Março',
            y: 224
        },
        {
            x: 'Abril',
            y: 23
        },
        /* {
            x: 'Maio',
            y: 125
        },
        {
            x: 'Junho',
            y: 325
        },
        {
            x: 'Julho',
            y: 43
        },
        {
            x: 'Agosto',
            y: 198
        },
        {
            x: 'Setembro',
            y: 54
        },
        {
            x: 'Outubro',
            y: 222
        },
        {
            x: 'Novembro',
            y: 856
        },
        {
            x: 'Dezembro',
            y: 123
        }, */
    ]

    const aprovados = [
        {
            x: 'Janeiro',
            y: 450
        },
        {
            x: 'Fevereiro',
            y: 240
        },
        {
            x: 'Março',
            y: 164
        },
        {
            x: 'Abril',
            y: 378
        },
    ]

    const resolvidos = [
        {
            x: 'Janeiro',
            y: 45
        },
        {
            x: 'Fevereiro',
            y: 24
        },
        {
            x: 'Março',
            y: 64
        },
        {
            x: 'Abril',
            y: 178
        },
    ]

    const [selected, setSelected] = useState("");

    const tooltip = <VictoryTooltip cornerRadius={5} flyoutPadding={{ top: 5, bottom: 5, left: 10, right: 10 }}/* flyoutWidth={100} */
        flyoutStyle={{
            backgroundColor: `var(--font-color)`,
        }}
        style={{
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: 600,
            fill: "var(--font-dark)",
        }}
    />

    function LegendButton({ legend }) {
        const text = legend.charAt(0).toUpperCase() + legend.slice(1);
        return <div onClick={() => selected === legend ? setSelected("") : setSelected(legend)} className={`${styles.sectionHolder} ${styles.legend}`}>
            <div className={styles.square} style={{ backgroundColor: colors[legend] }} />
            <span style={{ fontWeight: selected === legend ? 700 : 500 }}>{text}</span>
        </div>
    }

    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className={`dashboard`}>
            <Head>
                <title>Estatísticas</title>
            </Head>

            <Sidebar />

            <AnimatePresence>
                <motion.div
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    key={"statistics"}
                    variants={opacityVariants}
                    className={dashboardStyles.content}
                >
                    <DashboardHeader title='Estatísticas' />

                    {
                        admin.role === 'admin' &&
                        <div className={styles.section}>
                            <DashboardSectionTitle title='Usuários' />
                            <div className={styles.sectionHolder}>
                                <div className={styles.userFramesHolder}>
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
                                <div style={{ flex: 1 }}>
                                    <VictoryChart
                                        containerComponent={<VictoryVoronoiContainer />}
                                        width={775}
                                        height={200}
                                        /* domainPadding={{ y: 5 }} */
                                        domain={{ y: [0, 1000] }}
                                        padding={{ top: 5, bottom: 25, left: 50, right: 25 }}
                                    >
                                        <VictoryArea
                                            data={recebidos}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'x'}
                                            y={'y'}
                                            style={{ data: { fill: "url(#white)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => Math.floor(datum.y)}
                                            labelComponent={tooltip}
                                            interpolation="cardinal"
                                        />
                                        <VictoryAxis style={{
                                            axis: {
                                                stroke: "transparent"
                                            },
                                            tickLabels: {
                                                fill: `var(--font-color)`
                                            }
                                        }} /* label="Meses" */ />
                                        <VictoryAxis domain={[0, 1000]} style={{
                                            axis: {
                                                stroke: "transparent"
                                            },
                                            tickLabels: {
                                                fill: `var(--font-color)`
                                            }
                                        }} dependentAxis /* label="Usuários" */ />
                                    </VictoryChart>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.section}>
                        <DashboardSectionTitle title='Relatórios' />
                        <div className={`${styles.sectionHolder} ${styles.reportsSection}`}>
                            <div className={styles.sectionHolder}>
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
                                {stats.reports.needApproval > 50 ? stats.reports.needApproval > 200 ? reportsWarning : reportsAdvise : reportsOk}
                            </div>
                            <div className={styles.sectionHolder}>
                                <div className={`${styles.section} ${styles.legend}`}>
                                    <LegendButton legend="recebidos" />
                                    <LegendButton legend="aprovados" />
                                    <LegendButton legend="resolvidos" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <VictoryChart
                                        containerComponent={<VictoryVoronoiContainer />}
                                        width={825}
                                        height={135}
                                        /* domainPadding={{ y: 5 }} */
                                        padding={{ top: 5, bottom: 25, left: 25, right: 25 }}
                                    >
                                        <VictoryScatter
                                            data={recebidos}
                                            size={3}
                                            style={{ data: { fill: selected === "recebidos" || selected === "" ? colors.recebidos : "transparent" } }}
                                        />
                                        <VictoryScatter
                                            data={aprovados}
                                            size={3}
                                            style={{ data: { fill: selected === "aprovados" || selected === "" ? colors.aprovados : "transparent" } }}
                                        />
                                        <VictoryScatter
                                            data={resolvidos}
                                            size={3}
                                            style={{ data: { fill: selected === "resolvidos" || selected === "" ? colors.resolvidos : "transparent" } }}
                                        />
                                        <VictoryArea
                                            data={recebidos}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'x'}
                                            y={'y'}
                                            style={{ data: { fill: "url(#recebidos)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Recebidos: ${Math.floor(datum.y)}`}
                                            labelComponent={selected === "recebidos" || selected === "" ? tooltip : <div></div>}
                                            interpolation="cardinal"
                                        />
                                        <VictoryArea
                                            data={aprovados}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'x'}
                                            y={'y'}
                                            style={{ data: { fill: "url(#aprovados)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Aprovados: ${Math.floor(datum.y)}`}
                                            labelComponent={selected === "aprovados" || selected === "" ? tooltip : <div></div>}
                                            interpolation="cardinal"
                                        />
                                        <VictoryArea
                                            data={resolvidos}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'x'}
                                            y={'y'}
                                            style={{ data: { fill: "url(#resolvidos)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Resolvidos: ${Math.floor(datum.y)}`}
                                            labelComponent={selected === "resolvidos" || selected === "" ? tooltip : <div></div>}
                                            interpolation="cardinal"
                                        />
                                        <VictoryAxis
                                            style={{
                                                axis: {
                                                    stroke: "transparent"
                                                },
                                                tickLabels: {
                                                    fill: `var(--font-color)`
                                                }
                                            }}
                                        />
                                    </VictoryChart>
                                </div>
                            </div>
                            <div className={styles.sectionHolder}>
                                <div className={`${styles.reportsWarning} ${styles.reportsWarning2}`}>
                                    <CheckCircleOutlined />
                                    {
                                        monthApproved > (monthTotal - monthApproved) ?
                                            <p>Sossego... Neste mês, estamos com + de {monthApproved} focos de lixo resolvidos, em comparação a {monthTotal - monthApproved} não resolvidos!</p>
                                            : <p>Cuidado! Neste mês, estamos com mais de {monthTotal - monthApproved} focos de lixo não resolvidos, em comparação a {monthApproved} resolvidos!</p>
                                    }
                                </div>
                            </div>
                            <svg style={{ height: 0 }}>
                                <defs>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="white">
                                        <stop offset="0%" stopColor={"var(--font-color)"} stopOpacity={0.75} />
                                        <stop offset="100%" stopColor={"var(--font-color)"} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="recebidos">
                                        <stop offset="0%" stopColor={colors.recebidos} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.recebidos} stopOpacity={selected === "recebidos" ? 1 : 0} />
                                    </linearGradient>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="aprovados">
                                        <stop offset="0%" stopColor={colors.aprovados} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.aprovados} stopOpacity={selected === "aprovados" ? 1 : 0} />
                                    </linearGradient>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="resolvidos">
                                        <stop offset="0%" stopColor={colors.resolvidos} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.resolvidos} stopOpacity={selected === "resolvidos" ? 1 : 0} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    );
}