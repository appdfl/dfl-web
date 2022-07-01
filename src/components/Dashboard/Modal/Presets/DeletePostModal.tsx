import React, { useState, SetStateAction } from 'react';
import DashboardModal from '..';

import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { Post } from '../../../../@types/application';
import { api } from '../../../../utils/api';

export const deleteMessage = "O post foi excluído com sucesso!"

export default function DeletePostModal(post: Post, setErrorMessage: (message: string) => SetStateAction<void>) {
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)

    async function deletePost() {
        setLoading(true)
        try {
            const deletePost = await api.delete(`/post/${post.id}`)
            const postResponseData = deletePost.data;

            if (typeof postResponseData !== "object") {
                setDeleteModalVisible(false)
                setErrorMessage(deleteMessage)
            }
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response.status === 401) {
                setErrorMessage("Houve um erro de autenticação ao tentar deletar o artigo. Por favor, tente logar novamente.")
            } else {
                setDeleteModalVisible(false)
                setErrorMessage("Houve um erro de servidor ao tentar deletar o artigo. Por favor, tente novamente. Caso o problema persista, entre em contato com o suporte.")
            }
        }
        setLoading(false)
    }

    return {
        DeleteModal: <DashboardModal
            isVisible={isDeleteModalVisible}
            setIsVisible={setDeleteModalVisible}
            color={`#D1351B`}
            Icon={DeleteIcon}
            title={"Você está prestes a deletar esse artigo."}
            description={<p>Ao deletar um artigo, ele deixará de ser visível a todos os usuários e a você. Pense bem antes de fazer isso.</p>}
            buttonText="Deletar"
            actionFunction={deletePost}
            isLoading={isLoading}
        />,
        setDeleteModalVisible: setDeleteModalVisible
    }
}