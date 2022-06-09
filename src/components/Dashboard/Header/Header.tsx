import styles from './header.module.css';

import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

type Props = {
    title: string;
}

export default function DashboardHeader({ title }: Props) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.user}>
                <div className={styles.user}>
                    <img className={styles.accountImage} src={"https://github.com/theduardomaciel.png"} />
                    <ArrowDown className={styles.icon} />
                </div>
            </div>
        </header>
    );
}