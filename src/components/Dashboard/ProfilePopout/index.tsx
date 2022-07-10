import styles from './popout.module.css';

import ConfigIcon from "/public/icons/config_icon.svg";
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

import { useRouter } from 'next/router';
import { useAuthContext } from '../../../context/AuthContext';

import { SetStateAction, useEffect, useRef } from 'react';
import Link from 'next/link';
import NavLink from '../NavLink';

type Props = {
    isOpen: boolean;
    toggleOpen: () => SetStateAction<void>;
}

import { motion, AnimatePresence } from "framer-motion";

export default function DashboardProfilePopout({ isOpen, toggleOpen }: Props) {
    const router = useRouter()
    const { admin, logoutAdmin } = useAuthContext();

    if (!admin) return <div></div>

    const popout = useRef(null)

    const onClick = (event) => {
        const profileButton = document.querySelector("#profile")
        if (isOpen === true && popout.current && popout.current?.contains(event.target) === false && profileButton.contains(event.target) === false) {
            toggleOpen()
            window.removeEventListener('click', onClick);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('click', onClick);
            return () => window.removeEventListener('click', onClick);
        }, 500);
    }, [isOpen]);

    const formattedRole = admin.role === "admin" ? "Admin"
        : admin.role === "moderator" ? "Moderad."
            : admin.role === "redactor" ? "Redator" : "Coletor"

    const date = new Date(admin.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getMonth()

    const meses = [null, "Janeiro", 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div
                        className={styles.container}
                        initial={"closed"}
                        animate={"open"}
                        exit={"closed"}
                        key={"reports"}
                        ref={popout}
                        variants={{
                            open: {
                                opacity: 1,
                                y: 0,
                                transition: { ease: "backOut", duration: 0.45 }
                            },
                            closed: {
                                y: -35,
                                opacity: 0
                            },
                            exit: {
                                y: -35,
                                opacity: 0
                            }
                        }}
                    >
                        <header>
                            <h3>{`${admin.first_name}`}<br />{`${admin.last_name}`}</h3>
                            <div>
                                <h5 className={styles[admin.role]}>{formattedRole}</h5>
                                <span>{`desde ${day} de ${meses[parseInt(month as string)]} de ${date.getUTCFullYear()}`}</span>
                            </div>
                        </header>
                        <div style={{ backgroundColor: "var(--background-01)" }} className={styles.line}></div>
                        <ul className={styles.buttons}>
                            <NavLink title='Configurações' Icon={ConfigIcon} defaultSvg href={`/dashboard/config`} />
                            <NavLink title='Log-out' Icon={LogoutIcon} onClick={logoutAdmin} />
                        </ul>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}