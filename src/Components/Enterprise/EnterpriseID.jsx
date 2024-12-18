import { useEffect, useRef, useState } from "react"
import { InputField } from "../InputField/InputField";
import { AddButton } from "../AddButton/AddButton";
import { dataFetch, formatInit } from "../../Functions";
import { Modal } from "../Modal/Modal";
import { Property } from "../Property/Property";
import { Propriedade } from "../../DefaultData";
import _ from 'lodash';
import { SaveButton } from "../SaveButton/SaveButton";
import './styles.css';
import { useDataProvider } from "../../Contexts/AllDataContext";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { useHomeContext } from "../../Contexts/HomeContext";
import { Title } from "../Title/Title";

export const EnterpriseID = ({enterprise, openProperty = () => {}, openByIndex = undefined, nameOf = '', showAll = false}) => {
    const myFormRef = useRef(null);
    const context = useDataProvider();
    const {setReset} = useHomeContext();
    const [counter, setCounter]  = useState(0);
    const [show, setShow] = useState(showAll);
    const [keys, setKeys] = useState([]);
    const [id, setId] = useState();
    const [properties, setProperties] = useState([]);
    const {setDataMiddle, setDataFirst} = context;
    const [isNew, setIsNew] = useState(false);
    const [data, setData] = useState(enterprise);

    var thisClassName = `form-data-id-enterprise${id}`;

    
    const resetData = () => {
        console.log('teste');
        setCounter(counter+1);
        console.log('counter == > ', counter)
    }
    
    useEffect(()=>{
        showAll && setReset({resetEnterprise: resetData})
    },[])

    useEffect(()=>{
        id && dataFetch('getEnterpriseById', formatInit({id: id})).then(r=>console.log(r));
        console.log('counter--> ',counter)
    },[counter])
    
    useEffect(()=>{
        if(openByIndex){
            dataFetch('getEnterpriseById', formatInit({id: openByIndex})).then(r=>{
                setData(r);
            })
        }
        else if(enterprise){
            setData(enterprise);
        }
    },[enterprise, openByIndex])

    useEffect(()=>{
        console.log(data);
        if(data){setKeys(Object.keys(data));
        if(data['$ID'])setId(data['$ID'])
        else dataFetch('getNextEnterprise').then(r=>{
            setId(r.next)
            setIsNew(true);
        });
        setProperties(data['Propriedades']);}
    }, [data])


    if(data)return <div ref={myFormRef} className={`myForm`}>
        <Title>Enterprise</Title>
        <input style={{display: 'none'}} data-fieldname={'$ID'} className={thisClassName} readOnly defaultValue={id} />
        {keys && keys.map((keyValue, index)=>{
            if(!Array.isArray(data[keyValue]) && !keyValue.includes('$')) return <InputField key={index} classForm={thisClassName} upValue={data[keyValue]} keyValue={keyValue}/>
            else return undefined
        })}

        <SaveButton className="largest"  onClick={()=>{
            var values = document.getElementsByClassName(thisClassName);
            values = [...values];
            values = values.map(value => {
                return [value.dataset.fieldname, value.value];
            })
            
            var obj = Object.fromEntries(values);
            obj = {...obj, Propriedades : properties}
            dataFetch('createEnterprise', formatInit({data: obj})).then(r=>{
                console.log(r);
            })
        }}>Save</SaveButton>
        <div className="slide-content">

        {properties && properties.map((property, index)=>{
            return <AddButton key={index} onClick={()=>{
                setDataMiddle(<></>);
                setTimeout(() => {
                    console.log('ID===>>> ',id);
                    setDataMiddle(<Property name={`Empreendimento ${(Number(id)+1)}: P${(index+1)<10 ? ('0'+(index+1)) : (index+1)}`} openByIndex={property} indexOfEnterprise={id}/>);
                }, 0);
                openProperty('teste');
            }} >{`P${(index+1)<10 ? ('0'+(index+1)) : (index+1)}`}</AddButton>
        })}
        
        {!isNew && <AddButton onClick={()=>{
            setDataMiddle(<></>);
            setTimeout(() => {
                setDataMiddle(<Property property={Propriedade} name={`Empreendimento ${Number(id) + 1}: P${properties.length+1}`} indexOfEnterprise={id} />)
            }, 0);
        }}>P+</AddButton>
}
        
        </div>
        {!isNew && <DeleteButton>Excluir Empreendimento</DeleteButton>}
        </div>
    else return <></>
}