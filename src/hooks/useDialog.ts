import { useEffect, useState } from 'react';

export function useDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const modalShown = sessionStorage.getItem('materialUiModalShown');
        if (!modalShown) {
            setOpen(true);
            sessionStorage.setItem('materialUiModalShown', 'true');
        }
    }, []);

    const handleClose = (
        event?: any,
        reason?: 'backdropClick' | 'escapeKeyDown',
    ) => {
        if (reason && reason === 'backdropClick') {
            return;
        }

        setOpen(false);
    };

    return {
        open,
        handleClose,
    };
}
