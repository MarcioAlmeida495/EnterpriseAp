import { useEffect, useState } from "react"
import { InputField } from "../InputField/InputField";
import { AddButton } from "../AddButton/AddButton";
import { Owner } from "../Owner/Owner";
import { Proprietario } from "../../DefaultData";
import { dataFetch, formatInit } from "../../Functions";
import { SaveButton } from "../SaveButton/SaveButton";
import { useDataProvider } from "../../Contexts/AllDataContext";
import { useHomeContext } from "../../Contexts/HomeContext";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { Title } from "../Title/Title";
import { handleGetDataProperty } from "../../Handles";



export const Property = ({property, openByIndex = undefined,name = 'Propriedade', type = '', indexOfEnterprise = ''}) => {
    const {reset, setReset} = useHomeContext();
    const [id, setId] = useState();

    const [keys, setKeys] = useState([]);
    const [owners, setOwners] = useState();
    const [data, setData] = useState();
    const {setDataRight, setDataMiddle} = useDataProvider();
    const [ isNew, setIsNew ] = useState(false);
    const [showMore, setShowMore] = useState(false);
    var thisClassName = `form-data-id-property${id}`;
    

    useEffect(()=>{
        
        setReset(r => {return {...r, resetProperty: () => {
            console.log('resetProperty')
            setTimeout(() => {
                handleGetDataProperty(setData, id, 'getPropertyByIndex');
            }, 50);
        }}})
    },[id, setReset])

    useEffect(()=>{
        if(openByIndex){
            dataFetch('getPropertyByIndex', formatInit({id: openByIndex})).then(r=>{
                setData(r);
            });
        }
        else if(property){
            
            setData(property);
        }
    },[openByIndex, property])

    useEffect(()=>{
        if(data){
            console.log('data-->',data)
            if(data['$ID']){
                setIsNew(false)
                console.log(data['$ID'])
                setId(data['$ID']);
            } 
            else {
                dataFetch('getNextProperty').then(r=>{
                    setId(r.next);
                    setIsNew(true);
                }
            )
        }
        setKeys(Object.keys(data));
        if(data['Proprietarios'])setOwners(data['Proprietarios'])
        }
    },[data])
    
    if(data) return <div className="myForm">
        <Title onClick={()=>{
            console.log('showmore', showMore)
            setShowMore(!showMore);
        }} >{name}</Title>
        <div style={{display: `${showMore ? 'block' : 'none'}`}} >
            <input data-fieldname={'$ID'} className={thisClassName} name="$ID" defaultValue={id}/>
            <input data-fieldname={'$EnterpriseID'} className={thisClassName} name="$EnterpriseID" defaultValue={indexOfEnterprise}/>
        </div>

        {keys && keys.map((keyValue, index)=>{
            if(!Array.isArray(data[keyValue]) && !keyValue.includes('$')) return <InputField  classForm={thisClassName} upValue={data[keyValue]} keyValue={keyValue} key={index}/>
            else return undefined
        })}
        
            
        <div className="slide-content">
            { data['Proprietarios'].map((data, index)=>{
                return <AddButton key={index} onClick={()=>{
                    console.log(reset)
                    setDataRight(<Owner name={`Proprietário ${Number(index+1)}`} propertyID={id} ownerId={data} />)
                }}>{`${index+1}`}</AddButton>
            })}
            {!isNew && <AddButton onClick={()=>{
                setDataRight(<Owner propertyID={id} owner={Proprietario} />)
            }}>+</AddButton>}
        
        </div>
        <SaveButton onClick={()=>{
            var values = document.getElementsByClassName(thisClassName);
            values = [...values];
        

            values = values.map(value => {
                return [value.dataset.fieldname, value.value];
            })
            
            var obj = Object.fromEntries(values);
            obj = {...obj, Proprietarios : owners}
            dataFetch('createProperty', formatInit({data: obj})).then(r=>{
                const {resetEnterprise} = reset;
                console.log('aqui ??? ')
                if(isNew){
                    setTimeout(() => {
                        console.log('property');
                        setDataMiddle(<></>);
                        setTimeout(() => {
                            setDataMiddle(<Property openByIndex={id}/>)
                        }, 0);
                    }, 0);
                    resetEnterprise();
                }
                
            })
        }} >{`${isNew ? 'Cadastrar Propriedade' : 'Salvar Dados'}`}</SaveButton>
        {!isNew && <DeleteButton>Excluir Propriedade</DeleteButton>}
        </div>
    else <></>
}