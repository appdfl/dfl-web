import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './header.module.css';

import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ReturnIcon from '@mui/icons-material/SubdirectoryArrowLeft';

import { useAuthContext } from '../../../context/AuthContext';
import DashboardProfilePopout from '../ProfilePopout';
import { useScreenSize } from '../../../utils/hooks/useScreenSize';

type Props = {
    title: string;
    subDirectory?: string;
    returnButton?: boolean;
    customDirectory?: string;
    customDirectoryParams?: {
        asPath: string,
        query?: any,
    };
}

export default function DashboardHeader({ title, subDirectory, returnButton, customDirectory, customDirectoryParams }: Props) {
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
                    <div className={`${styles.titleHolder}`}>
                        <ReturnIcon className={styles.returnIcon} />
                        <div className={styles.titleHolder} style={{ alignItems: "flex-end" }}>
                            <h1 className={`${styles.title} ${styles.hoverClick} ${styles.click}`} onClick={
                                customDirectory ?
                                    customDirectoryParams ?
                                        () => router.push({ pathname: customDirectory, query: customDirectoryParams.query }, customDirectoryParams.asPath)
                                        : () => router.push(customDirectory)
                                    : () => router.back()
                            }
                            >{title}</h1>
                            {
                                subDirectory &&
                                <h1 className={styles.directoryTitle}>{`${subDirectory}`}</h1>
                            }
                        </div>
                    </div>
                    :
                    <div className={`${styles.titleHolder}`}>
                        <h1 className={styles.title}>{title}</h1>
                    </div>
            }

            <div id='profile' onClick={toggleProfilePopout} className={styles.user}>
                <div className={styles.user}>
                    <img className={styles.accountImage} src={admin.image_url} />
                    <ArrowDown className={styles.icon} />
                </div>
            </div>

            <DashboardProfilePopout isOpen={popoutOpen} toggleOpen={toggleProfilePopout} />
        </header>
    );
}