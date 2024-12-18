import { createContext, useContext } from "react";

export const Context = createContext();
export const InfoDivProvider = ({children, value}) => {
    return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useInfoContext = () => {
    return useContext(Context);
}