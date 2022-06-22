import styles from './modal.module.css';
import React, { SetStateAction } from 'react';

import { motion } from "framer-motion"

import CloseIcon from '@mui/icons-material/Close';
import DashboardButton from '../Button';

type Props = {
    isVisible: boolean;
    setIsVisible: () => SetStateAction<void>;
    actionFunction?: () => void;
    color: string;
    Icon: any;
    title: string;
    description: React.ReactNode;
    buttonText?: string;
}

import { AnimatePresence } from "framer-motion";

export default function DashboardModal({ isVisible, setIsVisible, actionFunction, color, Icon, title, description, buttonText }: Props) {
    const backdropVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 0
        }
    };

    return (
        isVisible &&
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className={styles.background}
                key="modal"
                initial={"closed"}
                animate={isVisible ? "open" : "closed"}
                exit={"closed"}
                variants={backdropVariants}
            >
                <div className={styles.container}>
                    <div style={{ backgroundColor: color }} className={styles.iconHolder}>
                        <Icon style={{ fontSize: "4.8rem", color: "var(--background-02)" }} />
                    </div>

                    <h2>{title}</h2>
                    {description}

                    <div className={styles.buttonsHolder}>
                        <DashboardButton onClick={setIsVisible} title={`CANCELAR`} Icon={CloseIcon} color={`var(--font-color)`} padding={`0.7rem 1.5rem`} />
                        <DashboardButton title={buttonText} Icon={Icon} color={color} padding={`0.7rem 1.5rem`} />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}