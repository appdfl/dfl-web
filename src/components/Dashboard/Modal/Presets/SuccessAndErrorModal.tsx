import React, { useState, SetStateAction } from 'react';

import ReportIcon from '@mui/icons-material/ReportOutlined';
import SuccessIcon from '@mui/icons-material/CheckCircleOutlined';

import DashboardModal from '..';
import { deleteMessage } from './DeletePostModal';
import { useRouter } from 'next/router';

export default function SuccessAndErrorModal(actionFunction?: () => void) {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("")

    const backToPosts = () => router.push('/dashboard/blog?updatePosts=true')
    const defaultFunction = () => { setErrorMessage("") }

    return {
        ErrorModal: <DashboardModal
            isVisible={errorMessage !== "" && !errorMessage.includes("!")}
            setIsVisible={() => setErrorMessage("")}
            color={`#E1DA2D`}
            Icon={ReportIcon}
            title={"Opa! Parece que algo deu errado."}
            description={<p>{errorMessage}</p>}
        />,
        SuccessModal: <DashboardModal
            isVisible={errorMessage !== "" && errorMessage.includes("!")}
            setIsVisible={() => setErrorMessage("")}
            color={`var(--primary-color-01)`}
            Icon={SuccessIcon}
            title={"Eba! Deu tudo certo!"}
            description={<p>{errorMessage}</p>}
            buttonText={"Ok"}
            suppressReturnButton
            actionFunction={actionFunction ? actionFunction :
                errorMessage === deleteMessage ? backToPosts : defaultFunction}
        />,
        setErrorOrSuccessMessage: setErrorMessage,
    }
}