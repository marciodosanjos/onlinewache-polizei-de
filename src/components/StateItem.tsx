import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import IcoTrans from './IcoTrans';

export default function StateItem(props: {
    logoSateTitle: string | undefined;
    linkTitle: string | undefined;
    altTextLogoState: string;
    stateKey: string;
    link: string;
    state: string;
    isMobile: boolean;
}) {
    const router = useRouter();

    return (
        <Link
            href={
                props.link.startsWith('http')
                    ? props.link
                    : `/${router.query.locale}/${props.link}`
            }
            {...(props.link.startsWith('http')
                ? { target: '_blank' }
                : { target: '_self' })}
            sx={{
                fontWeight: 600,
                textAlign: 'center',
                textTransform: 'none',
                color: 'primary.dark',
                '&:hover': {
                    textDecoration: 'none',
                },
            }}
            title={props.linkTitle}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: props.isMobile ? 'flex-start' : 'center',

                    height: props.isMobile ? '40px' : '180px',
                    overflow: 'hidden',
                    gap: 2,
                    margin: 1,
                }}
            >
                <Box
                    sx={{
                        display: props.isMobile ? 'none' : 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'background.default',
                        width: '100px',
                        height: '100px',
                        overflow: 'hidden',
                        borderRadius: 100,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    <Image
                        src={`/assets/images/states/${props.stateKey}.png`}
                        width={35}
                        height={45}
                        alt={props.altTextLogoState}
                        title={props.logoSateTitle}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        gap: 0,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '13.5px',
                            fontWeight: 600,
                            textAlign: props.isMobile ? 'start' : 'center',
                            textTransform: 'none',
                            color: 'primary.main',
                        }}
                    >
                        <IcoTrans
                            ns={['common', props.stateKey]}
                            i18nKey={props.state}
                        />
                    </Typography>
                </Box>
            </Box>
        </Link>
    );
}
