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

export default function DashboardStatistics() {
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

    const colors = {
        'Recebidos': '#00bcd4',
        'Aprovados': '#4caf50',
        'Resolvidos': '#ff9800',
    }
    const placeholderData = [
        {
            Mês: 'Janeiro',
            y: {
                Recebidos: 423,
                Aprovados: 543,
                Resolvidos: 654
            }
        },
        {
            Mês: 'Fevereiro',
            y: {
                Recebidos: 531,
                Aprovados: 24,
                Resolvidos: 123
            }
        },
        {
            Mês: 'Março',
            y: {
                Recebidos: 12,
                Aprovados: 321,
                Resolvidos: 45
            }
        },
    ]

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

    const [selected, setSelected] = useState("");

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

                    <div className={styles.section}>
                        <DashboardSectionTitle title='Usuários' />
                        <div className={styles.sectionHolder}>
                            <div className={styles.userFramesHolder}>
                                <StatFrame children={
                                    <>
                                        <span>Usuários cadastrados hoje</span>
                                        <h4>+27</h4>
                                    </>
                                } />
                                <StatFrame children={
                                    <>
                                        <span>Usuários cadastrados</span>
                                        <h4>2500 no total</h4>
                                    </>
                                } />
                            </div>
                            <div style={{ flex: 1, height: `100%` }}>

                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <DashboardSectionTitle title='Relatórios' />
                        <div className={`${styles.sectionHolder} ${styles.reportsSection}`}>
                            <div className={styles.sectionHolder}>
                                <StatFrame minWidth='24rem' children={
                                    <>
                                        <span>Relatórios cadastrados hoje</span>
                                        <h4>+35</h4>
                                    </>
                                } />
                                <StatFrame minWidth='22.5rem' backgroundGradient='linear-gradient(90deg, #AA2B2B 0%, #D17D1B 100%)' children={
                                    <>
                                        <h4>232 relatórios</h4>
                                        <span>requerem aprovação</span>
                                    </>
                                } />

                                <div className={styles.reportsWarning}>
                                    <h4>Cuidado!</h4>
                                    <p><span>Já são mais de 200 relatórios não aprovados.</span>
                                        <br /> Se esse número aumentar, um possível efeito bola de neve ocorrerá, dificultando a aprovação de relatórios mais recentes!</p>
                                </div>
                            </div>
                            <div className={styles.sectionHolder}>
                                <div className={`${styles.section} ${styles.legend}`}>
                                    <div onClick={() => setSelected("")} className={`${styles.sectionHolder} ${styles.legend}`}>
                                        <div className={styles.square} style={{ backgroundColor: colors.Recebidos }} />
                                        <span>Recebidos</span>
                                    </div>
                                    <div className={`${styles.sectionHolder} ${styles.legend}`}>
                                        <div className={styles.square} style={{ backgroundColor: colors.Aprovados }} />
                                        <span>Aprovados</span>
                                    </div>
                                    <div className={`${styles.sectionHolder} ${styles.legend}`}>
                                        <div className={styles.square} style={{ backgroundColor: colors.Resolvidos }} />
                                        <span>Resolvidos</span>
                                    </div>
                                </div>
                                <div style={{ height: "100%" }}>
                                    <VictoryChart
                                        containerComponent={<VictoryVoronoiContainer />}
                                        width={825}
                                        height={150}
                                        /* domainPadding={{ y: 5 }} */
                                        padding={{ top: 5, bottom: 25, left: 25, right: 25 }}
                                    >
                                        <VictoryScatter
                                            data={placeholderData}
                                            x="Mês"
                                            y={(datum: any) => datum.y.Recebidos}
                                            size={3}
                                            style={{ data: { fill: colors.Recebidos } }}
                                        />
                                        <VictoryScatter
                                            data={placeholderData}
                                            x="Mês"
                                            y={(datum: any) => datum.y.Aprovados}
                                            size={3}
                                            style={{ data: { fill: colors.Aprovados } }}
                                        />
                                        <VictoryScatter
                                            data={placeholderData}
                                            x="Mês"
                                            y={(datum: any) => datum.y.Resolvidos}
                                            size={3}
                                            style={{ data: { fill: colors.Resolvidos } }}
                                        />
                                        <VictoryArea
                                            data={placeholderData}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'Mês'}
                                            y={'y.Recebidos'}
                                            style={{ data: { fill: "url(#recebidos)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Recebidos: ${datum.y.Recebidos}`}
                                            labelComponent={
                                                tooltip
                                            }
                                            interpolation="cardinal"
                                        />
                                        <VictoryArea
                                            data={placeholderData}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'Mês'}
                                            y={'y.Aprovados'}
                                            style={{ data: { fill: "url(#aprovados)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Aprovados: ${datum.y.Aprovados}`}
                                            labelComponent={
                                                tooltip
                                            }
                                            interpolation="cardinal"
                                        />
                                        <VictoryArea
                                            data={placeholderData}
                                            animate={{ easing: "cubicInOut", duration: 4000 }}
                                            x={'Mês'}
                                            y={'y.Resolvidos'}
                                            style={{ data: { fill: "url(#resolvidos)", fillOpacity: 0.5 } }}
                                            labels={({ datum }) => `Resolvidos: ${datum.y.Resolvidos}`}
                                            labelComponent={
                                                tooltip
                                            }
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
                                    <p>Sossego... Neste mês, estamos com + de 500 focos de lixo resolvidos, em comparação a 12 não resolvidos!</p>
                                </div>
                            </div>
                            <svg style={{ height: 0 }}>
                                <defs>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="recebidos">
                                        <stop offset="0%" stopColor={colors.Recebidos} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.Recebidos} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="aprovados">
                                        <stop offset="0%" stopColor={colors.Aprovados} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.Aprovados} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="resolvidos">
                                        <stop offset="0%" stopColor={colors.Resolvidos} stopOpacity={0.65} />
                                        <stop offset="100%" stopColor={colors.Resolvidos} stopOpacity={0} />
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