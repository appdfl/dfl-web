import styles from './modal.module.css';
import React, { SetStateAction } from 'react';

import { motion } from "framer-motion"

import CloseIcon from '@mui/icons-material/Close';
import ReturnIcon from '@mui/icons-material/ArrowBack';

import DashboardButton from '../Button';

type Props = {
    isVisible: boolean;
    setIsVisible: (state: boolean) => SetStateAction<void>;
    actionFunction?: () => void;
    color: string;
    Icon: any;
    title: string;
    description: React.ReactNode;
    buttonText?: string;
    isLoading?: boolean;
    suppressReturnButton?: boolean;
    zIndex?: number;
}

import { AnimatePresence } from "framer-motion";

export default function DashboardModal({ isVisible, setIsVisible, actionFunction, color, isLoading, Icon, title, description, buttonText, suppressReturnButton, zIndex }: Props) {
    const backdropVariants = {
        open: {
            opacity: 1,
            transition: { ease: "easeOut", duration: 0.25 }
        },
        closed: {
            opacity: 0,
            transition: { ease: "easeOut", duration: 0.25 }
        }
    };

    return (
        <AnimatePresence exitBeforeEnter>
            {
                isVisible && (
                    <motion.div
                        className={styles.background}
                        key="modal"
                        initial={"closed"}
                        animate={isVisible ? "open" : "closed"}
                        exit={"closed"}
                        variants={backdropVariants}
                        style={{ zIndex: zIndex }}
                    >
                        <div className={styles.container}>
                            <div style={{ backgroundColor: color }} className={styles.iconHolder}>
                                <Icon style={{ fontSize: "4.8rem", color: "var(--background-02)" }} />
                            </div>

                            <h2>{title}</h2>
                            {description}

                            <div className={styles.buttonsHolder}>
                                {
                                    !suppressReturnButton &&
                                    <DashboardButton onClick={() => setIsVisible(!isVisible)} title={actionFunction ? `CANCELAR` : "RETORNAR"} Icon={actionFunction ? CloseIcon : ReturnIcon} color={`var(--font-color)`} padding={`0.7rem 1.5rem`} />

                                }
                                {
                                    actionFunction &&
                                    <DashboardButton isLoading={isLoading} onClick={actionFunction} title={buttonText} Icon={Icon} iconSize={`medium`} color={color} padding={`0.7rem 1.5rem`} />
                                }
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}