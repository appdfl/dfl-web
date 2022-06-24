import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";

import Character from "/public/images/character/character_1.svg"

import styles from '../styles/404.module.css';

export default function Custom404() {
    return (
        <div>
            <Head>
                <title>{`404 :(`}</title>
            </Head>

            <Header />

            <section className={`header ${styles.container}`}>
                <h1>404</h1>
                <h2>{`Opa! Parece que essa página não existe :(`}</h2>
                <img src="/images/character/character_1.svg" alt="" className={styles.image} />
            </section>

            <Footer />
        </div>
    )
}