import styles from './popout.module.css';

import ConfigIcon from "/public/icons/config_icon.svg";
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

import { useRouter } from 'next/router';
import { useAuthContext } from '../../../context/AuthContext';

import { SetStateAction } from 'react';
import Link from 'next/link';

type Props = {
    isOpen: boolean;
    toggleOpen: () => SetStateAction<void>;
}

export default function DashboardProfilePopout({ isOpen, toggleOpen }: Props) {
    const router = useRouter()
    const { admin, logoutAdmin } = useAuthContext();

    if (!admin) return <div></div>

    return (
        isOpen &&
        <div className={styles.container} style={{ top: 100, right: 50 }}>
            <header>
                <h3>Eduardo Maciel</h3>
                <div>
                    <h5>Coletor</h5>
                    <span>desde 22 de outubro de 2022</span>
                </div>
            </header>
            <div>
                <ul>
                    <Link href={`/dashboard/config`}>
                        <li key={"config"} className={styles.click}>
                            <a>
                                <ConfigIcon className={styles.icon} />
                                <span className={`${styles.text} ${styles.navText}`}>Configurações</span>
                            </a>
                        </li>
                    </Link>
                    <li key={"logout"} onClick={logoutAdmin} className={styles.click}>
                        <a>
                            <LogoutIcon className={styles.icon} />
                            <span className={`${styles.text} ${styles.navText}`}>Log-out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}