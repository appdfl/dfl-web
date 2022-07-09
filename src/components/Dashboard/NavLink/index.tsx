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
    iconGap?: string;
    accentColor?: string;
    upperCase?: boolean;
}

export default function NavLink({ title, Icon, href, defaultSvg, isActualSection, disabled, accentColor, iconGap, onClick, upperCase }: NavLinkProps) {
    return (
        <li onClick={onClick && onClick} className={`navLink-container ${styles.container} ${isActualSection && "selected"}`} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
            {
                disabled || !href ?
                    <a>
                        <Icon className={`navLink-icon ${styles.icon}`} style={{ width: `2.5rem`, height: `2.5rem` }} />
                        <span style={{ textTransform: upperCase ? "uppercase" : "capitalize" }} className={`navLink-text ${styles.navText}`}>{title}</span>
                    </a>
                    :
                    <Link href={href ? href : "/dashboard"}>
                        <a>
                            <Icon className={`navLink-icon ${styles.icon}`} style={{ width: `2.5rem`, height: `2.5rem` }} />
                            <span style={{ textTransform: upperCase ? "uppercase" : "capitalize" }} className={`navLink-text ${styles.navText}`}>{title}</span>
                        </a>
                    </Link>
            }
            <style jsx>{`
                .navLink-container .navLink-icon,
                .navLink-container .navLink-text {
                    color: ${accentColor ? accentColor : "var(--font-color)"};
                    transition: var(--transition-03);
                }

                .navLink-container a {
                    padding-left: ${iconGap ? `1rem` : "2rem"};
                }

                .navLink-icon {
                    margin-right: ${iconGap ? iconGap : "3rem"};
                }
                
                .navLink-icon path {
                    fill: ${accentColor ? accentColor : "var(--font-color);"};
                }

                .navLink-container a:hover .navLink-icon,
                .navLink-container a:hover .navLink-text {
                    color: ${iconGap ? "var(--font-color)" : accentColor ? accentColor : "white"};
                }

                .navLink-container.selected a .navLink-icon,
                .navLink-container.selected a .navLink-text {
                    color: ${iconGap ? "var(--font-color)" : accentColor ? accentColor : "white"};
                }
            `}</style>
            <style jsx>{`
                .navLink-container a:hover,
                .navLink-container.selected a {
                    background-color: ${accentColor ? accentColor : "var(--accent-color)"};
                }

                [data-theme='dark'] .navLink-container a:hover,
                [data-theme='dark'] .navLink-container.selected a {
                    background-color: ${accentColor ? accentColor : "var(--font-color)"};
                }
            `}</style>
        </li>
    )
}