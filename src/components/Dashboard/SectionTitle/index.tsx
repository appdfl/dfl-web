import styles from './styles.module.css';
import React, { SetStateAction } from 'react';

type Props = {
    title: string;
}

export default function DashboardSectionTitle({ title }: Props) {
    return (
        <div className={styles.container}>
            <div></div>
            <h2>{title}</h2>
        </div>
    );
}