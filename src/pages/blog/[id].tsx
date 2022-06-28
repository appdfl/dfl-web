import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps, GetStaticPaths } from 'next';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';

import styles from "/src/styles/blog.module.css"

import { getAllPostIds, getPostDataFormatted } from '../../utils/posts';

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
        revalidate: 86400,
    };
}

export default function Post({ postData }) {
    return (
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <Header selected='blog' />

            <section className={`header`}>
                <div className="wrapper">
                    <header>
                        <div className='holder'>
                            <CalendarIcon />

                            <h4>{postData.date}</h4>
                        </div>
                        <h1>{postData.title}</h1>
                        <div className={styles.blogPostInfo}>
                            <div className={"holder"}>
                                <img className={"profileImage"} src={postData.redactor.image_url} alt="Imagem do perfil do usuário que escreveu o artigo do blog." />
                                <p>artigo por <strong>{`${postData.redactor.first_name} ${postData.redactor.last_name}`}</strong></p>
                            </div>
                        </div>
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
        </div>
    );
}