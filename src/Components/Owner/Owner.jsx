import { useEffect, useRef, useState } from "react"
import { InputField } from "../InputField/InputField";
import { AddButton } from "../AddButton/AddButton";
import { dataFetch, formatInit } from "../../Functions";
import { SaveButton } from "../SaveButton/SaveButton";
import { Title } from "../Title/Title";
import { useHomeContext } from "../../Contexts/HomeContext";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { gerarDocumentoENovaAba } from "../../DocXGenerate";



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
        {!isNew && <>
            <SaveButton onClick={()=>{
                dataFetch('getAllDataByOwnerID', formatInit({id: data['$ID']})).then(r=>{
                    console.log(r);
                    const OwnerData = r.Owner;
                    const PropertyData = r.Property;
                    const Enterprise = r.Enterprise;

                    const dados = {
                        nomeproprietario: OwnerData.Nome,
                        cnpj: OwnerData.CPF,
                        estadocivil: OwnerData.Estado_Civil,
                        profissao: OwnerData.Profissao,
                        email: OwnerData.E_Mail,
                        telefone: OwnerData.Telefone,
                        enderecocompleto: `${OwnerData.Rua}, ${OwnerData.Numero}, ${OwnerData.Bairro}, ${OwnerData.Cidade}`,
                        empreendimento: Enterprise.Nome,
                        propriedade: PropertyData.Nome,
                        matricula: "12345",
                        valorIndenizacao: "R$ 50.000,00",
                        area: PropertyData.Area,
                        datalimite: "08/07/2024",
                        numerocontato: "(31) 99999-9999",
                        emailcontato: "contato@example.com",
                    };

                    gerarDocumentoENovaAba(dados, 'http://192.168.1.5:40/getTerm');
                })
            }}>Imprimir Termo</SaveButton>
            <DeleteButton>Excluir Proprietário</DeleteButton>
        </>
            }
        
        
        </div>
    </div>
}