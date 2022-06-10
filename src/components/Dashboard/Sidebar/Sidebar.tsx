import Link from "next/link";
import React, { useEffect, useState } from "react";

import dashboardStyles from "/src/styles/dashboard.module.css";
import styles from './sidebar.module.css';

import Logo from "/public/logo.svg";

import Icon from '@mui/material/Icon';

/* import SegmentIcon from '@mui/icons-material/Segment';
import MenuIcon from '@mui/icons-material/Menu';
 */
import SearchIcon from '@mui/icons-material/Search';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import FlagIcon from '@mui/icons-material/FlagOutlined';

import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ReportsIcon from '@mui/icons-material/TextSnippetOutlined';
import StatisticsIcon from '@mui/icons-material/LeaderboardOutlined';
import BlogIcon from '@mui/icons-material/TopicOutlined';

import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import NavLink from "./NavLink";

/* type Props = {
    actualSection: string;
} */

// if it's not set in localStorage value is null, then !! will set as false

export default function Sidebar(/* { actualSection }: Props */) {

    const [isDarkMode, setIsDarkMode] = useState(true)

    function switchTheme(onlyCheck) {
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('theme', JSON.stringify(isDarkMode))

        const body = document.body.querySelector("body");
        body.classList.toggle(`dark`)
        body.classList.toggle(`${styles.dark}`)
        document.body.classList.toggle(`dark`)
        //document.body.classList.toggle(`${styles.dark}`)
    }

    const [sidebarOpened, setSidebarOpened] = useState(true)
    function toggleSidebar() {
        console.log("Abrindo ou fechando sidebar")
        setSidebarOpened(!sidebarOpened)

        const content = document.body.querySelector(`.${dashboardStyles.content}`) as HTMLElement;
        if (sidebarOpened) {
            content.style.left = `var(--collapsed-sidebar-width)`;
            content.style.width = `calc(100vw - var(--collapsed-sidebar-width))`;
        } else {
            content.style.left = `var(--sidebar-width)`;
            content.style.width = `calc(100vw - var(--sidebar-width))`;
        }
    }

    const [actualSection, setActualSection] = useState("dashboard")
    useEffect(() => {
        setIsDarkMode(JSON.parse(localStorage.getItem('theme')))
        const body = document.body.querySelector("body");
        if (isDarkMode) {
            body.classList.add(`dark`)
            body.classList.add(`${styles.dark}`)
            document.body.classList.add(`dark`)
        } else {
            body.classList.remove(`dark`)
            body.classList.remove(`${styles.dark}`)
            document.body.classList.remove(`dark`)
        }

        setActualSection(document.title)
    }, [])

    return (
        <nav className={`${styles.sidebar} ${sidebarOpened ? "" : styles.close}`}>
            <header>
                <Logo className={styles.logo} />
                <Icon onClick={toggleSidebar} className={styles.menuIcon}>{sidebarOpened ? "segment" : "menu"}</Icon>
            </header>

            <div className={styles.menuBar}>
                <div className={styles.menu}>

                    {/* <li className={styles.searchBox}>
                        <SearchIcon className={styles.icon} />
                        <input type="text" placeholder="Pesquisar" onClick={() => setSidebarOpened(true)} />
                    </li> */}

                    <ul className="menuLinks">
                        <NavLink title={"Dashboard"} Icon={DashboardIcon} isActualSection={actualSection === "Dashboard"} />
                        <NavLink title={"Relatórios"} Icon={ReportsIcon} href={"/dashboard/reports"} isActualSection={actualSection === "Relatórios"} />
                        <NavLink title={"Estatísticas"} Icon={StatisticsIcon} href={"/dashboard/statistics"} isActualSection={actualSection === "Estatísticas"} />
                        <NavLink title={"Blog"} Icon={BlogIcon} href={"/dashboard/blog"} isActualSection={actualSection === "Blog"} />
                    </ul>
                </div>

                <div className={styles.reportFrame}>
                    <ReportIcon className={styles.reportIcon} />
                    <h6>Encontrou algum problema?</h6>
                    <p>Reporte o erro para que ele seja corrigido</p>
                    <button>
                        <FlagIcon className={styles.icon} />
                        <span>REPORTAR</span>
                    </button>
                </div>

                <footer className={styles.footer}>
                    <li className={styles.click}>
                        <a>
                            <LogoutIcon className={styles.icon} />
                            <span className={`${styles.text} ${styles.navText}`}>Log-out</span>
                        </a>
                    </li>
                    <li className={styles.mode}>
                        <div className={styles.moon_sun}>
                            <div className={styles.centralize}>
                                <DarkModeIcon className={`${styles.icon} ${styles.moon}`} />
                            </div>
                            <div className={styles.centralize}>
                                <LightModeIcon className={`${styles.icon} ${styles.sun}`} />
                            </div>
                        </div>
                        <div className={`${styles.modeText}`}><p className={`${styles.text}`}>{isDarkMode ? "Modo Escuro" : "Modo Claro"}</p></div>
                        <div className={styles.toggle_switch}>
                            <span onClick={switchTheme} className={styles.switch}></span>
                        </div>
                    </li>
                </footer>

            </div>
        </nav>
    );
}