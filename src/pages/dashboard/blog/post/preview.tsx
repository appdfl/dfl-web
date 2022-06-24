import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Post } from "../../../../@types/application";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"
import styles from "/src/styles/dashboard/post.module.css"

import Sidebar from "../../../../components/Dashboard/Sidebar";
import DashboardHeader from "../../../../components/Dashboard/Header";
import DashboardButton from "../../../../components/Dashboard/Button";
import DashboardModal from "../../../../components/Dashboard/Modal";

import EditIcon from '@mui/icons-material/EditOutlined';
import SuccessIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PinIcon from '@mui/icons-material/PushPinOutlined';
import RemovePinIcon from '@mui/icons-material/RemoveCircleOutline';

import TurnDraftIcon from '@mui/icons-material/FileDownloadOffOutlined';
import PublishDraftIcon from "@mui/icons-material/FileUploadOutlined"

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloudIcon from '@mui/icons-material/CloudOutlined';

import { formatPostContent } from "../../../../utils/posts";
import DeletePostModal from "../../../../components/Dashboard/Modal/Presets/DeletePostModal";
import PinPostModal from "../../../../components/Dashboard/Modal/Presets/PinPostModal";
import PublishPostModal from "../../../../components/Dashboard/Modal/Presets/PublishPostModal";

export default function PreviewPost() {
    const router = useRouter()
    const { post, successUpdating } = router.query

    useEffect(() => {
        if (post === undefined) {
            router.push('/dashboard/blog')
        }
    }, [])

    if (post === undefined) {
        return (
            <div>

            </div>
        )
    }

    const postObject = JSON.parse(post.toString()) as Post;
    const [errorMessage, setErrorMessage] = useState(successUpdating === "true" ? "success" : "")

    const { DeleteModal, setDeleteModalVisible } = DeletePostModal(postObject, setErrorMessage)
    const { PinModal, setPinModalVisible } = PinPostModal(postObject, setErrorMessage)
    const { PublishModal, setPublishDraftModalVisible } = PublishPostModal(postObject, setErrorMessage)

    const [content, setContent] = useState("")

    useEffect(() => {
        async function formatContent() {
            const formattedContent = await formatPostContent(postObject.content)
            setContent(formattedContent)
        }
        formatContent()
    })

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.classList.add(`${styles.postContainer}`);
        }
    });

    const date = new Date(postObject.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()

    const publishButton = <DashboardButton
        title={postObject.published ? "Tornar Rascunho" : "Publicar Artigo"}
        iconSize={`medium`}
        Icon={postObject.published ? TurnDraftIcon : PublishDraftIcon}
        fontSize={`1.2rem`}
        color={`var(--primary-color-01)`}
        padding={`0.7rem 1.5rem`}
        onClick={() => setPublishDraftModalVisible(true)}
    />

    const pinButton = <DashboardButton
        title={postObject.pinned ? "Desfazer Fixação" : "Fixar Artigo"}
        Icon={postObject.pinned ? RemovePinIcon : PinIcon}
        iconSize={`medium`}
        fontSize={`1.2rem`}
        color={`var(--yellow)`}
        padding={`0.7rem 1.5rem`}
        onClick={() => setPinModalVisible(true)}
    />

    const editButton = <DashboardButton
        title={"Editar Artigo"}
        Icon={EditIcon}
        iconSize={`medium`}
        fontSize={`1.2rem`}
        color={`var(--light-blue)`}
        padding={`0.7rem 1.5rem`}
        onClick={() => router.push(`/dashboard/blog/post/edit?post=${post}`, `/dashboard/blog/post/edit`)}
    />

    const deleteButton = <DashboardButton
        title="Deletar Artigo"
        Icon={DeleteIcon}
        iconSize={`medium`}
        fontSize={`1.2rem`}
        color={`#D1351B`}
        padding={`0.7rem 1.5rem`}
        onClick={() => setDeleteModalVisible(true)}
    />

    function returnToHome() {
        router.push('/dashboard/blog?updatePosts=true')
    }

    return (
        <div className={`dashboard`}>
            <Head>
                <title>{postObject.title}</title>
            </Head>

            <Sidebar />

            <div style={{ paddingBottom: 0, height: "100%" }} className={dashboardStyles.content}>
                <DashboardHeader returnButton title='Blog' subDirectory="/ Visualizar" customDirectory={successUpdating && `/dashboard/blog?updatePosts=true`} />

                <div style={{ padding: `5rem` }} className={styles.postFrame}>
                    <header>
                        <h2 className={styles.title}>{postObject.title}</h2>
                        <div className={`${styles.holder} ${styles.subHeader}`}>
                            <div className={styles.holder}>
                                <CalendarIcon />
                                <p>{`${day}/${month}/${date.getUTCFullYear()}`}</p>
                            </div>
                            <span>•</span>
                            <div className={styles.holder}>
                                <img className={dashboardStyles.profileImage} src={postObject.redactor.image_url} alt="Imagem do perfil do usuário que postou o relatório" />
                                <p>redigido por <strong>{`${postObject.redactor.first_name} ${postObject.redactor.last_name}`}</strong></p>
                            </div>
                            <span>•</span>
                            <div className={styles.holder}>
                                {
                                    postObject.published ? <CloudIcon /> : <TurnDraftIcon />
                                }
                                <p>{postObject.published ? "publicado" : "rascunho"}</p>
                            </div>
                        </div>
                        <div className={`${styles.buttonsHolder}`}>
                            {
                                !postObject.published ?
                                    <>
                                        {publishButton}
                                        {editButton}
                                        {deleteButton}
                                    </>
                                    :
                                    <>
                                        {pinButton}
                                        {editButton}
                                        {deleteButton}
                                        {publishButton}
                                    </>
                            }
                        </div>
                    </header>

                    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: content }}>
                    </div>
                </div>
            </div>

            {DeleteModal}
            {PublishModal}
            {PinModal}

            <DashboardModal
                isVisible={errorMessage !== "" && !errorMessage.includes("!")}
                setIsVisible={() => setErrorMessage("")}
                color={`#E1DA2D`}
                Icon={ReportIcon}
                title={"Opa! Parece que algo deu errado."}
                description={<p>{errorMessage}</p>}
            />

            <DashboardModal
                isVisible={errorMessage !== "" && errorMessage.includes("!")}
                setIsVisible={() => setErrorMessage("")}
                color={`var(--primary-color-01)`}
                Icon={SuccessIcon}
                title={"Eba! Deu tudo certo!"}
                description={<p>{errorMessage}</p>}
                buttonText={"Ok"}
                suppressReturnButton
                actionFunction={returnToHome}
            />
        </div>
    );
}
