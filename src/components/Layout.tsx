import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import DialogCompoment from './Dialog';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            <Box
                component="main"
                sx={{
                    paddingBottom: '30px',
                }}
            >
                {children}
            </Box>
            <DialogCompoment />
            <Footer />
        </>
    );
}
