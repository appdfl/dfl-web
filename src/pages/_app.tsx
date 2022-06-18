import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'

import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return <ThemeProvider defaultTheme="system" forcedTheme={Component.theme || null}>
        <Component {...pageProps} />
    </ThemeProvider>
}