import styles from './button.module.css';
import dashboardStyles from '/src/dashboard/styles/dashboard.module.css';

import Link from 'next/link';

type Props = {
    title: string;
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function AuthenticationButton({ title, onClick, disabled, isLoading }: Props) {
    return (
        <button disabled={disabled || isLoading} onClick={onClick} className={`${styles.button} ${isLoading ? styles.buttonLoading : ""}`}>
            {!isLoading && title}
        </button>
    );
}