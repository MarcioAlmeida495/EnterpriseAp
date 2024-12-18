import { useEffect, useState } from "react"
import { FieldSetFromData } from "../../CreateObjectFromData";
import {  enterprise } from "../../DefaultData";
import './styles.css';
import { dataFetch } from "../../Functions";
import { Enterprise } from "../Enterprise/Enterprise";
import { Property } from "../Property/Property";
import { Owner } from "../Owner/Owner";
import { Modal } from "../Modal/Modal";
import { SaveButton } from "../SaveButton/SaveButton";
import { DataProvider } from "../../Contexts/AllDataContext";
import { InfoDivRight } from "../InfoDiv/InfoDivRight";
import { InputField } from "../InputField/InputField";
import { useHomeContext } from "../../Contexts/HomeContext";
import { InfoDivFirst } from "../InfoDiv/InfoDivFirst";
import { EnterpriseID } from "../Enterprise/EnterpriseID";

const dataKey = "EPs"

export const Home = ({children}) => {
    const {reset} = useHomeContext();
    const [enterprises, setEnterprises] = useState();
    const [nextEnterprise, setNextEnterprise] = useState();
    const [counterReset, setCounterReset] = useState(0);
    const [dataMiddle, setDataMiddle] = useState();
    const [dataRight, setDataRight] = useState();
    const [dataFirst, setDataFirst] = useState();
    const [filterValues, setFilterValues] = useState('');
    useEffect(()=>{
        console.log(reset);
       
        dataFetch('getNextEnterprise').then(r=>{
            setNextEnterprise(r.next);
        })
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
        <h1>{dataKey}</h1>
        <SaveButton onClick={()=>{
                setDataFirst(<></>)
            setTimeout(() => {
                setDataFirst(<Enterprise showAll={true} enterprise={enterprise} upId={nextEnterprise}/>)
            }, 0);
        }}>Adicionar EP</SaveButton>
        <InputField onChange={(value)=>{setFilterValues(value)}}/>
        <div className="EpsButtons">
            {enterprises && enterprises.map((enterprise, index)=>{
                if(enterprise['Nome'].toUpperCase().includes(filterValues.toUpperCase()) || (Number(enterprise['$ID']))+1 === Number(filterValues)) 
                    // return <Enterprise key={index} enterprise={enterprise}/>
                    return <SaveButton onClick={()=>{
                        setDataFirst(<EnterpriseID openByIndex={enterprise['$ID']}/>)
                    }}>{`EP: ${index}`}{enterprise['Nome']}</SaveButton>
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