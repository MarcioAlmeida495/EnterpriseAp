import { useEffect, useRef, useState } from "react";
import { useDataProvider } from "../../Contexts/AllDataContext";
import './styles.css'

export const InfoDivFirst = ({defaultData = ''}) => {
    const {dataFirst} = useDataProvider();

    const [data, setData] = useState('');
    const divRef = useRef(null);
    useEffect(()=>{
        return ()=>{
            console.log('desmontado');
        }
    },[])

    useEffect(()=>{
        setData(<></>)
        setTimeout(() => {
            setData(dataFirst);
        }, 0);
    },[dataFirst])



    
    return <>
        {<div ref={divRef} className="divFirst"  >{data}</div>}
    </>
}