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

import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';

import NavLink from "../NavLink";
import { useTheme } from "next-themes";

import { useAuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { useScreenSize } from "../../../utils/hooks/useScreenSize";

// if it's not set in localStorage value is null, then !! will set as false

let lastSection = "Dashboard";

export default function Sidebar(/* { actualSection }: Props */) {
    const router = useRouter();
    const { theme, setTheme } = useTheme()
    const { admin } = useAuthContext();

    if (!admin) return <div></div>

    const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        console.log(theme)
    }

    const [sidebarOpened, setSidebarOpened] = useState(true)
    const { isScreenWide } = useScreenSize();

    useEffect(() => {
        if (!isScreenWide) {
            setSidebarOpened(true)
        }
    }, [isScreenWide])

    function toggleSidebar() {
        console.log("Abrindo ou fechando sidebar")
        setSidebarOpened(!sidebarOpened)

        const content = document.body.querySelector(`.${dashboardStyles.content}`) as HTMLElement;
        if (sidebarOpened && content) {
            content.style.left = `var(--collapsed-sidebar-width)`;
            content.style.width = `calc(100vw - var(--collapsed-sidebar-width))`;
        } else {
            content.style.left = `var(--sidebar-width)`;
            content.style.width = `calc(100vw - var(--sidebar-width))`;
        }
    }

    const [actualSection, setActualSection] = useState(lastSection)
    useEffect(() => {
        const url = router.asPath;
        if (url.includes("reports")) {
            setActualSection("reports")
        } else if (url.includes("statistics")) {
            setActualSection("statistics")
        } else if (url.includes("blog")) {
            setActualSection("blog")
        } else {
            setActualSection("dashboard")
        }
    }, [])

    const iconOnly = isScreenWide === true ? false : true

    return (
        <nav className={`${styles.sidebar} ${sidebarOpened ? "" : styles.closed}`}>
            {
                isScreenWide &&
                <header>
                    <Link href={`/dashboard`}>
                        <Logo style={{ cursor: "pointer" }} className={styles.logo} />
                    </Link>
                    <Icon onClick={toggleSidebar} className={styles.menuIcon}>{sidebarOpened ? "segment" : "menu"}</Icon>
                </header>
            }

            <div className={styles.menu}>
                {/* <li className={styles.searchBox}>
                        <SearchIcon className={styles.icon} />
                        <input type="text" placeholder="Pesquisar" onClick={() => setSidebarOpened(true)} />
                    </li> */}
                <NavLink title={"Dashboard"} href={"/dashboard"}
                    Icon={DashboardIcon}
                    iconOnly={iconOnly}
                    padding={!isScreenWide && `2rem`}
                    isActualSection={actualSection === "dashboard"}
                />
                <NavLink title={"Relatórios"} href={"/dashboard/reports"}
                    Icon={ReportsIcon}
                    iconOnly={iconOnly}
                    padding={!isScreenWide && `2rem`}
                    isActualSection={actualSection === "reports"}
                />
                <NavLink title={"Estatísticas"} href={"/dashboard/statistics"}
                    Icon={StatisticsIcon}
                    iconOnly={iconOnly}
                    padding={!isScreenWide && `2rem`}
                    isActualSection={actualSection === "statistics"}
                />
                <NavLink title={"Blog"} href={"/dashboard/blog"}
                    Icon={BlogIcon}
                    iconOnly={iconOnly}
                    padding={!isScreenWide && `2rem`}
                    isActualSection={actualSection === "blog"}
                    disabled={admin.role !== "redactor" && admin.role !== "admin" ? true : false}
                />
            </div>

            {
                isScreenWide &&
                <div className={styles.reportFrame}>
                    <ReportIcon className={styles.reportIcon} />
                    <h6>Encontrou algum problema?</h6>
                    <p>Reporte o erro para que ele seja corrigido</p>
                    <button>
                        <FlagIcon className={styles.icon} />
                        <span>REPORTAR</span>
                    </button>
                </div>
            }

            {
                isScreenWide &&
                <footer className={styles.footer}>
                    <li className={"mode"}>
                        <div className={"moon_sun"}>
                            <div className={"centralize"}>
                                <DarkModeIcon className={`${styles.icon} moon`} />
                            </div>
                            <div className={"centralize"}>
                                <LightModeIcon className={`${styles.icon} sun`} />
                            </div>
                        </div>
                        <div className={`${styles.modeText}`}><p className={`${styles.text}`}>{theme === "dark" ? "Modo Escuro" : "Modo Claro"}</p></div>
                        <div className={"toggle_switch"}>
                            <span onClick={switchTheme} className={"switch"}></span>
                        </div>
                    </li>
                </footer>
            }
        </nav>
    );
}