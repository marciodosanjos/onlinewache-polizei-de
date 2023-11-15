import { useReloadedTranslation } from '@/hooks/useReloadedTranslation';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { useDialog } from '../hooks/useDialog';

export default function DialogCompoment() {
    const { t } = useReloadedTranslation('common');
    const { open, handleClose } = useDialog();
    //const [isMobile, setIsMobile] = useState<boolean>(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (typeof window === 'object' && window.innerWidth < 414) {
    //             setIsMobile(true);
    //         } else {
    //             setIsMobile(false);
    //         }
    //     };

    //     handleResize();

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <>
            {/* Dialog Box*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <Box
                    sx={{
                        backgroundColor: 'secondary.main',
                        padding: 2,
                    }}
                >
                    <DialogTitle
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        {t('dialogTitle')}
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2">
                            {t('dialogListTitle')}
                        </Typography>

                        <ul style={{ paddingLeft: '20px' }}>
                            <li>
                                <Typography variant="body2">
                                    {t('dialogListItem1')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    {t('dialogListItem2')}
                                </Typography>
                            </li>
                        </ul>

                        <Box
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    display: 'inline-block',
                                    backgroundColor: 'secondary.dark',
                                    color: 'primary.contrastText',
                                    textAlign: 'center',
                                    padding: 1,
                                    marginBottom: 3,
                                }}
                            >
                                {t('dialogWarning')}
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                sx={{
                                    fontWeight: '500',
                                }}
                            >
                                {t('dialogButton')}
                            </Button>
                        </Box>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}
