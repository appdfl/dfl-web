import { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

import { ThemeProvider } from 'next-themes'

import '../styles/global.css';

import { AuthProvider } from '../context/AuthContext';
import { RouteGuard } from '../components/RouteGuard';

import { AnimatePresence } from "framer-motion";

function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 })
    }
}

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
    return (
        <AuthProvider>
            <RouteGuard>
                <ThemeProvider defaultTheme='light'>
                    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete} >
                        <Layout Component={Component} pageProps={pageProps} key={router.route} />
                    </AnimatePresence>
                </ThemeProvider>
            </RouteGuard>
        </AuthProvider>
    )
}

const Layout = ({ Component, pageProps }) => {
    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />);
    } else {
        return <Component {...pageProps} />;
    }
};