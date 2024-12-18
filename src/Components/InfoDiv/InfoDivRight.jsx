import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDataProvider } from "../../Contexts/AllDataContext";
import './styles.css'
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";
import { useFormState } from "react-dom";
import { InfoDivProvider } from "../../Contexts/InfoContext";

export const InfoDivRight = ({showLoading = false}) => {

    const {dataRight, dataMiddle} = useDataProvider();
    const [isLoading, setIsLoading] = useState(showLoading);
    const [data, setData] = useState('');
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState();
    const divRef = useRef(null);
    useEffect(()=>{
        return ()=>{
            console.log('desmontado');
        }
    },[])
    useEffect(()=>{
        isLoading && setTimeout(() => {
            setIsLoading(false);
        }, 500); 
    }, [isLoading])

    useEffect(()=>{
        setData(<></>)
        setTimeout(() => {
            setData(dataRight);
        }, 0);
    },[dataRight])

    useEffect(()=>{
        setData(<></>)
    },[dataMiddle])


    const changeShowing = () => {
        setIsLoading(true);
    }
    
    return <InfoDivProvider value={changeShowing}>
        
        {<div ref={divRef} className="divInRight"  >
            {
                isLoading && <div className="infoModal" ><LoadingIcon/></div>
            }
                {data}
        </div>}
        

    </InfoDivProvider>
}