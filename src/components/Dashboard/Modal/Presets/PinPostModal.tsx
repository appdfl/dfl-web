import React, { useState, SetStateAction } from 'react';

import DashboardModal from '../';

import PinIcon from '@mui/icons-material/PushPinOutlined';
import RemovePinIcon from '@mui/icons-material/RemoveCircleOutline';

import { Post } from '../../../../@types/application';
import { api } from '../../../../utils/api';
import { getPostsData } from '../../../../utils/posts';

export default function PinPostModal(post: Post, setErrorMessage: (message: string) => SetStateAction<void>) {
    const [isPinModalVisible, setPinModalVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)

    async function pinPost() {
        try {
            const sendPost = await api.patch(`/post/${post.id}`, {
                pinned: !post.pinned,
            })
            const postResponseData = sendPost.data;
            if (postResponseData) {
                setPinModalVisible(false)
                setErrorMessage(postResponseData.pinned ? "O post foi fixado com sucesso!" : "O post foi removido dos fixados com sucesso!")
                setLoading(false)
                console.log("Estado 'fixado' do post alterada com sucesso!")
            }
            //router.push(`/dashboard/blog/post/preview?post=${JSON.stringify(postResponseData)}&successUpdating=true`)
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response.status === 401) {
                setErrorMessage("Houve um erro de autenticação ao tentar salvar o artigo. Por favor, tente logar novamente.")
            } else {
                setPinModalVisible(false)
                setErrorMessage("Houve um erro de servidor ao tentar salvar o artigo. Por favor, tente novamente.")
            }
            setPinModalVisible(false)
            setLoading(false)
        }
    }

    const checkIfHasPostPinned = async () => {
        setLoading(true)
        if (post.pinned) {
            // não é necessária verificação, o post já está fixado
            pinPost()
        } else {
            try {
                const pinnedPosts = await getPostsData(null, null, null, true)
                console.log(pinnedPosts)
                if (pinnedPosts.length > 0) {
                    console.log("Já existe um post fixado! Retornando...")
                    setPinModalVisible(false)
                    setLoading(false)
                    setErrorMessage(`Você só pode ter um post fixado.`)
                } else {
                    console.log("Não existe nenhum post fixado! Iniciando processo de fixação...")
                    pinPost()
                }
            } catch (error) {
                console.log(error)
                setPinModalVisible(false)
                setLoading(false)
                setErrorMessage(`Houve um erro de servidor ao tentar fixar o artigo. Por favor, tente novamente.`)
            }
        }
    }

    return {
        PinModal: post && <DashboardModal
            isVisible={isPinModalVisible}
            setIsVisible={() => setPinModalVisible(!isPinModalVisible)}
            color={`var(--yellow)`}
            Icon={post.pinned ? RemovePinIcon : PinIcon}
            isLoading={isLoading}
            title={post.pinned ? "Atenção! Você está prestes a desfazer a marcação deste artigo." : "Atenção! Você está prestes a fixar este artigo."}
            description={<p>{post.pinned ? `Ao fazer isso, este artigo perderá seu destaque do blog e do aplicativo.` : `Fixar um artigo torna-o destacado no blog, acima de todos os outros posts e em uma seção exclusiva do site.\n
        Use isso somente em tópicos de extrema importância ou assuntos relevantes para o momento.` }</p>}
            buttonText={post.pinned ? "Desfazer marcação" : "Fixar artigo"}
            actionFunction={checkIfHasPostPinned}
        />,
        setPinModalVisible: setPinModalVisible
    }
}