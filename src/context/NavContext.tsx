import { PropsWithChildren, createContext, useContext, useState } from 'react';

export const NavContext = createContext<{
    authorized: boolean;
    setAuthorized: (authorized: boolean) => void;
}>({
    authorized: false,
    setAuthorized: () => {},
});

export default function NavContextProvider({ children }: PropsWithChildren) {
    const [authorized, setAuthorized] = useState(false);

    return (
        <NavContext.Provider value={{ authorized, setAuthorized }}>
            {children}
        </NavContext.Provider>
    );
}

export const useGlobalNavContext = () => useContext(NavContext);
