import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ReturnIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import styles from "/src/styles/dashboard/authentication.module.css";

import { useEffect, useState } from 'react';

import AuthenticationHeader from '../../../components/Dashboard/Authentication/Header';
import AuthenticationForm from '../../../components/Dashboard/Authentication/Form';
import AuthenticationButton from '../../../components/Dashboard/Authentication/Button';

import { useAuthContext } from '../../../context/AuthContext';
import { api } from '../../../utils/api';

import { isEmailValid } from './login';
import { resizeImage } from '../../../utils/resizeImage';

export default function DashboardRegister() {
    const router = useRouter();
    const { authenticateAdmin, token } = useAuthContext();

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [imageUrl, setImageUrl] = useState(null)

    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const changeImage = () => {
        const input = document.querySelector('input[type=file]') as HTMLInputElement;
        const file = input.files[0];

        const reader = new FileReader();
        if (file) {
            console.log("Lendo imagem enviada pelo usuário.")
            reader.readAsArrayBuffer(file);
        }

        reader.onloadend = function (event) {
            const blob = new Blob([event.target.result])
            const blobURL = window.URL.createObjectURL(blob);

            resizeImage(blobURL, setImageUrl)
        }
    }

    const checkIfAccountAlreadyExists = async () => {
        setErrorMessage("")
        setLoading(true)

        if (isEmailValid(email) === false) {
            setLoading(false)
            return setErrorMessage("Por favor insira um e-mail válido.")
        }

        try {
            const adminResponse = await api.post(`/admin`, {
                email: email
            })
            const adminResponseData = adminResponse.data;
            console.log(adminResponseData)
            if (adminResponseData) {
                setErrorMessage("Já existe uma conta de administrador cadastrada com o e-mail fornecido!")
            } else {
                setImageUrl("")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return setErrorMessage(`Houve um erro ao tentar conectar-se com o servidor. Tente novamente mais tarde.`)

        }
    }

    async function registerAccount() {
        setLoading(true)
        const createdAccount = await authenticateAdmin(email, name, lastName, imageUrl)

        setLoading(false)
        if (!createdAccount) {
            return setErrorMessage(`Não foi possível criar a conta. Desculpa :(`)
        }
    }

    const enterOnDashboard = () => {
        console.log(`O coletor criou uma conta e agora está logado.`)
        router.push({
            pathname: '/dashboard',
        });
    }

    useEffect(() => {
        if (token) {
            setErrorMessage("success")
        }
    }, [token])

    const hasImage = imageUrl !== null && imageUrl !== "" ? true : false

    const registerFrame = <div className={styles.mainContainerContent}>
        <h2 className={styles.title}>Crie uma conta de coletor.</h2>
        <AuthenticationForm
            title="E-mail"
            handleChange={(event) => setEmail(event.target.value)}
            value={email}
        />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", width: "100%" }}>
            <AuthenticationForm
                type={`text`}
                title="Nome"
                handleChange={(event) => { setName(event.target.value) }}
                value={name}
            />
            <AuthenticationForm
                type={`text`}
                title="Sobrenome"
                handleChange={(event) => { setLastName(event.target.value) }}
                value={lastName}
            />
        </div>
        <AuthenticationButton
            disabled={email === "" || name === "" || lastName === ""}
            title={`CONTINUAR`}
            isLoading={loading}
            onClick={checkIfAccountAlreadyExists}
        />
        {
            errorMessage !== "" &&
            <p style={{ color: "red" }}>{errorMessage} </p>
        }
    </div>

    const pickupImageFrame = <div className={styles.mainContainerContent}>
        <h2 className={styles.title}>Escolha uma imagem de perfil.</h2>
        <img className={`${styles.image}`} src={hasImage ? imageUrl : "https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg"} alt="profile image" />
        <input type="file" onChange={changeImage} />
        <AuthenticationButton isLoading={loading} disabled={!hasImage} title={`CRIAR CONTA`} onClick={registerAccount} />
        {
            errorMessage !== "" &&
            <p style={{ color: "red" }}>{errorMessage} </p>
        }
    </div>

    const registeredAccount = <div className={styles.mainContainerContent}>
        <h2 className={styles.title}>Parabéns! Sua conta foi criada com sucesso!</h2>
        <div>
            <img className={styles.image} src={imageUrl} alt="admin image" />
            <h3>{`${name} ${lastName}`}</h3>
        </div>
        <AuthenticationButton isLoading={loading} title={`ENTRAR`} onClick={enterOnDashboard} />
    </div>

    // Colocar todos os outros states antes desse:
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div >
            <Head>
                <title>Register | Dashboard</title>
            </Head>

            <div className={styles.authenticationContent}>
                <AuthenticationHeader />

                <div className={styles.mainContainer}>
                    {
                        errorMessage === "success" ?
                            registeredAccount
                            :
                            imageUrl === null ?
                                registerFrame
                                : pickupImageFrame
                    }
                </div>

                {
                    imageUrl !== null ?
                        <div onClick={() => {
                            setImageUrl(null)
                            setErrorMessage("")
                        }} className={styles.footer}>
                            <ReturnIcon />
                            Voltar para o início do registro
                        </div>
                        :
                        <Link href={`/dashboard/authentication/login`}>
                            <div className={styles.footer}>
                                <ReturnIcon />
                                Voltar para o login
                            </div>
                        </Link>
                }
            </div>
        </div>
    );
}