import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

interface IComplaint {
    titlePhoto: any;
    title: string;
    description: string;
    longDescription: string;
    copyrightFoto: any;
    metaDescription: string;
    metaTitle: string;
    altTextLogoPolice: string;
    altTextPhoto: string;
    imgTitle: string;
    titleURL: string;
    image?: string;
    buttons: {
        titleUrl: string;
        length: number;
        text: string;
        link?: string;
    }[];
}

export interface IComplaints {
    betrug: IComplaint;
    diebstahl: IComplaint;
    sachbeschaedigung: IComplaint;
    hass: IComplaint;
    enkeltrick: IComplaint;
    andere: IComplaint;
    hinweis: IComplaint;
}

export interface ISEO {
    title: string;
    meta: any[];
}

export interface IStateConfig {
    name: string;
    complaints?: IComplaints;
    link?: string;
    seo?: ISEO;
    altTextLogoPolice: string;
    linkLogoPolice: string;
    titleLinkLogoPolice: string;
    titleLogoPolice: string;
    pageImprintTitle: string;
    extra: {
        lob: IComplaint;
        infoBox: {
            infoFormTitle: string;
            infoFormText: string;
            infoRegistrationTitle: string;
            infoRegistrationDescription: string;
        };
    };
}

export type StateConfigType = IStateConfig | null;

export const StateContext = createContext<{
    data: { [key: string]: IStateConfig };
    loading: boolean;
    error: any;
}>({
    data: {},
    loading: true,
    error: null,
});

export default function StateContextProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<{ [key: string]: IStateConfig }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const stateFetch = await fetch('/state.config.json');
            const stateConfig = await stateFetch.json();
            setData(stateConfig);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StateContext.Provider value={{ data, loading, error }}>
            {children}
        </StateContext.Provider>
    );
}

export const useGlobalStateContext = () => useContext(StateContext);
