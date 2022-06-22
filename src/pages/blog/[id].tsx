import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps, GetStaticPaths } from 'next';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import styles from "/src/styles/blog.module.css"

import { getAllPostIds, getPostData } from '../../utils/posts';
import Date from '../../components/date';

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const postData = await getPostData(context.params?.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <body>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <Header selected='blog' />

            <section className={`header`}>
                <div className="wrapper">
                    <header>
                        <h4>{<Date dateString={postData.date} />}</h4>
                        <h1>{postData.title}</h1>
                        <div className={styles.backToHome}>
                            <Link href="/blog">
                                <a>← Voltar ao Início</a>
                            </Link>
                        </div>
                    </header>
                </div>
            </section>

            <article className={styles.article}>
                <div className={`wrapper ${styles.content}`} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>

            <Footer />
        </body>
    );
}