import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import IcoTrans from './IcoTrans';

export default function Footer() {
    const router = useRouter();
    const { t } = useReloadedTranslation('common');

    return (
        <>
            <Box
                component="footer"
                sx={{
                    paddingY: {
                        xs: 0,
                        sm: 0,
                        md: 1,
                        lg: 2,
                        xl: 2,
                    },

                    borderTop: '1px solid rgb(0,0,0,0.2)',
                    borderBottom: '1px solid rgb(0,0,0,0.2)',
                    alignItems: 'center',
                }}
            >
                <Container fixed>
                    <Grid
                        container
                        sx={{
                            gap: {
                                xs: 1,
                                sm: 1,
                                md: 0,
                                lg: 0,
                                xl: 0,
                            },
                            paddingY: {
                                xs: 3,
                                sm: 3,
                                md: 0,
                                lg: 0,
                                xl: 0,
                            },
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/*Polizei Onlinewache*/}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            sx={{
                                color: 'primary.main',

                                textAlign: {
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'start',
                                    lg: 'start',
                                    xl: 'start',
                                },
                            }}
                        >
                            <Link
                                href={'/'}
                                title={t('titleLinkLogoNavBarHomePage')}
                                sx={{ textDecoration: 'none' }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'primary.main',

                                        textAlign: {
                                            xs: 'center',
                                            sm: 'center',
                                            md: 'center',
                                            lg: 'start',
                                            xl: 'start',
                                        },
                                    }}
                                >
                                    Polizei Onlinewache
                                </Typography>
                            </Link>
                        </Grid>

                        {/*Dieses Projekt ist Bestandteil...*/}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            sx={{
                                display: 'flex',
                                direction: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    marginRight: 1,
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    component="div"
                                    sx={{
                                        textAlign: 'start',
                                        color: 'black',
                                    }}
                                >
                                    <IcoTrans
                                        ns="common"
                                        i18nKey="footerProjectDescription"
                                    />
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link
                                    href="https://www.bmi.bund.de/DE/themen/sicherheit/programm-p20/programm-p20-node.html"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    title="Weitere Informationen zum Programm 20 der Polizei"
                                    style={{
                                        paddingLeft: 0,
                                    }}
                                >
                                    <Image
                                        alt={t('footerLogoAltText')}
                                        width={100}
                                        height={35}
                                        src={`/assets/images/logo.png`}
                                        quality={90}
                                        style={{
                                            paddingLeft: 0,
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Link>
                            </Box>
                        </Grid>

                        {/*Imprint, Data Protection, Accessibility.*/}
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Box
                                sx={{
                                    textAlign: {
                                        xs: 'center',
                                        sm: 'center',
                                        md: 'end',
                                        lg: 'end',
                                        xl: 'end',
                                    },
                                    lineHeight: 1,
                                }}
                            >
                                <Link
                                    title={t('footerLinkTitleImprint')}
                                    href={`/${router.query.locale}/impressum`}
                                    variant="caption"
                                    sx={{
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {t('footerImprint')}
                                </Link>
                                <Link
                                    title={t('footerLinkTitleDataProtection')}
                                    href={`/${router.query.locale}/datenschutz`}
                                    variant="caption"
                                    sx={{
                                        marginLeft: 1,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {t('footerDataProtection')}
                                </Link>
                                <Link
                                    title={t('footerLinkTitleAccessibility')}
                                    href={`/${router.query.locale}/barrierefreiheit`}
                                    variant="caption"
                                    sx={{
                                        marginLeft: 1,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {t('footerAccessibility')}
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
