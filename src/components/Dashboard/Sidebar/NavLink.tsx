import { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from './sidebar.module.css';

type NavLinkProps = {
    title: string;
    Icon: SvgIconComponent;
    href?: string;
    isActualSection?: boolean;
}

export default function NavLink({ title, Icon, href, isActualSection }: NavLinkProps) {

    const button = useRef(null);

    /* const updateSelectedSection = () => {
        console.log("Atualizando botões")
        const sectionsButtons = document.querySelectorAll(".dashboardSection")
        sectionsButtons.forEach(button => {
            button.classList.remove(styles.selected)
        })
        button.current.classList.add(styles.selected)
    } */

    return <li ref={button} /* onClick={updateSelectedSection} */ className={`dashboardSection ${isActualSection && styles.selected}`}>
        <Link href={href ? href : "/dashboard"}>
            <a>
                <Icon className={styles.icon} />
                <span className={`${styles.text} ${styles.navText}`}>{title}</span>
            </a>
        </Link>
    </li>
}