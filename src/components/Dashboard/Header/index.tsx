import styles from './header.module.css';

import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ReturnIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import { useRouter } from 'next/router';

type Props = {
    title: string;
    returnButton?: boolean;
}

export default function DashboardHeader({ title, returnButton }: Props) {
    const router = useRouter()

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

            <div className={styles.user}>
                <div className={styles.user}>
                    <img className={styles.accountImage} src={"https://github.com/theduardomaciel.png"} />
                    <ArrowDown className={styles.icon} />
                </div>
            </div>
        </header>
    );
}