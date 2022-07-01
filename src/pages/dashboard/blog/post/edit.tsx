import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Post } from "../../../../@types/application";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"
import styles from "/src/styles/dashboard/post.module.css"

import Sidebar from "../../../../components/Dashboard/Sidebar";
import DashboardHeader from "../../../../components/Dashboard/Header";
import DashboardButton from "../../../../components/Dashboard/Button";

import SaveIcon from '@mui/icons-material/SaveOutlined';

import SuccessIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PreviewIcon from '@mui/icons-material/VisibilityOutlined';
import DisablePreviewIcon from '@mui/icons-material/VisibilityOffOutlined';

import TurnDraftIcon from '@mui/icons-material/FileDownloadOffOutlined';

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloudIcon from '@mui/icons-material/CloudOutlined';

import DashboardModal from "../../../../components/Dashboard/Modal";
import { api } from "../../../../utils/api";
import { formatPostContent } from "../../../../utils/posts";
import SuccessAndErrorModal from "../../../../components/Dashboard/Modal/Presets/SuccessAndErrorModal";

export default function EditPost() {
    const router = useRouter()
    const { post } = router.query

    if (post === undefined) {
        router.push('/dashboard/blog')
    }

    if (post === undefined) return <div></div>;

    const postParsed = JSON.parse(post.toString()) as Post;
    const [postObject, setPostObject] = useState(postParsed);

    const [title, setTitle] = useState(postObject.title)
    const [content, setContent] = useState(postObject.content)

    const [convertedContent, setConvertedContent] = useState("")

    const [previewMode, setPreviewMode] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleTextChange(text) {
        setContent(text)

        const element = document.getElementById("postCreateContainer")
        console.log("Atualizando o tamanho do textarea")
        element.style.height = "1px";
        element.style.height = (3 + element.scrollHeight) + "px";
    }

    const checkInputs = async () => {
        setLoading(true)

        if (title.length < 3) {
            console.log(title.length, title)
            setLoading(false)
            return setErrorOrSuccessMessage("O título deve ter no mínimo 3 caracteres.")
        }

        if (content.length < 20) {
            console.log(title.length, title)
            setLoading(false)
            return setErrorOrSuccessMessage("O conteúdo do artigo deve ter no mínimo 20 caracteres.")
        }

        uploadDraft()
    }

    async function toggleVisualizeMode() {
        const formattedPost = await formatPostContent(content)
        setConvertedContent(formattedPost)
        setPreviewMode(!previewMode)
    }

    const { SuccessModal, ErrorModal, setErrorOrSuccessMessage } = SuccessAndErrorModal()

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.classList.add(`${styles.postContainer}`);
        }
    });

    const date = new Date(postObject.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()

    async function uploadDraft() {
        setLoading(true)
        try {
            const updatePost = await api.patch(`/post/${postObject.id}`, {
                content: content,
                title: title
            })
            const postResponseData = updatePost.data as Post;
            if (postResponseData) {
                console.log("Conteúdo do post editado com sucesso!")

                setPostObject(postResponseData)
                setErrorOrSuccessMessage("O artigo foi editado com sucesso!")
                setLoading(false)
            }
            //router.push(`/dashboard/blog/post/preview?post=${JSON.stringify(postResponseData)}&successUpdating=true`)
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response.status === 401) {
                setErrorOrSuccessMessage("Desculpe. Suas alterações não foram salvas. O servidor não identificou sua permissão para fazer isso.")
            } else {
                setErrorOrSuccessMessage("Houve um erro de servidor ao tentar salvar o artigo. Por favor, tente novamente.")
            }
            setLoading(false)
        }
    }

    return (
        <div className={`dashboard`}>
            <Head>
                <title>Editar artigo</title>
            </Head>

            <Sidebar />

            <div style={{ paddingBottom: 0, height: "100vh" }} className={dashboardStyles.content}>
                <DashboardHeader returnButton title='Blog' subDirectory="/ Editar" />

                <div id="postCreateContainer" className={styles.postFrame}>
                    <header>
                        <input value={title} onChange={(event) => setTitle(event.target.value)} className={`${styles.title} ${styles.titleInput}`} type="text" placeholder="Insira um título único para o artigo." />
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
                            <DashboardButton
                                title="Salvar Alterações"
                                Icon={SaveIcon}
                                iconSize={`medium`}
                                fontSize={`1.2rem`}
                                color={`#1F7EEE`}
                                isLoading={loading}
                                disabled={title === postObject.title && content === postObject.content}
                                padding={`0.7rem 1.5rem`}
                                onClick={checkInputs}
                            />

                            <DashboardButton
                                title="Descartar Alterações"
                                Icon={DeleteIcon}
                                iconSize={`medium`}
                                fontSize={`1.2rem`}
                                color={`#D1351B`}
                                padding={`0.7rem 1.5rem`}
                                onClick={() => { router.back() }}
                            />

                            <DashboardButton
                                title="Visualização Markdown"
                                Icon={previewMode ? DisablePreviewIcon : PreviewIcon}
                                iconSize={`medium`}
                                fontSize={`1.2rem`}
                                color={`#E1DA2D`}
                                padding={`0.7rem 1.5rem`}
                                onClick={toggleVisualizeMode}
                            />
                        </div>
                    </header>

                    {
                        previewMode ?
                            <div ref={containerRef} dangerouslySetInnerHTML={{ __html: convertedContent }}>
                            </div>
                            :
                            <textarea onChange={(event) => handleTextChange(event.target.value)} value={content} className={styles.contentInput} placeholder={`Digite aqui o artigo no formato markdown...`} />
                    }
                </div>
            </div>

            {SuccessModal}
            {ErrorModal}
        </div>
    );
}
