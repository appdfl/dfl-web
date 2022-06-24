import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AddIcon from '@mui/icons-material/Add';
import styles from "/src/styles/dashboard/authentication.module.css";

import { useEffect, useState } from 'react';

import AuthenticationHeader from '../../../components/Dashboard/Authentication/Header';
import AuthenticationForm from '../../../components/Dashboard/Authentication/Form';
import AuthenticationButton from '../../../components/Dashboard/Authentication/Button';

import { api } from '../../../utils/api';
import { useAuthContext } from '../../../context/AuthContext';

import { Admin } from '../../../@types/application';

export function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true
    } else return false;
}

export default function DashboardLogin() {
    const router = useRouter();
    const { authenticateAdmin, token } = useAuthContext();

    const [rememberLogin, setRememberLogin] = useState(false)
    const [email, setEmail] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const [accountToCheck, setAccountToCheck] = useState<Admin>(null)
    const checkAccount = async () => {
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
            if (adminResponseData) {
                setAccountToCheck(adminResponseData)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error !== undefined && error.response.status === 400) {
                setErrorMessage("Nenhum administrador foi encontrado com o e-mail fornecido.")
            } else {
                return setErrorMessage(`Houve um erro ao tentar logar no servidor. Tente novamente mais tarde.`)
            }
        }
    }

    async function login() {
        setErrorMessage("")
        setLoading(true)

        console.log(email, rememberLogin)
        const authenticatedAdmin = await authenticateAdmin(email, null, null, null, rememberLogin)
        if (!authenticatedAdmin) {
            setLoading(false)
            setErrorMessage("Opa! Algo deu errado :(")
        }
    }

    useEffect(() => {
        if (token) {
            router.push(`/dashboard`)
        }
    }, [token])

    const loginFrame = <div className={styles.mainContainerContent}>
        <h2 className={styles.title}>Faça login em sua conta.</h2>
        <AuthenticationForm title="E-mail" handleChange={(event) => setEmail(event.target.value)} value={email} />
        <div onClick={() => setRememberLogin(!rememberLogin)} className={styles.click} style={{ display: "flex", flexDirection: "row", gap: `1.5rem` }}>
            <input type="checkbox" name="rememberLogin" id="" readOnly checked={rememberLogin} />
            Lembrar de mim
        </div>
        <AuthenticationButton isLoading={loading} disabled={email === ""} title={`CONTINUAR`} onClick={checkAccount} />
        {
            errorMessage !== "" &&
            <p style={{ color: "red" }}>{errorMessage} </p>
        }
    </div>

    const accountToCheckFrame = accountToCheck !== null &&
        <div className={styles.mainContainerContent}>
            <h2 className={styles.title}>Esta é a sua conta?</h2>
            <div>
                <img className={styles.image} src={accountToCheck.image_url !== "" ? accountToCheck.image_url : "https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg"} alt="admin image" />
                <h3>{`${accountToCheck.first_name} ${accountToCheck.last_name}`}</h3>
            </div>
            <AuthenticationButton isLoading={loading} title={`ENTRAR`} onClick={login} />
            <p className={styles.click} onClick={() => setAccountToCheck(null)}>Não, esse não sou eu. Entrar com outra conta.</p>
        </div>

    // Colocar todos os outros states antes desse:
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
        if (token) {
            router.push(`/dashboard`)
        }
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div >
            <Head>
                <title>Login | Dashboard</title>
            </Head>

            <div className={styles.authenticationContent}>
                <AuthenticationHeader />

                <div className={styles.mainContainer}>
                    {
                        accountToCheck ?
                            accountToCheckFrame
                            : loginFrame
                    }
                </div>

                <Link href={`/dashboard/authentication/register`}>
                    <div className={styles.footer}>
                        <AddIcon />
                        Criar conta
                    </div>
                </Link>
            </div>
        </div >
    );
}