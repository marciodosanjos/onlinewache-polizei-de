import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import { Box, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function ComplaintCard(props: {
    imgTitle: string | undefined;
    titleURL: string;
    altText: string;
    copyright: string;
    title: string;
    description: string;
    link: string;
    image: string;
    state: string;
}) {
    const router = useRouter();
    const { t } = useReloadedTranslation(props.state);

    return (
        <Link
            component={NextLink}
            href={{
                pathname: `/${router.query.locale}/${props.state}/anzeige`,
                query: { article: props.link },
            }}
            sx={{
                textDecoration: 'none',
                textTransform: 'none',
            }}
            title={props.titleURL}
        >
            <Card
                sx={{
                    minHeight: {
                        xs: 320,
                        sm: 330,
                        md: 333,
                        lg: 333,
                    },
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <Image
                            src={props.image}
                            alt={props.altText}
                            title={props.imgTitle}
                            width={0}
                            height={0}
                            style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                border: '1px solid #ededed',
                            }}
                        />

                        <div
                            style={{
                                position: 'absolute',
                                color: 'black',
                                top: '0px',
                                right: '0px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                padding: '4px 10px',
                                borderRadius: '1px',
                                fontSize: '10px',
                                fontStyle: 'italic',
                                zIndex: '1',
                            }}
                        >
                            {props.copyright}
                        </div>
                    </div>
                </Box>

                <CardContent
                    sx={{
                        marginY: 0,
                        paddingY: 0,
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h3"
                        sx={{
                            color: '#00468c',
                            fontSize: '22px',
                            textDecoration: 'underline',
                            '&:hover': {
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {t(props.title)}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '13.8px',
                        }}
                    >
                        {t(props.description)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
