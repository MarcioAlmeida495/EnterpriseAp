import { useEffect, useState } from "react"
import {  enterprise } from "../../DefaultData";
import './styles.css';
import { dataFetch } from "../../Functions";
import { SaveButton } from "../SaveButton/SaveButton";
import { DataProvider } from "../../Contexts/AllDataContext";
import { InfoDivRight } from "../InfoDiv/InfoDivRight";
import { InputField } from "../InputField/InputField";
import { useHomeContext } from "../../Contexts/HomeContext";
import { InfoDivFirst } from "../InfoDiv/InfoDivFirst";
import { EnterpriseID } from "../Enterprise/EnterpriseID";
import { Title } from "../Title/Title";


export const Home = ({children}) => {
    const {reset} = useHomeContext();
    const [enterprises, setEnterprises] = useState();
    const [counterReset] = useState(0);
    const [dataMiddle, setDataMiddle] = useState();
    const [dataRight, setDataRight] = useState();
    const [dataFirst, setDataFirst] = useState();
    const [filterValues, setFilterValues] = useState('');
    useEffect(()=>{
        console.log(reset);
       
        
        dataFetch('getAllEnterprises').then(r=>{
            if(r.data)setEnterprises(r.data);
        })
        
    },[reset])


    useEffect(()=>{
        dataFetch('getAllEnterprises').then(r=>{
            if(r.data)setEnterprises(r.data);
        })
    },[counterReset])

    

    return <DataProvider value={{setDataMiddle, dataMiddle, setDataRight, dataRight, setDataFirst, dataFirst}}>
    <div className="divLeft">
        <div className="onTop">
            <Title fontSize="1.8em">EPs</Title>
            <SaveButton onClick={()=>{
                setDataFirst(<></>);
                setDataMiddle(<></>);
                setTimeout(() => {
                    setDataFirst(<EnterpriseID enterprise={enterprise}/>)
                }, 0);
            }}>Adicionar EP</SaveButton>
        <InputField onChange={(value)=>{setFilterValues(value)}}/>
        </div>
        <div className="EpsButtons">
            {enterprises && enterprises.map((enterprise, index)=>{
                if(enterprise['Nome'].toUpperCase().includes(filterValues.toUpperCase()) || (Number(enterprise['$ID']))+1 === Number(filterValues)) 
                    // return <Enterprise key={index} enterprise={enterprise}/>
                    return <SaveButton key={index} onClick={()=>{
                        setDataFirst(<EnterpriseID openByIndex={enterprise['$ID']}/>)
                        setDataMiddle(<></>);
                        setDataRight(<></>)
                    }}>{`EP ${Number(index) + 1}: ${enterprise['Nome']}`}</SaveButton>
                return null
            })}

        </div>
        
        <div className="myForm">
        
        </div>
        {children}
    </div>
    <InfoDivFirst>{dataFirst}</InfoDivFirst>
    <div className="divInMiddle" >{dataMiddle}</div>
    <InfoDivRight />
    </DataProvider> 
    
}