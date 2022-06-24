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
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    variants={opacityVariants}
                    className={styles.content}
                >
                    <DashboardHeader title='Dashboard' />
                    {/* <DashboardButton title='ABRIR MODAL' onClick={() => {
                        console.log("Exibindo modal")
                        setDeleteModalVisible(!isDeleteModalVisible)
                    }} /> */}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}