import IcoTrans from '@/components/IcoTrans';
import Layout from '@/components/Layout';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { getStaticPaths } from 'i18next-ssg/server';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextI18nConfig from '../../../next-i18next.config';

interface LinkInfo {
    link: string;
    linkTitle?: string;
}

export default function DataProtectionPage() {
    const { t } = useReloadedTranslation('common');
    const router = useRouter();

    const links: LinkInfo[] = [
        {
            link: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=celex%3A32016R0679',
            linkTitle: t('pageDataProtectionEUDatenschutz') || '',
        },
        {
            link: 'https://www.polizei-bw.de/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleBW') || '',
        },
        {
            link: 'https://www.polizei.bayern.de/wir-ueber-uns/datenschutz/index.html',
            linkTitle: t('pageDataProtectionLinkTitleBY') || '',
        },
        {
            link: 'https://www.berlin.de/polizei/datenschutzerklaerung.700498.php',
            linkTitle: t('pageDataProtectionLinkTitleBE') || '',
        },
        {
            link: 'https://polizei.brandenburg.de/seite/datenschutzerklaerung',
            linkTitle: t('pageDataProtectionLinkTitleBB') || '',
        },
        {
            link: 'https://www.polizei.bremen.de/datenschutzerklaerung-6297',
            linkTitle: t('pageDataProtectionLinkTitleHB') || '',
        },
        {
            link: 'https://www.polizei.hamburg/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleHH') || '',
        },
        {
            link: 'https://www.polizei.hessen.de/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleHE') || '',
        },
        {
            link: 'https://www.polizei.mvnet.de/Datenschutz/',
            linkTitle: t('pageDataProtectionLinkTitleMV') || '',
        },
        {
            link: 'https://www.polizei-nds.de/startseite/wir_uber_uns/datenschutzerklaerung-113021.html',
            linkTitle: t('pageDataProtectionLinkTitleNI') || '',
        },
        {
            link: 'https://polizei.nrw/datenschutzerklaerung',
            linkTitle: t('pageDataProtectionLinkTitleNV') || '',
        },
        {
            link: 'https://www.polizei.rlp.de/ueber/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleRP') || '',
        },
        {
            link: 'https://www.saarland.de/polizei/DE/service/datenschutz/datenschutz_node.html',
            linkTitle: t('pageDataProtectionLinkTitleSL') || '',
        },
        {
            link: 'https://www.polizei.sachsen.de/de/74642.htm',
            linkTitle: t('pageDataProtectionLinkTitleSN') || '',
        },
        {
            link: 'https://www.sachsen-anhalt.de/meta/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleST') || '',
        },
        {
            link: 'https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/POLIZEI/eRevier/Onlinewache/_fachinhalte/datenschutzerklaerung.html',
            linkTitle: t('pageDataProtectionLinkTitleSH') || '',
        },
        {
            link: 'https://polizei.thueringen.de/landespolizeidirektion/datenschutz',
            linkTitle: t('pageDataProtectionLinkTitleTH') || '',
        },
        {
            link: `/${router.query.locale}/impressum`,
            linkTitle: t('footerLinkTitleImprint') || '',
        },
    ];

    return (
        <Layout>
            <Head>
                <title>{t('pageDataProtectionMetaTitle')}</title>
                <meta
                    name="description"
                    content={t('pageDataProtectionMetaDescription') || ''}
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
                            {t('pageDataProtectionH2')}
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
                        <IcoTrans
                            ns={'common'}
                            i18nKey={'pageDataProtectionContent'}
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
