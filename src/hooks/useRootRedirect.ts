import { getLocale } from 'i18next-ssg';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRootRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const locale = getLocale();

        router.replace(`/${locale}`);
    });
};
