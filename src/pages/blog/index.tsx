import Head from 'next/head';
import Link from 'next/link';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
        <div>
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
                    <ul className={styles.posts}>
                        {allPostsData.map(({ id, date, title, author, description }) => (
                            <Link href={`/blog/${id}`}>
                                <li className={styles.post} key={id}>
                                    <p>{description}</p>
                                    <a>{title}</a>
                                    <br />
                                    <small className={styles.postDate}>
                                        <span className={styles.author}>{author + ` • `}</span> {<Date dateString={date} />}
                                    </small>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
    );
}