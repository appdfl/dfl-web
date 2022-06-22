import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './header.module.css';

import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ReturnIcon from '@mui/icons-material/SubdirectoryArrowLeft';

import { useAuthContext } from '../../../context/AuthContext';
import DashboardProfilePopout from '../ProfilePopout';

type Props = {
    title: string;
    returnButton?: boolean;
}

export default function DashboardHeader({ title, returnButton }: Props) {
    const router = useRouter()
    const { admin } = useAuthContext();

    if (!admin) return <div></div>

    const [popoutOpen, setPopoutOpen] = useState(false);
    function toggleProfilePopout() {
        setPopoutOpen(!popoutOpen)
    }

    return (
        <header className={styles.header}>
            {
                returnButton ?
                    <div onClick={() => router.back()} className={`${styles.titleHolder} ${styles.click}`}>
                        <ReturnIcon className={styles.returnIcon} />
                        <h1 className={styles.title}>{title}</h1>
                    </div>
                    :
                    <div className={`${styles.titleHolder}`}>
                        <h1 className={styles.title}>{title}</h1>
                    </div>
            }

            <div onClick={toggleProfilePopout} className={styles.user}>
                <div className={styles.user}>
                    <img className={styles.accountImage} src={admin.image_url} />
                    <ArrowDown className={styles.icon} />
                </div>
            </div>

            <DashboardProfilePopout isOpen={popoutOpen} toggleOpen={toggleProfilePopout} />
        </header>
    );
}