import { useGlobalStateContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function useStateObject() {
    const { data } = useGlobalStateContext();
    const { query } = useRouter();

    const stateObject = useMemo(() => {
        if (!data || typeof query.state !== 'string' || !data[query.state]) {
            return null;
        }

        return data[query.state];
    }, [data, query.state]);

    return stateObject;
}
