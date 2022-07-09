import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps, GetStaticPaths } from 'next';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';

import styles from "/src/styles/blog.module.css"

import { getAllPostIds, getPostDataFormatted } from '../../utils/posts';
import Layout from '../../components/Layout';

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostDataFormatted(params.id as string);
    return {
        props: { postData },
        revalidate: 10,
    };
}

export default function Post({ postData }) {
    return (
        <div style={{ backgroundColor: "var(--background-02)" }}>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <section style={{ paddingBottom: "5rem" }} className={`header`}>
                <div className={`wrapper`}>
                    <header className={styles.header}>
                        <h4>{postData.category}</h4>
                        <h1>{postData.title}</h1>

                        <div className={styles.blogPostInfo}>
                            <div className={`${styles.headerColor} holder`}>
                                <CalendarIcon className={styles.headerColor} />
                                <h4 className={styles.headerColor}>{postData.date}</h4>
                            </div>
                            <span>•</span>
                            <div className={"holder"}>
                                <img className={"profileImage"} src={postData.redactor.image_url} alt="Imagem do perfil do usuário que escreveu o artigo do blog." />
                                <p>redigido por <strong>{`${postData.redactor.first_name} ${postData.redactor.last_name}`}</strong></p>
                            </div>
                        </div>

                    </header>
                    <div className={styles.backToHome}>
                        <Link href="/blog">
                            <a>← Voltar ao Blog</a>
                        </Link>
                    </div>
                </div>
            </section>

            <article className={`${styles.article} article wrapper`}>
                <div className={`wrapper ${styles.content}`} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    );
}

Post.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}