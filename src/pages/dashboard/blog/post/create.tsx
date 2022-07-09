import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Post } from "../../../../@types/application";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"
import styles from "/src/styles/dashboard/post.module.css"

import Sidebar from "../../../../components/Dashboard/Menu";
import DashboardHeader from "../../../../components/Dashboard/Header";
import DashboardButton from "../../../../components/Dashboard/Button";

import SaveIcon from '@mui/icons-material/SaveOutlined';

import { CategoryOutlined, NewspaperOutlined, PhoneAndroidOutlined, ErrorOutlineOutlined, ForumOutlined } from "@mui/icons-material";
const categoryIcons = {
    "Novidade": NewspaperOutlined, // news
    "Tecnologia": PhoneAndroidOutlined, //tech
    "Aviso": ErrorOutlineOutlined, // warning
    "Discussão": ForumOutlined, // discussion
}

import SuccessIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PreviewIcon from '@mui/icons-material/VisibilityOutlined';
import DisablePreviewIcon from '@mui/icons-material/VisibilityOffOutlined';

import DashboardModal from "../../../../components/Dashboard/Modal";
import { api } from "../../../../utils/api";
import { formatPostContent } from "../../../../utils/posts";
import { useAuthContext } from "../../../../context/AuthContext";

import SuccessAndErrorModal from "../../../../components/Dashboard/Modal/Presets/SuccessAndErrorModal";

import { AnimatePresence, motion } from "framer-motion";
import NavLink from "../../../../components/Dashboard/NavLink";

export default function CreatePost() {
    const router = useRouter()
    const { admin } = useAuthContext();

    if (!admin) return <div></div>

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

    const { SuccessModal, ErrorModal, setErrorOrSuccessMessage } = SuccessAndErrorModal(() => router.push('/dashboard/blog?updatePosts=true'))

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [categoryPopoutOpen, setCategoryPopoutOpen] = useState(false)
    const [category, setCategory] = useState("")

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

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.classList.add(`${styles.postContainer}`);
        }
    });

    async function uploadDraft() {
        setLoading(true)
        try {
            const sendPost = await api.post(`/post`, {
                title: title,
                content: content,
                category: category,
                redactor_id: admin.id,
            })
            const postResponseData = sendPost.data;
            console.log(postResponseData, "Post criado com sucesso!")
            if (postResponseData && postResponseData.title) {
                setErrorOrSuccessMessage("O post foi criado com sucesso! Agora o rascunho está visível na seção 'Meus Posts'.")
                setLoading(false)
            } else {
                setErrorOrSuccessMessage("Houve um erro ao tentar salvar o artigo. Por favor, tente novamente.")
            }
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response.status === 401) {
                setErrorOrSuccessMessage("Houve um erro de autenticação ao tentar salvar o artigo. Por favor, tente logar novamente. Caso o problema persista, entre em contato com o suporte.")
            } else {
                setErrorOrSuccessMessage("Houve um erro de servidor ao tentar salvar o artigo. Por favor, tente novamente, ou, caso o problema persista, entre em contato com o suporte.")
            }
        }
    }

    return (
        <div className={`dashboard`}>
            <Head>
                <title>Criar artigo</title>
            </Head>

            <Sidebar />

            <div style={{ paddingBottom: 0, height: "100vh" }} className={dashboardStyles.content}>
                <DashboardHeader returnButton title='Blog' subDirectory="/ Criar" />

                <div id="postCreateContainer" className={styles.postFrame}>
                    <header>
                        <input onChange={(event) => setTitle(event.target.value)} className={`${styles.title} ${styles.titleInput}`} type="text" placeholder="Insira um título único para o artigo." />
                        <div className={`${styles.buttonsHolder}`}>
                            <DashboardButton
                                title="Salvar Rascunho"
                                Icon={SaveIcon}
                                iconSize={`medium`}
                                fontSize={`1.2rem`}
                                color={`#1F7EEE`}
                                isLoading={loading}
                                padding={`0.7rem 1.5rem`}
                                onClick={checkInputs}
                            />

                            <DashboardButton
                                title="Descartar Rascunho"
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

                            <DashboardButton
                                title={category !== "" ? `Categoria: ${category}` : "Selecionar Categoria"}
                                Icon={category !== "" ? categoryIcons[category] : CategoryOutlined}
                                iconSize={`medium`}
                                fontSize={`1.2rem`}
                                color={`#BF09B8`}
                                selected={category !== ""}
                                padding={`0.7rem 1.5rem`}
                                onClick={() => setCategoryPopoutOpen(!categoryPopoutOpen)}
                            />
                            {
                                categoryPopoutOpen &&
                                <AnimatePresence>
                                    <motion.div
                                        /* className={styles.popoutWrap} */
                                        initial={"closed"}
                                        animate={"open"}
                                        exit={"closed"}
                                        key={"reports"}
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { ease: "easeOut", duration: 0.45 }
                                            },
                                            closed: {
                                                y: -35,
                                                opacity: 0
                                            },
                                            exit: {
                                                y: -35,
                                                opacity: 0
                                            }
                                        }}
                                    >
                                        <div className={styles.categoryPopoutContainer}>
                                            <div style={{ backgroundColor: "var(--background-01)" }} className={styles.line}></div>
                                            <ul className={styles.categoryButtons}>
                                                <NavLink
                                                    title='Novidade'
                                                    Icon={NewspaperOutlined}
                                                    iconGap={`1rem`}
                                                    accentColor={`var(--pink)`}
                                                    onClick={() => {
                                                        setCategory("Novidade")
                                                        setCategoryPopoutOpen(!categoryPopoutOpen)
                                                    }}
                                                    upperCase
                                                />
                                                <NavLink
                                                    title='Tecnologia'
                                                    Icon={PhoneAndroidOutlined}
                                                    iconGap={`1rem`}
                                                    accentColor={`var(--pink)`}
                                                    onClick={() => {
                                                        setCategory("Tecnologia")
                                                        setCategoryPopoutOpen(!categoryPopoutOpen)
                                                    }}
                                                    upperCase
                                                />
                                                <NavLink
                                                    title='Aviso'
                                                    Icon={ErrorOutlineOutlined}
                                                    iconGap={`1rem`}
                                                    accentColor={`var(--pink)`}
                                                    onClick={() => {
                                                        setCategory("Aviso")
                                                        setCategoryPopoutOpen(!categoryPopoutOpen)
                                                    }}
                                                    upperCase
                                                />
                                                <NavLink
                                                    title='Discussão'
                                                    Icon={ForumOutlined}
                                                    iconGap={`1rem`}
                                                    accentColor={`var(--pink)`}
                                                    onClick={() => {
                                                        setCategory("Discussão")
                                                        setCategoryPopoutOpen(!categoryPopoutOpen)
                                                    }}
                                                    upperCase
                                                />
                                                <p>Cuidado! Não será possível alterar a categoria após salvar o rascunho!</p>
                                            </ul>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            }
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

            <DashboardModal
                isVisible={isDeleteModalVisible}
                setIsVisible={() => setDeleteModalVisible(!isDeleteModalVisible)}
                color={`#D1351B`}
                Icon={DeleteIcon}
                title={"Você está prestes a deletar esse artigo."}
                description={<p>Ao deletar um artigo, não há mais volta. Pense bem antes de fazer isso.</p>}
                buttonText="Deletar"
            />



            {ErrorModal}
            {SuccessModal}
        </div>
    );
}
