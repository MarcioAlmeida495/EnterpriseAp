import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDataProvider } from "../../Contexts/AllDataContext";
import './styles.css'
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";
import { useFormState } from "react-dom";
import { InfoDivProvider } from "../../Contexts/InfoContext";

export const InfoDivMiddle = ({showLoading = false, children}) => {

    const {dataFirst, dataMiddle} = useDataProvider();
    const [isLoading, setIsLoading] = useState(showLoading);
    const [data, setData] = useState('');
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
            setData(dataMiddle);
        }, 0);
    },[dataMiddle])

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
                {!data && 'teste'}
                <button onClick={()=>{
                    setData(false);
                }}>close</button>
                {data}
        </div>}
        

    </InfoDivProvider>
}