import Head from 'next/head';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

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
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    );
}