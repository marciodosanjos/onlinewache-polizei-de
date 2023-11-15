import AccordionItem from '@/components/AccordionItem';
import IcoTrans from '@/components/IcoTrans';
import Layout from '@/components/Layout';
import BundeslandBox from '@/components/StatesBox';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { useRouteGuard } from '@/hooks/useRouteGuard';
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';

import { getStaticPaths } from 'i18next-ssg/server';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import nextI18nConfig from '../../../next-i18next.config';

export default function HomePage() {
    useRouteGuard(true);
    const { t } = useReloadedTranslation('common');
    const [isSelected, setIsSelected] = useState<string>('');
    const [panelExpanded, setPanelExpanded] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setIsSelected(value);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 414) {
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
    }, [isSelected]);

    const handlePanelExpanded = (panel: string) => {
        setPanelExpanded(panel);
    };

    const accordionsContent = [
        {
            title: 'accordionTitel1',
            content: 'accordionContent1',
        },
        {
            title: 'accordionTitel2',
            content: 'accordionContent2',
        },
        {
            title: 'accordionTitel3',
            content: 'accordionContent3',
        },
        {
            title: 'accordionTitel4',
            content: 'accordionContent4',
        },
        {
            title: 'accordionTitel5',
            content: 'accordionContent5',
        },
    ];

    return (
        <Layout>
            <Head>
                <title>{t('homePageMetaTitle')}</title>
                <meta
                    name="description"
                    content={t('homePageMetaDescription') || ''}
                />
            </Head>

            {/* Welcome Text*/}
            <Container
                fixed
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: {
                        xs: 'center',
                        sm: 'center',
                        md: 'start',
                        lg: 'start',
                    },
                    marginY: {
                        xs: '40px',
                        sm: '40px',
                        md: '50px',
                        lg: '60px',
                    },
                }}
            >
                <Typography variant="h1">
                    <IcoTrans ns="common" i18nKey="homePageWelcomeText" />
                </Typography>
            </Container>

            {/* RadioBox States and Accordion*/}
            <Container fixed>
                {/* RadioBox States */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box
                            sx={{
                                backgroundColor: 'secondary.main',
                                padding: '40px',
                                boxShadow: '2px 3px 2px 0px rgba(0, 0, 9, .2);',
                                borderRadius: '4px',
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontWeight={600}
                                marginBottom={3}
                            >
                                <IcoTrans
                                    ns="common"
                                    i18nKey="homePageBoxLocalInputTitle"
                                />
                            </Typography>

                            <FormControl component="fieldset">
                                <RadioGroup
                                    role="group"
                                    aria-label="Wählen Sie zwischen Standortoptionen"
                                    aria-labelledby="group-label"
                                    name="radio-buttons-group"
                                    sx={{ gap: 1 }}
                                >
                                    <div id="group-label">
                                        <FormControlLabel
                                            value="germany"
                                            control={
                                                <Radio
                                                    icon={
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    'white',
                                                                borderRadius:
                                                                    '50%',
                                                                width: '18px',
                                                                height: '18px',
                                                                border: '1px solid',
                                                            }}
                                                        />
                                                    }
                                                    onChange={handleChange}
                                                />
                                            }
                                            label={
                                                <IcoTrans
                                                    ns="common"
                                                    i18nKey="homePageBoxLocalLabelText1"
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="abroad"
                                            control={
                                                <Radio
                                                    onChange={handleChange}
                                                    icon={
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    'white',
                                                                borderRadius:
                                                                    '50%',
                                                                width: '18px',
                                                                height: '18px',
                                                                border: '1px solid',
                                                            }}
                                                        />
                                                    }
                                                />
                                            }
                                            label={
                                                <IcoTrans
                                                    ns="common"
                                                    i18nKey="homePageBoxLocalLabelText2"
                                                />
                                            }
                                        />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        {isSelected && (
                            <BundeslandBox
                                title={
                                    <IcoTrans
                                        ns="common"
                                        i18nKey={
                                            isSelected === 'germany'
                                                ? 'homePageInputValueGermany'
                                                : 'homePageInputValueAbroad'
                                        }
                                    />
                                }
                                isMobile={isMobile}
                            />
                        )}
                    </Grid>

                    {/*Accordion*/}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {accordionsContent.map((el, index) => {
                            return (
                                <AccordionItem
                                    key={index}
                                    id={`panel${index + 1}`}
                                    accordionTitle={
                                        <IcoTrans
                                            ns="common"
                                            i18nKey={el.title}
                                        />
                                    }
                                    accordionContent={t(el.content)}
                                    expanded={panelExpanded}
                                    handleExpanded={handlePanelExpanded}
                                    panelHeaderID={index}
                                    panelHeaderContentID={index}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
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
