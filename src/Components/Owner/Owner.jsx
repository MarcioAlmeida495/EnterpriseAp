import { useEffect, useRef, useState } from "react"
import { InputField } from "../InputField/InputField";
import { AddButton } from "../AddButton/AddButton";
import { dataFetch, formatInit } from "../../Functions";
import { SaveButton } from "../SaveButton/SaveButton";
import { Title } from "../Title/Title";
import { useHomeContext } from "../../Contexts/HomeContext";
import { DeleteButton } from "../DeleteButton/DeleteButton";



export const Owner = ({owner, name = 'Proprietario', ownerId = undefined, son = 'true', thisClass = '', propertyID = ''}) => {
    const {reset, setReset} = useHomeContext();
    const [keys, setKeys] = useState([]);
    const [id, setId] = useState();
    const [isNew, setIsNew] = useState(false);
    const [properties, setProperties] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [show, setShow] = useState(true);
    const [data, setData] = useState(owner);
    
    var thisClassName = `form-data-id-owner${id}`;
    
    useEffect(()=>{
        console.log(reset);
    },[reset])
    
    useEffect(()=>{
        if(data){setKeys(Object.keys(data));
        if(!data['$ID']){
            dataFetch('getNextOwner').then(r=>setId(r.next));
            setIsNew(true);
        }else{setId(data['$ID'])}
        if(data['$PropriedadesID'])setProperties(data['$PropriedadesID']);}
    },[data])

    useEffect(()=>{
        if(ownerId){
            dataFetch('getOwnerByIndex', formatInit({$ID: ownerId})).then(r=>{
                setData(r);
            });
        }
    }, [ownerId])

    return <div className="myForm">
        <Title onClick={()=>{
            setShowMore(!showMore);
        }} >{name}</Title>
        {son && <div style={{display: `${showMore ? 'block' : 'none'}`}} >
            <input data-fieldname='$ID' className={thisClassName} defaultValue={id} />
            <input data-fieldname='$PropriedadesID' className={thisClassName} defaultValue={propertyID} />
        </div>}
        <div style={{display: `${show ? 'block' : 'none'}`}}>
        
        {keys && keys.map((keyValue, index)=>{
            
            
            if(!Array.isArray(data[keyValue]) && !keyValue.includes('$') && typeof data[keyValue] != 'object') 
                return <InputField fieldname={thisClass ? thisClass : ''} classForm={thisClassName} upValue={data[keyValue]} keyValue={keyValue} key={index}/>
            else if(keyValue.includes('$')) return null
           
            else return undefined
        })}

        {son && <SaveButton onClick={()=>{
            const elements = [...document.getElementsByClassName(thisClassName)];
            console.log(reset)
            const data = elements.map((each) => {
                return [each.dataset.fieldname, each.value]
            }
            )

            var obj = Object.fromEntries(data);
            dataFetch('createOwner', formatInit(obj)).then(r=>{
                setIsNew(false);
                console.log(r);
            });
            const {resetProperty} = reset;
            
            resetProperty();
        }}>{`${isNew ? 'Cadastrar Novo' : 'Atualizar Dados'}`}</SaveButton>}
        {!isNew && <DeleteButton>Excluir Proprietário</DeleteButton>}

        </div>
    </div>
}