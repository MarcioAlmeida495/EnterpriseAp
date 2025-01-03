import { dataFetch, formatInit } from "./Functions";

export const handleGetData = (set, openByIndex, url = 'getEnterpriseByID') =>{
    console.log(`getdata> openbI: ${openByIndex} set: ${set}`)

    dataFetch(url, formatInit({id: openByIndex})).then(r=>{
        console.log('AQUI -->',r);
        set(r);
    })
}

export const handleGetDataProperty = (set, openByIndex, url = 'getPropertyByID') =>{
    dataFetch(url, formatInit({id: openByIndex})).then(r=>{
        set(r);
    })
}