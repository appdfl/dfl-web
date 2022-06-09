import { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";
import styles from './sidebar.module.css';

type NavLinkProps = {
    title: string;
    Icon: SvgIconComponent;
    href?: string;
}

export default function NavLink({ title, Icon, href }: NavLinkProps) {
    return <li className="navLink">
        <Link href={href ? href : "#"}>
            <a>
                <Icon className={styles.icon} />
                <span className={`${styles.text} ${styles.navText}`}>{title}</span>
            </a>
        </Link>
    </li>
}