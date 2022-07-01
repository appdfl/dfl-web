import React, { useState, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import DashboardModal from '../';

import TurnDraft from '@mui/icons-material/FileDownloadOffOutlined';
import PublishDraft from "@mui/icons-material/FileUploadOutlined"

import { Post } from '../../../../@types/application';
import { api } from '../../../../utils/api';

export const publishedMessage = "O artigo foi publicado com sucesso!"
export const turnedDraftMessage = "O artigo tornou-se um rascunho com sucesso!"

export default function PublishPostModal(post: Post, setErrorMessage: (message: string) => SetStateAction<void>, setReportObject?: (object: Post) => SetStateAction<void>) {
    const [isToggleDraftModalVisible, setToggleDraftModalVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)

    async function togglePostVisibility() {
        setLoading(true)
        try {
            const sendPost = await api.patch(`/post/${post.id}`, {
                published: !post.published,
                pinned: !post.published && false
            })
            const postResponseData = sendPost.data as Post;
            if (postResponseData) {
                console.log("Visibilidade do post alterada com sucesso!")
                setToggleDraftModalVisible(false)

                if (setReportObject) {
                    setReportObject(postResponseData)
                }
                setErrorMessage(postResponseData.published ? publishedMessage : turnedDraftMessage)
                setLoading(false)
            }
            //router.push(`/dashboard/blog/post/preview?post=${JSON.stringify(postResponseData)}&successUpdating=true`)
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response.status === 401) {
                setErrorMessage("Houve um erro de autenticação ao tentar salvar o artigo. Por favor, tente logar novamente.")
            } else {
                setToggleDraftModalVisible(false)
                setErrorMessage("Houve um erro de servidor ao tentar salvar o artigo. Por favor, tente novamente.")
            }
            setToggleDraftModalVisible(false)
            setLoading(false)
        }
    }

    return {
        PublishModal: post && <DashboardModal
            isVisible={isToggleDraftModalVisible}
            setIsVisible={() => setToggleDraftModalVisible(!isToggleDraftModalVisible)}
            color={`var(--primary-color-01)`}
            Icon={post.published ? TurnDraft : PublishDraft}
            title={post.published ? "Atenção! Você está prestes a tornar esse artigo um rascunho." : "Atenção! Você está prestes a publicar esse artigo."}
            description={post.published ? "Ao tornar um artigo um rascunho, ele não ficará visível no blog, nem poderá ser visualizado pelos usuários." : "Ao publicar um artigo, ele ficará visível no blog e poderá ser visualizado pelos usuários."}
            buttonText={post.published ? "Tornar Rascunho" : "Publicar"}
            actionFunction={togglePostVisibility}
            isLoading={isLoading}
        />,
        setPublishDraftModalVisible: setToggleDraftModalVisible
    }
}