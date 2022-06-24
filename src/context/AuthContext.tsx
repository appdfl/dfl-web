import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Admin } from '../@types/application';
import { api } from '../utils/api';

type AuthType = {
    email: string;
    firstName?: string;
    lastName?: string;
    image_url?: string;
    rememberLogin?: boolean;
}

type ContextTypes = {
    admin: Admin,
    retrieveLogin: () => void;
    logoutAdmin: () => void;
    authenticateAdmin: (email: string, firstName?: string, lastName?: string, image_url?: string, rememberLogin?: boolean) => any;
    token: string;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthResponse = {
    token: string;
    admin: Admin;
}

export const AuthContext = createContext({} as ContextTypes)

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [admin, setAdmin] = useState<Admin>(null);
    const [token, setToken] = useState("")

    async function authenticateAdmin(email: string, firstName: string, lastName: string, image_url: string, rememberLogin?: boolean) {
        console.log(email, rememberLogin, image_url)
        try {
            const authResponse = await api.post("/authenticate/admin", {
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: "colector",
                image_url: image_url
            }, {
                auth: {
                    username: process.env.NEXT_PUBLIC_USERNAME,
                    password: process.env.NEXT_PUBLIC_PASSWORD
                }
            })
            const authResponseData = authResponse.data as AuthResponse;

            const responseUser = authResponseData.admin
            const responseToken = authResponseData.token

            if (responseToken && responseUser) {
                sessionStorage.setItem('admin', JSON.stringify(responseUser));
                await sessionStorage.setItem('token', responseToken);
                setAdmin(responseUser);
                setToken(responseToken)

                console.log("Dados obtidos com sucesso!", authResponseData)
                api.defaults.headers.common['Authorization'] = `Bearer ${responseToken}`;

                console.log(rememberLogin)
                if (rememberLogin === true) {
                    console.log("Salvando dados no local storage.")
                    localStorage.setItem('admin', JSON.stringify(responseUser));
                    localStorage.setItem('token', responseToken);
                }
                return admin
            } else {
                console.log(authResponseData)
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async function retrieveLogin() {
        const adminObject = JSON.parse(localStorage.getItem("admin"))
        const tokenObject = localStorage.getItem("token")

        console.log("Verificando se há login salvo.")

        if (adminObject && tokenObject) {
            sessionStorage.setItem('admin', adminObject);
            sessionStorage.setItem('token', tokenObject);
            setAdmin(adminObject);
            setToken(tokenObject)

            api.defaults.headers.common['Authorization'] = `Bearer ${tokenObject}`;

            console.log("Login obtido do local storage com sucesso!")
        } else {
            const unparsedAdmin = sessionStorage.getItem("admin")
            const adminObject = JSON.parse(unparsedAdmin)
            console.log("indo aqui", adminObject)
            const tokenObject = sessionStorage.getItem("token")

            if (adminObject && tokenObject) {
                sessionStorage.setItem('admin', unparsedAdmin);
                sessionStorage.setItem('token', tokenObject);
                setAdmin(adminObject);
                setToken(tokenObject)

                api.defaults.headers.common['Authorization'] = `Bearer ${tokenObject}`;

                console.log("Login obtido do session storage com sucesso!")
            }
        }
    }

    useEffect(() => {
        retrieveLogin()
    }, [])

    async function logoutAdmin() {
        localStorage.removeItem("admin")
        localStorage.removeItem("token")

        sessionStorage.removeItem("admin")
        sessionStorage.removeItem("token")

        setAdmin(null)
        setToken(null)
        router.push(`/dashboard/authentication/login`)
    }

    const sharedState = {
        authenticateAdmin,
        retrieveLogin,
        logoutAdmin,
        admin,
        token,
    };

    return (
        <AuthContext.Provider value={sharedState}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}