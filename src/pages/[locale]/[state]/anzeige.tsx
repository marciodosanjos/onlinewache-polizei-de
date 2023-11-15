import IcoTrans from '@/components/IcoTrans';
import Layout from '@/components/Layout';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { useRouteGuard } from '@/hooks/useRouteGuard';
import useStateComplaints from '@/hooks/useStateComplaints';
import useStateObject from '@/hooks/useStateObject';
import { getAllStateNames } from '@/lib/state';
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { config } from 'i18next-ssg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import nextI18nConfig from '../../../../next-i18next.config';

interface LinkInfo {
    link: string;
    linkTitle?: string;
}

export default function ComplaintPage() {
    useRouteGuard();
    const { query, replace } = useRouter();
    const { t } = useReloadedTranslation([query.state as string, 'common']);
    const stateObject = useStateObject();
    const complaintData = useStateComplaints();
    const [isMobile, setIsMobile] = useState<boolean>(false);

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

    if (!complaintData || !stateObject) {
        return null;
    }

    const links: LinkInfo[] = [
        {
            link: `/${query.locale}/${query.state}`,
            linkTitle:
                t(stateObject.titleLinkLogoPolice, {
                    state: t(stateObject.name),
                }) || '',
        },
        // {
        //     link: 'https://www.elster.de',
        //     //linkTitle: t('pageDataProtectionLinkTitleTH') || '',
        // },
    ];

    const pageSubtitles = () => {
        switch (query.article) {
            case 'hinweis':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleSubtitleWarning"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            case 'lob':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleSubtitlePraiseAndComplaint"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            case 'betrug':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleFraud"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            case 'diebstahl':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleFraud"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            case 'sachbeschaedigung':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleSubtitleDamage"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            case 'andere':
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleSubtitleOtherComplaints"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
            default:
                return (
                    <IcoTrans
                        ns={query.state as string}
                        i18nKey="complaintPageSubtitleHateOnNet"
                        values={{
                            complaint: t(complaintData.title),
                        }}
                    />
                );
        }
    };

    return (
        <Layout>
            <Head>
                <title>
                    {t(complaintData.metaTitle, {
                        state: t(stateObject.name),
                    })}
                </title>
                <meta
                    name="description"
                    content={
                        t(complaintData.metaDescription, {
                            ns: query.state,
                        }) || ''
                    }
                />
            </Head>
            <Container fixed>
                {/*Title, subtitle and logo*/}
                <Grid
                    container
                    sx={{
                        justifyContent: {
                            xs: 'space-evenly',
                            sm: 'flex-start',
                            md: 'space-between',
                            lg: 'space-between',
                            xl: 'space-between',
                        },
                        alignItems: {
                            xs: 'center',
                            sm: 'center',
                            md: 'center',
                            lg: 'center',
                            xl: 'center',
                        },
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
                                ns={query.state as string}
                                i18nKey="complaintPageTitle"
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
                            {pageSubtitles()}
                        </Typography>
                    </Grid>

                    {/*Logo*/}
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
                            lineHeight: 0,
                            //border: '1px green solid',
                        }}
                    >
                        <Link
                            href={`/${query.locale}/${query.state}`}
                            title={
                                t(stateObject.titleLinkLogoPolice, {
                                    state: t(stateObject.name),
                                }) || ''
                            }
                            target={
                                t('linkPoliceBW').startsWith('http')
                                    ? '_blank'
                                    : '_self'
                            }
                            style={{
                                lineHeight: 0,
                            }}
                        >
                            <Image
                                src={`/assets/images/logo-polizei/${query.state}.png`}
                                alt={t(stateObject.altTextLogoPolice, {
                                    state: t(stateObject.name),
                                })}
                                title={
                                    t(stateObject.titleLogoPolice, {
                                        state: t(stateObject.name),
                                    }) || ''
                                }
                                width={0}
                                height={0}
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
                    <CardContent
                        sx={{
                            '& ul': {
                                margin: '0',
                                paddingLeft: '20px',
                            },
                        }}
                    >
                        {
                            <IcoTrans
                                ns={query.state as string}
                                i18nKey={complaintData.longDescription}
                                links={links}
                            />
                        }
                    </CardContent>
                </Card>

                {/*Buttons*/}
                <Container
                    maxWidth="md"
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        paddingTop: '30px',
                        paddingBottom: '70px',
                        gap: 2,
                        flexDirection: 'column',
                    }}
                >
                    {query.article === 'lob'
                        ? stateObject.extra.lob.buttons?.map(
                              (button, index) => {
                                  const buttonText = t(button.text, {
                                      complaint: t(stateObject.extra.lob.title),
                                  });

                                  const buttonLink = `${button.link}${query.locale}`;

                                  return (
                                      <Button
                                          title={
                                              t(button.titleUrl, {
                                                  complaint: t(
                                                      complaintData.title,
                                                  ),
                                              }) || ''
                                          }
                                          key={index}
                                          href={buttonLink}
                                          target="_blank"
                                          variant="contained"
                                          sx={{
                                              textTransform: 'none',
                                              fontSize: '18px',
                                              paddingY: '15px',
                                          }}
                                      >
                                          {buttonText}
                                      </Button>
                                  );
                              },
                          )
                        : complaintData.buttons?.map((button, index) => {
                              const buttonText = t(button.text, {
                                  complaint: t(complaintData.title),
                              });

                              const buttonLink = `${button.link}${query.locale}`;

                              return (
                                  <Button
                                      title={
                                          t(button.titleUrl, {
                                              complaint: t(complaintData.title),
                                          }) || ''
                                      }
                                      key={index}
                                      target="_blank"
                                      href={buttonLink}
                                      variant="contained"
                                      size="medium"
                                      sx={{
                                          textTransform: 'none',
                                          fontSize: '18px',
                                          paddingY: '15px',
                                      }}
                                  >
                                      {buttonText}
                                  </Button>
                              );
                          })}
                </Container>
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
