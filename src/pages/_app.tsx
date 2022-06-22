import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'

import '../styles/global.css';

import { AuthProvider } from '../context/AuthContext';
import { RouteGuard } from '../components/RouteGuard';

import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {
    return (
        <AuthProvider>
            <RouteGuard>
                <ThemeProvider defaultTheme='light'>
                    {/* <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => window.scrollTo(0, 0)}> */}
                    <Component {...pageProps} key={router.asPath} />
                    {/* </AnimatePresence> */}
                </ThemeProvider>
            </RouteGuard>
        </AuthProvider>
    )
}