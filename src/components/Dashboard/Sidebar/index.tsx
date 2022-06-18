import Link from "next/link";
import React, { useEffect, useState } from "react";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css";
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
import { useTheme } from "next-themes";

// if it's not set in localStorage value is null, then !! will set as false

let lastSection = "Dashboard";

export default function Sidebar(/* { actualSection }: Props */) {

    const { theme, setTheme } = useTheme()

    const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
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

    const [actualSection, setActualSection] = useState(lastSection)
    useEffect(() => {
        const isRegularSection = document.title === "Dashboard" || document.title === "Relatórios" || document.title === "Estatísticas" || document.title === "Blog";
        console.log(isRegularSection, document.title, lastSection)

        if (isRegularSection) {
            setActualSection(document.title)
            lastSection = document.title
        } else {
            setActualSection(lastSection)
        }
    }, [])

    return (
        <nav className={`${styles.sidebar} ${sidebarOpened ? "" : styles.close}`}>
            <header>
                <Link href={`/dashboard`}>
                    <Logo style={{ cursor: "pointer" }} className={styles.logo} />
                </Link>
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
                        <div className={`${styles.modeText}`}><p className={`${styles.text}`}>{theme === "dark" ? "Modo Escuro" : "Modo Claro"}</p></div>
                        <div className={styles.toggle_switch}>
                            <span onClick={switchTheme} className={styles.switch}></span>
                        </div>
                    </li>
                </footer>

            </div>
        </nav>
    );
}