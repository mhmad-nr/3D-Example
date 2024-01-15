import React, { PropsWithChildren, useContext, useState } from "react";
type storeType = {
    isDark: boolean,
}
// setIsDark: () => void
const initStore: storeType = {
    isDark: false
}


export type constextType = {
    store: storeType,
    setStore: React.Dispatch<any>
}

export const Context = React.createContext({} as constextType);

export const Provider = ({ children }: PropsWithChildren) => {
    const [store, setStore] = useState<storeType>(initStore);

    return <Context.Provider value={{ store, setStore }}>
        <button className="test-btn" onClick={() => setStore({ ...store, isDark: !store.isDark })}></button>
        {children}
    </Context.Provider>
};

export const useStore = () => useContext(Context);
