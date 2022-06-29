import { AppProps } from 'next/app';
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


export default function App({ Component, pageProps, router }) {
    return (
        <AuthProvider>
            <RouteGuard>
                <ThemeProvider defaultTheme='light'>
                    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete} >
                        <Component {...pageProps} key={router.route} />
                    </AnimatePresence>
                </ThemeProvider>
            </RouteGuard>
        </AuthProvider>
    )
}