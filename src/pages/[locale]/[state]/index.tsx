import ComplaintCard from '@/components/ComplaintCard';
import IcoTrans from '@/components/IcoTrans';
import Layout from '@/components/Layout';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { useRouteGuard } from '@/hooks/useRouteGuard';
import useStateObject from '@/hooks/useStateObject';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SSRConfig, config } from 'i18next-ssg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createElement, useEffect, useState } from 'react';
import nextI18nConfig from '../../../../next-i18next.config';
import { getAllStateNames } from '../../../lib/state';

interface StateProps extends SSRConfig {
    state: string;
}

interface LinkInfo {
    link: string;
    linkTitle?: string;
}

export default function StatePage(props: StateProps) {
    useRouteGuard();
    const { query, replace } = useRouter();
    const { t } = useReloadedTranslation([props.state, 'common']);
    const stateObject = useStateObject();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const links: LinkInfo[] = [
        {
            link: 'https://id.bund.de/de',
            linkTitle:
                t('infoRegistrationLinkTitle', { ns: props.state }) || '',
        },
        // {
        //     link: 'https://www.elster.de',
        //     //linkTitle: t('') || '',
        // },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 906) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    if (!stateObject) {
        return null;
    }
    const lobKey = Object.keys(stateObject.extra).find((el) => el === 'lob');
    const extraContent = Object.keys(stateObject.extra);

    return (
        <Layout>
            {stateObject.seo && (
                <Head>
                    {Object.keys(stateObject.seo).map((key, index) => {
                        const value = (stateObject.seo as any)[key];

                        if (typeof value === 'string') {
                            const translatedValue =
                                key === 'title'
                                    ? t(value, {
                                          state: t(stateObject.name),
                                      })
                                    : value;
                            return createElement(
                                key,
                                { key: index },
                                translatedValue,
                            );
                        }

                        return value.map((props: any, valIndex: number) => {
                            const translatedProps = { ...props };

                            translatedProps.content =
                                key === 'meta'
                                    ? t(props.content)
                                    : props.content;

                            return createElement(key, {
                                key: `${index}_${valIndex}`,
                                ...translatedProps,
                            });
                        });
                    })}
                </Head>
            )}
            <Container fixed>
                {/* *Title, subtitle and logo*/}
                <Grid
                    container
                    sx={{
                        justifyContent: {
                            xs: 'space-evenly',
                            sm: 'flex-start',
                            md: 'space-between',
                            lg: 'space-between',
                        },
                        alignItems: 'center',
                        marginY: {
                            xs: '40px',
                            sm: '40px',
                            md: '50px',
                            lg: '60px',
                        },
                        //border: '1px dotted',
                    }}
                >
                    {/*Title and subtitle*/}
                    <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
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
                            <IcoTrans
                                ns={props.state}
                                i18nKey="complaintsPageTitle"
                                values={{
                                    state: t(stateObject.name, {
                                        ns: 'common',
                                    }),
                                }}
                            />
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                marginTop: 3,
                                marginBottom: 1,
                                textAlign: {
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'start',
                                    lg: 'start',
                                },
                            }}
                        >
                            <IcoTrans
                                ns={props.state}
                                i18nKey="complaintsPageSubtitle"
                            />
                        </Typography>
                    </Grid>

                    {/* Logo */}
                    <Grid
                        item
                        sm={12}
                        md={3}
                        lg={2}
                        xl={2}
                        sx={{
                            marginY: {
                                xs: '15px',
                                sm: '15px',
                                md: '0px',
                                lg: '0px',
                                xl: '0px',
                            },
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'flex-end',
                                lg: 'flex-end',
                                xl: 'flex-end',
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'end',
                                lg: 'end',
                                xl: 'end',
                            },
                            //border: '1px solid',
                            lineHeight: 0,
                        }}
                    >
                        <Link
                            href={`/${query.locale}/${query.state}`}
                            title={
                                t(stateObject.titleLinkLogoPolice, {
                                    state: t(stateObject.name),
                                }) || ''
                            }
                            style={{
                                alignItems: 'flex-end',
                            }}
                        >
                            <Image
                                src={`/assets/images/logo-polizei/${query.state}.png`}
                                alt={t(stateObject.altTextLogoPolice, {
                                    state: t(stateObject.name),
                                })}
                                width={0}
                                height={0}
                                title={
                                    t(stateObject.titleLogoPolice, {
                                        state: t(stateObject.name),
                                    }) || ''
                                }
                                style={{
                                    objectFit: 'contain',
                                    width: isMobile ? '40%' : '95%',
                                    height: '95%',
                                    //border: '1px green solid',
                                }}
                            />
                        </Link>
                    </Grid>
                </Grid>

                {/* Teaser Complaints */}
                <Grid container spacing={1}>
                    {Object.entries(stateObject.complaints!).map(
                        ([key, value]) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={key}
                                sx={{
                                    marginTop: 1,
                                }}
                            >
                                <ComplaintCard
                                    title={t(value.title)}
                                    imgTitle={t(value.titlePhoto) || ''}
                                    image={`/assets/images/${query.state}/${key}.jpg`}
                                    description={t(value.description)}
                                    link={key}
                                    state={props.state}
                                    altText={t(value.altTextPhoto)}
                                    copyright={t(value.copyrightFoto)}
                                    titleURL={t(value.titleURL, {
                                        state: t(stateObject.name),
                                    })}
                                />
                            </Grid>
                        ),
                    )}
                </Grid>

                {/* Aside Content */}
                {extraContent && (
                    <Grid
                        container
                        sx={{
                            marginTop: 4,
                            flexWrap: {
                                xs: 'wrap',
                                sm: 'wrap',
                                md: 'nowrap',
                                lg: 'nowrap',
                                xl: 'nowrap',
                            },
                            gap: 1,
                        }}
                    >
                        {lobKey && (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <ComplaintCard
                                    title={stateObject.extra.lob.title}
                                    imgTitle={
                                        t(stateObject.extra.lob.titlePhoto) ||
                                        ''
                                    }
                                    description={t(
                                        stateObject.extra.lob.description,
                                    )}
                                    link={lobKey}
                                    image={`/assets/images/bw/${lobKey}.jpg`}
                                    state={props.state}
                                    altText={t(
                                        stateObject.extra.lob.altTextPhoto,
                                    )}
                                    copyright={t(
                                        stateObject.extra.lob?.copyrightFoto,
                                    )}
                                    titleURL={t(
                                        stateObject.extra.lob.titleURL,
                                        {
                                            state: t(stateObject.name),
                                        },
                                    )}
                                />
                            </Grid>
                        )}

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={lobKey! ? 8 : 12}
                            lg={lobKey! ? 9 : 12}
                            xl={lobKey! ? 9 : 12}
                            sx={{
                                padding: 1,
                                backgroundColor: 'secondary.light',
                                borderRadius: 2,
                                boxShadow: '2px 2px rgb(0,0,0, 0.1)',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        marginBottom: 2,
                                    }}
                                >
                                    {t(stateObject.extra.infoBox.infoFormTitle)}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginBottom: 2,
                                    }}
                                >
                                    <IcoTrans
                                        ns={props.state}
                                        i18nKey={
                                            stateObject.extra.infoBox
                                                .infoFormText
                                        }
                                    />
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        marginBottom: 2,
                                    }}
                                >
                                    {t(
                                        stateObject.extra.infoBox
                                            .infoRegistrationTitle,
                                    )}
                                </Typography>
                                <Typography variant="body1">
                                    <IcoTrans
                                        ns={props.state}
                                        i18nKey={
                                            stateObject.extra.infoBox
                                                .infoRegistrationDescription
                                        }
                                        links={links}
                                    />
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    );
}

const getStaticProps = async (context: Record<string, any>) => {
    const states = getAllStateNames();

    const locale = context?.params?.locale;

    const transObject = await serverSideTranslations(
        locale,
        ['common', ...states],
        nextI18nConfig,
    );

    return {
        props: {
            ...transObject,
            state: context?.params?.state,
        },
    };
};

const getStaticPaths = async () => {
    const paths: {
        params: {
            locale: string;
            state: string;
        };
    }[] = [];

    const states = getAllStateNames();

    for (const locale of config.locales) {
        for (const state of states) {
            paths.push({
                params: {
                    locale,
                    state,
                },
            });
        }
    }

    return {
        fallback: false,
        paths,
    };
};

export { getStaticPaths, getStaticProps };
