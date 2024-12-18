import { useEffect, useRef, useState } from "react"
import { InputField } from "../InputField/InputField";
import { AddButton } from "../AddButton/AddButton";
import { dataFetch, formatInit } from "../../Functions";
import { SaveButton } from "../SaveButton/SaveButton";
import { Title } from "../Title/Title";



export const Owner = ({owner, name = 'Proprietario', ownerId = undefined, son = 'true', thisClass = '', propertyID = ''}) => {
    console.log('entrando no owner')
    const [keys, setKeys] = useState([]);
    const [id, setId] = useState();
    const [properties, setProperties] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [show, setShow] = useState(true);
    const [data, setData] = useState(owner);
    var thisClassName = `form-data-id-owner${id}`;
    
    
    useEffect(()=>{
        if(data){setKeys(Object.keys(data));
        if(!data['$ID']){
            dataFetch('getNextOwner').then(r=>setId(r.next))
        }else{setId(data['$ID'])}
        if(data['$PropriedadesID'])setProperties(data['$PropriedadesID']);}
    },[data])

    useEffect(()=>{
        if(ownerId){
            dataFetch('getOwnerByIndex', formatInit({$ID: ownerId})).then(r=>{
                setData(r);
            }
            );
        }
    }, [ownerId])

    return <div className="myForm">
        <Title onClick={()=>{
            console.log('showmore', showMore)
            setShowMore(!showMore);
        }} >{name}</Title>
        {son && <div style={{display: `${showMore ? 'block' : 'none'}`}} >
            <input data-fieldname='$ID' className={thisClassName} defaultValue={id} />
            <input data-fieldname='$PropriedadesID' className={thisClassName} defaultValue={propertyID} />
        </div>}
        <div style={{display: `${show ? 'block' : 'none'}`}}>
        
        {keys && keys.map((keyValue, index)=>{
            console.log('TESTE--> data',data[keyValue])
            console.log('tipo de keyvalue', typeof data[keyValue])
            
            
            if(!Array.isArray(data[keyValue]) && !keyValue.includes('$') && typeof data[keyValue] != 'object') 
                return <InputField fieldname={thisClass ? thisClass : ''} classForm={thisClassName} upValue={data[keyValue]} keyValue={keyValue} key={index}/>
            else if(keyValue.includes('$')) return null
            else if(typeof data[keyValue] === 'object')
                return <Owner thisClass={`Endereco `} son={false} name={keyValue} data={data[keyValue]}/>
            else return undefined
        })}

        {son && <SaveButton onClick={()=>{
            const elements = [...document.getElementsByClassName(thisClassName)];
            const data = elements.map((each) => {

                
                return [each.dataset.fieldname, each.value]
            }
            )

            var obj = Object.fromEntries(data);
            dataFetch('createOwner', formatInit(obj)).then(r=>console.log)
            console.log(obj)
        }}>Salvar Dados</SaveButton>}
        </div>
    </div>
}