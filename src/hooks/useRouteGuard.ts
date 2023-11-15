import { useGlobalNavContext } from '@/context/NavContext';
import { getLocale } from 'i18next-ssg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useRouteGuard = (set?: boolean) => {
    const [routeChecked, setRouteChecked] = useState(false);
    const { authorized, setAuthorized } = useGlobalNavContext();
    const router = useRouter();

    useEffect(() => {
        if (set) {
            setAuthorized(set);
            return;
        }

        if (!authorized) {
            const locale = getLocale();
            router.replace({
                pathname: `/${locale}`,
            });
            return;
        }

        setRouteChecked(true);
    }, []);

    return routeChecked;
};
