import IcoTrans from '@/components/IcoTrans';
import Layout from '@/components/Layout';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { getStaticPaths } from 'i18next-ssg/server';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import nextI18nConfig from '../../../next-i18next.config';

interface LinkInfo {
    link: string;
    linkTitle?: string;
}

export default function ImprintPage() {
    const { t } = useReloadedTranslation('common');

    const links: LinkInfo[] = [
        {
            link: 'mailto:IM-REFD3@polizei.slpol.de',
        },
        {
            link: 'https://www.icomedias.com/>',
            linkTitle: t('pageImprintLinkTitle1') || '',
        },
        {
            link: 'https://ldi.rlp.de/',
            linkTitle: t('pageImprintLinkTitle2') || '',
        },
        {
            link: 'https://nextjs.org/',
            linkTitle: t('pageImprintLinkTitle3') || '',
        },
        {
            link: 'https://www.hybridforms.net/',
            linkTitle: t('pageImprintLinkTitle4') || '',
        },
    ];

    return (
        <Layout>
            <Head>
                <title>{t('pageImprinMetaTitle')}</title>
                <meta
                    name="description"
                    content={t('pageImprinMetaDescription') || ''}
                />
            </Head>
            <Container fixed sx={{ paddingBottom: 4 }}>
                {/*Title and subtitle*/}
                <Grid
                    container
                    sx={{
                        justifyContent: {
                            xs: 'space-evenly',
                            sm: 'flex-start',
                            md: 'space-between',
                            lg: 'space-between',
                        },
                        alignItems: {
                            xs: 'center',
                            sm: 'center',
                            md: 'center',
                            lg: 'flex-end',
                        },
                        marginY: {
                            xs: '40px',
                            sm: '40px',
                            md: '50px',
                            lg: '60px',
                        },
                        //border: '1px solid',
                    }}
                >
                    {/*Title and subtitle*/}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography
                            variant="h1"
                            sx={{
                                marginTop: {
                                    xs: '16px',
                                    sm: '10px',
                                    md: '0px',
                                    lg: '0px',
                                    xl: '0px',
                                },

                                textAlign: {
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'start',
                                    lg: 'start',
                                },
                            }}
                        >
                            {t('pagesFooterH1')}
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                marginTop: 3,
                                textAlign: {
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'start',
                                    lg: 'start',
                                },
                            }}
                        >
                            {t('pageImprintH2')}
                        </Typography>
                    </Grid>
                </Grid>

                {/*Content*/}
                <Card
                    sx={{
                        marginY: {
                            sm: 3,
                            md: 3,
                            lg: 2,
                            xl: 2,
                        },
                        padding: 3,
                    }}
                >
                    <CardContent>
                        {/*Content*/}

                        <IcoTrans
                            ns={'common'}
                            i18nKey={'pageImprintContent'}
                            links={links}
                        />
                    </CardContent>
                </Card>
            </Container>
        </Layout>
    );
}

const getStaticProps = async (context: Record<string, any>) => {
    const locale = context?.params?.locale;

    const transObject = await serverSideTranslations(
        locale,
        ['common'],
        nextI18nConfig,
    );

    return {
        props: transObject,
    };
};

export { getStaticPaths, getStaticProps };
