import NavContextProvider from '@/context/NavContext';
import StateContextProvider from '@/context/StateContext';
import { theme } from '@/theme';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { appWithTranslation } from 'i18next-ssg';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import nextI18nConfig from '../../next-i18next.config';

function App({ Component, pageProps }: AppProps) {
    const { query } = useRouter();

    useEffect(() => {
        if (query?.locale) {
            document.documentElement.lang = query.locale as string;
        }
    }, [query]);

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <CssBaseline />
            <NavContextProvider>
                <StateContextProvider>
                    <Component {...pageProps} />
                </StateContextProvider>
            </NavContextProvider>
        </ThemeProvider>
    );
}

export default appWithTranslation(App, nextI18nConfig);
