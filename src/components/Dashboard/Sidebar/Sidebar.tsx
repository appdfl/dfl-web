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

import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ReportsIcon from '@mui/icons-material/TextSnippetOutlined';
import StatisticsIcon from '@mui/icons-material/LeaderboardOutlined';
import BlogIcon from '@mui/icons-material/TopicOutlined';

import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import NavLink from "./NavLink";

export default function Sidebar() {

    const [theme, setTheme] = useState("light")
    function switchTheme() {
        setTheme(theme === "light" ? "dark" : "light")

        const body = document.body.querySelector("body");
        body.classList.toggle(`dark`)
        body.classList.toggle(`${styles.dark}`)
        document.body.classList.toggle(`dark`)
        document.body.classList.toggle(`${styles.dark}`)
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

    return (
        <nav className={`${styles.sidebar} ${sidebarOpened ? "" : styles.close}`}>
            <header>
                <Logo className={styles.logo} />
                <Icon onClick={toggleSidebar} className={styles.menuIcon}>{sidebarOpened ? "segment" : "menu"}</Icon>
            </header>

            <div className={styles.menuBar}>
                <div className={styles.menu}>

                    <li className={styles.searchBox}>
                        <SearchIcon className={styles.icon} />
                        <input type="text" placeholder="Pesquisar" onClick={() => setSidebarOpened(true)} />
                    </li>

                    <ul className="menuLinks">
                        <NavLink title={"Dashboard"} Icon={DashboardIcon} />
                        <NavLink title={"Relatórios"} Icon={ReportsIcon} href={"/dashboard/reports"} />
                        <NavLink title={"Estatísticas"} Icon={StatisticsIcon} href={"/dashboard/statistics"} />
                        <NavLink title={"Blog"} Icon={BlogIcon} href={"/dashboard/blog"} />
                    </ul>
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
                        <div className={`${styles.modeText}`}><p className={`${styles.text}`}>{theme === "light" ? "Modo Claro" : "Modo Escuro"}</p></div>
                        <div className={styles.toggle_switch}>
                            <span onClick={switchTheme} className={styles.switch}></span>
                        </div>
                    </li>
                </footer>

            </div>
        </nav>
    );
}