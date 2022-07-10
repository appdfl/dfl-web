import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from "/src/styles/dashboard/dashboard.module.css";

import Sidebar from '../../../components/Dashboard/Menu';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardButton from '../../../components/Dashboard/Button';

import { motion, AnimatePresence } from "framer-motion";
import DashboardSectionTitle from '../../../components/Dashboard/SectionTitle';
import PostsList from '../../../components/Dashboard/PostsList';

import NewIcon from '@mui/icons-material/AddOutlined';

import { getPostsData } from '../../../utils/posts';
import { useAuthContext } from '../../../context/AuthContext';

export default function Blog() {
    const router = useRouter();
    const updatePosts = router.query.updatePosts;
    const [mounted, setMounted] = useState(false)

    const { admin } = useAuthContext();
    const [posts, setPosts] = useState(null)

    if (!admin) return <div></div>

    if (admin.role !== "redactor" && admin.role !== "admin") {
        router.push(`/dashboard`)
    }

    useEffect(() => {
        async function getPosts() {
            const postsData = await getPostsData(admin.role === "admin" ? null : admin.id)
            if (postsData) {
                setPosts(postsData)
                sessionStorage.setItem('posts', JSON.stringify(postsData))
                console.log(`${postsData.length} posts foram obtidos do banco de dados com sucesso!`)
            } else {
                setPosts(["error"])
            }
        }

        const postsFromSessionStorage = sessionStorage.getItem('posts')
        const parsedPostsFromSessionStorage = JSON.parse(postsFromSessionStorage)
        if (postsFromSessionStorage && parsedPostsFromSessionStorage.length > 0 && !updatePosts) {
            setPosts(parsedPostsFromSessionStorage)
            console.log(`${parsedPostsFromSessionStorage.length} posts foram obtidos do sessionStorage com sucesso!`)
        } else {
            console.log("Obtendo posts do servidor.")
            getPosts()
        }
    }, [])

    const draftsPosts = posts ? posts.filter(post => post.published === false && post.redactor.first_name === admin.first_name) : null

    const publishedPosts = posts ? posts.filter(post => post.published === true && post.redactor.first_name === admin.first_name).sort((x, y) => {
        return x.pinned ? -1 : y.pinned ? 1 : 0
    }) : null

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const opacityVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 0
        }
    };

    return (
        <div className={`dashboard`}>
            <Head>
                <title>Blog</title>
            </Head>

            <Sidebar />

            <AnimatePresence>
                <motion.div
                    initial={"closed"}
                    animate={"open"}
                    exit={"closed"}
                    key={"blog"}
                    variants={opacityVariants}
                    className={`${styles.content} ${styles.blog}`}
                >
                    <DashboardHeader title='Blog' />

                    <div className={styles.header}>
                        <DashboardSectionTitle title='Meus Posts' />
                        <Link href={"/dashboard/blog/post/create"}>
                            <DashboardButton
                                title='Novo artigo'
                                Icon={NewIcon}
                                backgroundColor='var(--background-02)'
                                contentColor={`var(--font-color)`}
                                fontSize={`1.35rem`}
                                padding={`1.75rem 1.75rem`}
                                color={`var(--primary-color-01)`}
                                iconSize={"medium"}
                            />
                        </Link>
                    </div>

                    <div>
                        <h4>Rascunhos</h4>
                        <div style={{ width: "100%" }}>
                            <PostsList posts={draftsPosts} skeletonHeight={`7.5rem`} drafts />
                        </div>
                    </div>
                    <div>
                        <h4>Publicados</h4>
                        <div style={{ width: "100%" }}>
                            <PostsList posts={publishedPosts} skeletonHeight={`15rem`} />
                        </div>
                    </div>

                    {
                        admin.role === "admin" && posts &&
                        <>
                            <div className={styles.header}>
                                <DashboardSectionTitle title='Todos os posts' />
                                <p>Esta área só é visível para administradores.</p>
                            </div>
                            <div style={{ width: "100%" }}>
                                <PostsList completeList posts={posts.filter(post => post.redactor.first_name !== admin.first_name)} skeletonHeight={`15rem`} />
                            </div>
                        </>
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
}