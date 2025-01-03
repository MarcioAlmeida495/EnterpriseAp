import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

export const Resets = {
    first: '',
    middle: '',
    right: ''
}

export const HomeProvider = ({value = '', children}) => {
    const [reset, setReset] = useState({teste: '111'});
    useEffect(()=>{
    }, [reset])
    return <Context.Provider value={{reset, setReset}} >{children}</Context.Provider>
}

export const useHomeContext = () => {
    return useContext(Context);
}