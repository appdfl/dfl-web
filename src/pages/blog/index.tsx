import Head from 'next/head';
import Link from 'next/link';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import styles from "/src/styles/blog.module.css"

import { getPostsDataFormatted } from '../../utils/posts';

export async function getStaticProps() {
    const allPostsData = await getPostsDataFormatted();
    console.log(allPostsData)
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
                        {allPostsData.map(({ post, date, contentHtml }) => (
                            <Link href={`/blog/${post.id}`}>
                                <li className={styles.post} key={post.id}>
                                    {
                                        post.category !== "general" &&
                                        <p>{post.category}</p>
                                    }
                                    <a>{post.title}</a>
                                    <br />
                                    <small className={styles.postDate}>
                                        <span className={styles.author}>{`${post.redactor.first_name} ${post.redactor.last_name}` + ` • `}</span> {date}
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