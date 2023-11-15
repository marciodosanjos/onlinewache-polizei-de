import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

export const useReloadedTranslation = (ns: string | string[] | undefined) => {
    const { t, i18n } = useTranslation(ns);

    useEffect(() => {
        i18n.reloadResources(i18n.resolvedLanguage, ns);
    }, []);

    return {
        t,
        i18n,
    };
};
