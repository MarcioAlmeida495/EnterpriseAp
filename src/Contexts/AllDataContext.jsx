const { createContext, useState, useContext, useEffect } = require("react");

export const Context = createContext();

export const DataProvider = ({value, children}) => {

    return <Context.Provider value={value} >{children}</Context.Provider> 
}

export const useDataProvider = () => {
    return useContext(Context);
}
