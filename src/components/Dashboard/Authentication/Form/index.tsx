import { HTMLInputTypeAttribute } from 'react';
import styles from './form.module.css';

type Props = {
    title: string;
    type?: HTMLInputTypeAttribute;
    value: any;
    handleChange: (event) => void;
}

export default function AuthenticationForm({ title, value, type, handleChange }: Props) {
    return (
        <label className={styles.container}>
            {title}
            <input className={styles.input} type={type ? type : "email"} value={value} onChange={handleChange} name={title} id={title} />
        </label>
    );
}