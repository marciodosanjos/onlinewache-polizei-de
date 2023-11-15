import { useGlobalStateContext } from '@/context/StateContext';
import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { Grid, Typography } from '@mui/material';
import StateItem from './StateItem';

export default function StatesBox(props: {
    title: React.ReactNode;
    isMobile: boolean;
}) {
    const { data } = useGlobalStateContext();
    const { t } = useReloadedTranslation('common');

    if (!data) {
        return null;
    }

    return (
        <Grid
            container
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.contrastText',
                border: '2px solid #f4bc3c',
                borderRadius: 1,
                marginTop: '2px',
                boxShadow: '2px 2px 2px 0px rgba(0, 0, 0, .1);',
            }}
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                    margin: '30px',
                }}
            >
                <Typography variant="body1">{props.title}</Typography>
            </Grid>
            {Object.entries(data).map(([key, value], index) => {
                return (
                    <Grid
                        item
                        xs={6}
                        sm={3}
                        md={4}
                        lg={3}
                        key={index}
                        sx={{
                            paddingLeft: props.isMobile ? '25px' : null,
                            //display: props.isMobile ? 'flex' : null,
                            //justifyContent: 'flex-start',
                            //border: '1px solid',
                        }}
                    >
                        <StateItem
                            stateKey={key}
                            state={t(value.name)}
                            link={value.link ?? key}
                            altTextLogoState={t(
                                `altTextLogoState${key.toLocaleUpperCase()}`,
                            )}
                            linkTitle={
                                t(
                                    `linkTextLogoState${key.toLocaleUpperCase()}`,
                                ) || ''
                            }
                            logoSateTitle={
                                t(`titleLogoState${key.toUpperCase()}`, {
                                    ns: 'common',
                                }) || ''
                            }
                            isMobile={props.isMobile}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}
