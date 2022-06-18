import styles from './footer.module.css';
import Link from 'next/link';

import Logo from '/public/logo.svg'
import LinkIcon from '/public/icons/link_icon.svg'

import InstagramIcon from '/public/icons/instagram_icon.svg'
import FacebookIcon from '/public/icons/facebook_icon.svg'
import TwitterIcon from '/public/icons/twitter_icon.svg'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={"wrapper"}>
                <div className={styles['col-a']}>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h5>DOCS</h5>
                            <Link href={"/perguntas-frequentes"}>
                                <a>F.A.Q</a>
                            </Link>
                            <Link href={"/blog/quais-dados-sao-coletados"}>
                                <a>Quais dados são coletados?</a>
                            </Link>
                        </div>
                        <div className={styles.column}>
                            <h5>Comunidade</h5>
                            <Link href={"/blog/o-que-a-comunidade-vem-fazendo"}>
                                <a>O que a comunidade vem fazendo?</a>
                            </Link>
                            <Link href={"/blog/estatisticas"}>
                                <a>Estatísticas</a>
                            </Link>
                        </div>
                        <div className={`${styles.column} ${styles.external}`}>
                            <h5>Mais</h5>
                            <a>
                                Termos de Serviço
                                <LinkIcon />
                            </a>
                            <a>
                                Política de Privacidade
                                <LinkIcon />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles['col-b']}>
                    <div>
                        <a href="#">
                            <Logo className={styles.logo} />
                        </a>

                        <p>
                            ©2022 | DFL - Detector de Focos de Lixo.<br /> <br />
                            Todos os direitos reservados.
                        </p>
                    </div>
                    <ul className={`social-links ${styles['social-links']}`}>
                        <li>
                            <a target="_blank" href="https://instagram.com/appdfl">
                                <InstagramIcon />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://facebook.com/appdfl">
                                <FacebookIcon />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://twitter.com/appdfl">
                                <TwitterIcon />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}