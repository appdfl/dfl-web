import { useRouter } from 'next/router';
import { useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './posts-list.module.css';
import reportsListStyles from '/src/components/Dashboard/ReportsList/reports-list.module.css';
import dashboardStyles from '/src/styles/dashboard/dashboard.module.css';

import { Post } from '../../../@types/application';

import ViewsIcon from '@mui/icons-material/VisibilityOutlined';
import PublishIcon from '@mui/icons-material/FileUploadOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PinIcon from '@mui/icons-material/PushPinOutlined';

import DeletePostModal from '../Modal/Presets/DeletePostModal';
import PinPostModal from '../Modal/Presets/PinPostModal';
import PublishPostModal from '../Modal/Presets/PublishPostModal';

import DashboardButton from '../Button';
import DashboardModal from '../Modal';

import NoItemsIcon from '@mui/icons-material/DriveFileRenameOutline';
import SuccessAndErrorModal from '../Modal/Presets/SuccessAndErrorModal';

type Props = {
    posts: Array<Post> | Array<string>;
    drafts?: boolean;
    completeList?: boolean;
    skeletonHeight: string;
}

export default function PostsList({ posts, drafts, completeList, skeletonHeight }: Props) {
    //console.log(posts)
    const router = useRouter();
    const proportions = drafts ?
        {
            title: 0.6,
            date: 0.2,
            actions: 0.2,
        }
        : completeList ?
            {
                title: 0.35,
                redactor: 0.2,
                date: 0.2,
                actions: 0.15,
                views: 0.1
            } :
            {
                title: 0.5,
                date: 0.2,
                actions: 0.2,
                views: 0.1
            }

    const EmptyItem = () => {
        return (
            <div style={{ display: 'flex', flexDirection: "row", gap: `2.5rem`, alignItems: "center", justifyContent: "center", alignSelf: "center", width: "100%" }}>
                <NoItemsIcon style={{ color: `var(--font-color)`, fontSize: `2.4rem` }} />
                <p style={{
                    color: `var(--font-color)`,
                    fontWeight: 700,
                    fontSize: `1.2rem`,
                    textAlign: "center",
                }}>
                    Está um pouco vazio aqui...
                </p>
            </div>
        )
    }

    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const { SuccessModal, ErrorModal, setErrorOrSuccessMessage } = SuccessAndErrorModal(() => router.push('/dashboard/blog?updatePosts=true'))

    const { DeleteModal, setDeleteModalVisible } = DeletePostModal(selectedPost, setErrorOrSuccessMessage)
    const { PinModal, setPinModalVisible } = PinPostModal(selectedPost, setErrorOrSuccessMessage)
    const { PublishModal, setPublishDraftModalVisible } = PublishPostModal(selectedPost, setErrorOrSuccessMessage)

    function goToPreview(event, post) {
        event.stopPropagation()
        if (event.target instanceof HTMLButtonElement === false && event.target instanceof SVGElement === false) {
            console.log(event.target)
            router.push({ pathname: "/dashboard/blog/post/preview", query: { post: JSON.stringify(post) } }, "/dashboard/blog/post/preview")
        }
    }

    const postsItems = posts && posts.sort(post => {
        if (post.pinned === false) {
            return 1
        } else {
            return -1
        }
    }).map((post) => {
        const date = new Date(post.createdAt)
        const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
        const month = date.getMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getMonth()

        const pinButton = <DashboardButton onClick={() => {
            setSelectedPost(post)
            setPinModalVisible(true)
        }} Icon={PinIcon} contentColor={post.pinned && `var(--background-01)`} backgroundColor={post.pinned && `var(--yellow)`} color={`var(--yellow)`} iconSize={`medium`} borderWidth={`2px`} padding={`1rem 0.55rem`} />

        const publishButton = <DashboardButton onClick={() => {
            setSelectedPost(post)
            setPublishDraftModalVisible(true)
        }} Icon={PublishIcon} color={`var(--primary-color-01)`} iconSize={`medium`} borderWidth={`2px`} padding={`1rem 0.55rem`} />

        const editButton = <DashboardButton onClick={() => router.push({
            pathname: `/dashboard/blog/post/edit`,
            query: {
                post: JSON.stringify(post)
            }
        }, `/dashboard/blog/post/edit`)} Icon={EditIcon} color={`var(--light-blue)`} iconSize={`medium`} borderWidth={`2px`} padding={`1rem 0.55rem`} />

        const deleteButton = <DashboardButton onClick={() => {
            setSelectedPost(post)
            setDeleteModalVisible(true)
        }} Icon={DeleteIcon} color={`var(--light-red)`} iconSize={`medium`} borderWidth={`2px`} padding={`1rem 0.55rem`} />

        return (
            //<Link href={{ pathname: "/dashboard/blog/post/preview", query: { post: JSON.stringify(post) } }} as="/dashboard/blog/post/preview">
            <li className={reportsListStyles.reportContainer} key={post.title}>
                <div onClick={(event) => goToPreview(event, post)} className={reportsListStyles.reportItem}>
                    <h3 style={{ flex: proportions.title, textAlign: "left" }}>{post.title}</h3>

                    {
                        completeList &&
                        <div className={styles.redactor} style={{ flex: proportions.redactor }}>
                            <img className={dashboardStyles.profileImage} src={post.redactor.image_url} alt="Imagem de perfil do usuário que publicou o relatório" />
                            <p className={styles.redactorText}>{`${post.redactor.first_name}  ${post.redactor.last_name}`}</p>
                        </div>
                    }

                    <div className={styles.actions} style={{ flex: proportions.actions }}>
                        {
                            post.published &&
                            pinButton
                        }
                        {
                            !post.published &&
                            publishButton
                        }
                        {editButton}
                        {deleteButton}
                    </div>

                    <p style={{ flex: proportions.date }}>{`${day}/${month}/${date.getUTCFullYear()}`}</p>

                    {
                        !drafts &&
                        <div style={{ flex: proportions.views }} className={styles.viewsFrame}>
                            <ViewsIcon style={{ fontSize: `1.4rem` }} />
                            <p>{post.views}</p>
                        </div>
                    }
                </div>
            </li>
            //</Link>
        )
    });

    return (
        posts === null ?
            <Skeleton baseColor={`var(--background-02)`} highlightColor={`var(--border`} borderRadius={`1.5rem`} height={skeletonHeight} />
            :
            posts.length === 0 ?
                <EmptyItem />
                :
                posts[0] === "error" ?
                    <p>error</p>
                    :
                    <div className={styles.holder}>
                        <header className={styles.header}>
                            <ul>
                                <li style={{ flex: proportions.title, textAlign: "left" }}>
                                    Título
                                </li>
                                {
                                    completeList &&
                                    <li style={{ flex: proportions.redactor }}>
                                        Redator
                                    </li>
                                }
                                <li style={{ flex: proportions.actions }}>
                                    Ações
                                </li>
                                <li style={{ flex: proportions.date }}>
                                    Data
                                </li>
                                {
                                    !drafts &&
                                    <li style={{ flex: proportions.views }}>
                                        Visualizações
                                    </li>
                                }
                            </ul>
                        </header>
                        <div className={styles.list}>
                            <ul>
                                {postsItems}
                            </ul>
                        </div>

                        {DeleteModal}
                        {PublishModal}
                        {PinModal}

                        {SuccessModal}
                        {ErrorModal}
                    </div>
    );
}