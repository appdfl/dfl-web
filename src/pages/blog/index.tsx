import Head from 'next/head';
import Link from 'next/link';

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import styles from "/src/styles/blog.module.css"
import Date from '../../components/date';

import { getSortedPostsData } from '../../utils/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Blog({ allPostsData }) {
    return (
        <body>
            <Head>
                <title>Blog</title>
            </Head>

            <Header selected='blog' />

            <section className={`header ${styles.header}`}>
                <div className="wrapper">
                    <header>
                        <h4>Blog</h4>
                        <h1>Acompanhe os posts de que você precisa.</h1>
                    </header>
                </div>
            </section>

            <section className={styles.blog}>
                <div className={`wrapper ${styles.wrapper}`}>
                    <h2>{`Opa! Parece que isso ainda não está funcionando :(`}</h2>
                    <ul className={styles.posts}>
                        {allPostsData.map(({ id, date, title, author, description }) => (
                            <li className={styles.post} key={id}>
                                <p>{description}</p>
                                <Link href={`/blog/${id}`}>
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className={styles.postDate}>
                                    <span className={styles.author}>{author + ` • `}</span> {<Date dateString={date} />}
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
        </body>
    );
}