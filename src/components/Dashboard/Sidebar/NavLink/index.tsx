import { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";
import { useRef, useState } from "react";

import styles from './styles.module.css';

type NavLinkProps = {
    title: string;
    defaultSvg?: boolean;
    Icon: SvgIconComponent;
    href?: string;
    isActualSection?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export default function NavLink({ title, Icon, href, defaultSvg, isActualSection, disabled, onClick }: NavLinkProps) {
    return (
        <li onClick={onClick && onClick} className={`${styles.container} ${isActualSection && styles.selected}`} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
            {
                disabled ?
                    <a>
                        <Icon className={styles.icon} style={{ width: `2.5rem`, height: `2.5rem` }} />
                        <span className={`${styles.text} ${styles.navText}`}>{title}</span>
                    </a>
                    :
                    <Link href={href ? href : "/dashboard"}>
                        <a>
                            <Icon className={styles.icon} style={{ width: `2.5rem`, height: `2.5rem` }} />
                            <span className={`${styles.text} ${styles.navText}`}>{title}</span>
                        </a>
                    </Link>
            }
        </li>
    )
}