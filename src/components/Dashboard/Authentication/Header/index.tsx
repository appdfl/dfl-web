import styles from './header.module.css';
import Logo from '/public/logo.svg'

export default function AuthenticationHeader() {
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />
            <h3>Painel de Administração</h3>
        </div>
    );
}