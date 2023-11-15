import { IComplaints } from '@/context/StateContext';
import useStateObject from '@/hooks/useStateObject';
import { getLocale } from 'i18next-ssg';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

function useStateComplaints() {
    const stateObject = useStateObject();
    const { query, replace } = useRouter();

    const complaintData = useMemo(() => {
        if (!stateObject || typeof query.article !== 'string') {
            return null;
        }

        if (query.article === 'lob') {
            if (!stateObject.extra?.lob) {
                const locale = getLocale();
                replace(`/${locale}`);
                return;
            }

            return stateObject.extra.lob;
        }

        if (
            !stateObject.complaints ||
            !stateObject.complaints[query.article as keyof IComplaints]
        ) {
            const locale = getLocale();
            replace(`/${locale}`);
        }

        return stateObject.complaints?.[query.article as keyof IComplaints];
    }, [stateObject]);

    if (!complaintData || !stateObject) {
        return null;
    }

    return complaintData;
}

export default useStateComplaints;
