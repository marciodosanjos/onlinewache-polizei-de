import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import LanguageIcon from '@mui/icons-material/Language';
import {
    AppBar,
    Box,
    Button,
    Container,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import { setUserLocale } from 'i18next-ssg';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const language = router.query.locale;
    const { t } = useReloadedTranslation('common');

    const getHref = (locale: string) => {
        const path = router.asPath;

        if (typeof router.query?.locale === 'string') {
            return path.replace(router.query.locale, locale);
        }

        return `/${locale}`;
    };

    return (
        <AppBar position="static" role="navigation">
            {/* Toolbar Language */}
            <Toolbar
                variant="dense"
                sx={{
                    backgroundColor: 'primary.contrastText',
                }}
            >
                <Container
                    fixed
                    sx={{
                        paddingRight: {
                            xs: 0,
                            sm: 3,
                            md: 3,
                            lg: 3,
                            xl: 3,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: {
                                xs: 'flex-end',
                                sm: 'flex-end',
                                md: 'flex-end',
                                lg: 'flex-end',
                            },
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {/* Easy Language
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Box>
                                <MenuBookIcon
                                    style={{
                                        color: '#00468c',
                                        fontSize: '20px',
                                        marginRight: 5,
                                    }}
                                />
                            </Box>

                            <Box>
                                <Button
                                    href={getHref('simpleDe')}
                                    size="small"
                                    onClick={() => {
                                        setUserLocale('simpleDe');
                                    }}
                                    style={{
                                        color:
                                            language === 'simpleDe'
                                                ? 'white'
                                                : '#00468c',

                                        backgroundColor:
                                            language === 'simpleDe'
                                                ? '#121212'
                                                : 'white',
                                        borderRadius: 1,
                                        fontSize: '12px',
                                    }}
                                >
                                    Leichte Sprache
                                </Button>
                            </Box>
                        </Box> */}
                        {/* German and Englisch */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <LanguageIcon
                                style={{
                                    color: '#00468c',
                                    fontSize: '20px',
                                    marginRight: 5,
                                }}
                            />

                            <Box>
                                {/* Button German */}
                                <Button
                                    href={getHref('de')}
                                    size="small"
                                    disabled
                                    onClick={() => {
                                        setUserLocale('de');
                                    }}
                                    style={{
                                        color:
                                            language === 'de'
                                                ? 'white'
                                                : '#00468c',

                                        backgroundColor:
                                            language === 'de'
                                                ? '#121212'
                                                : 'white',
                                        borderRadius: 1,
                                        fontSize: '12px',
                                    }}
                                >
                                    Deutsch
                                </Button>

                                {/* <Button
                                    href={getHref('en')}
                                    size="small"
                                    onClick={() => {
                                        setUserLocale('en');
                                    }}
                                    style={{
                                        color:
                                            language === 'en'
                                                ? 'white'
                                                : '#00468c',

                                        backgroundColor:
                                            language === 'en'
                                                ? '#121212'
                                                : 'white',
                                        borderRadius: 1,
                                        fontSize: '12px',
                                    }}
                                >
                                    Englisch
                                </Button> */}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>

            {/* Toolbar Polizei Onlinewache */}
            <Toolbar
                variant="dense"
                sx={{
                    backgroundColor: 'primary.dark',
                    paddingY: '10px',
                    minHeight: 0,
                    paddingX: 0,
                }}
            >
                <Container
                    fixed
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingY: 0,
                    }}
                >
                    <Link href="/" title={t('titleLinkLogoNavBarHomePage')}>
                        <Box
                            sx={{
                                textDecoration: 'none',
                                display: 'flex',
                                direction: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: {
                                        xs: '30px',
                                        sm: '30px',
                                        md: '40px',
                                        lg: '40px',
                                        xl: '40px',
                                    },
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                    // border: '1px solid',
                                    lineHeight: '0.8',
                                    marginY: 0,
                                }}
                                color="primary.contrastText"

                                // fontFamily="Arial"
                            >
                                Polizei
                            </Typography>

                            <Typography
                                component="span"
                                color="primary.contrastText"
                                sx={{
                                    marginLeft: {
                                        xs: '10px',
                                        sm: '20px',
                                        md: '15px',
                                        lg: '20px',
                                        xl: '20px',
                                    },

                                    fontSize: {
                                        xs: '20px',
                                        sm: '25px',
                                        md: '25px',
                                        lg: '28px',
                                        xl: '28px',
                                    },
                                    textTransform: 'uppercase',
                                    //border: '1px solid green',
                                    lineHeight: '0.8',
                                }}
                                //fontFamily="Arial"
                            >
                                Onlinewache
                            </Typography>
                        </Box>
                    </Link>
                </Container>
            </Toolbar>
        </AppBar>
    );
}
