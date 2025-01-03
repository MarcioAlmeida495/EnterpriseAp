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
import { PrintBy } from "../PrintBySearch";
import { gerarDocumentoENovaAba } from "../../DocXGenerate";
const dados = {
    nomeproprietario: "João Silva",
    cnpj: "00.000.000/0000-00",
    estadocivil: "Casado",
    profissao: "Engenheiro",
    email: "joao.silva@example.com",
    telefone: "(31) 99999-9999",
    enderecocompleto: "Rua Exemplo, 123, Centro, Belo Horizonte, MG",
    empreendimento: "Linha de Transmissão LT-123",
    propriedade: "Terreno Rural",
    matricula: "12345",
    valorIndenizacao: "R$ 50.000,00",
    area: "500m²",
    datalimite: "08/07/2024",
    numerocontato: "(31) 99999-9999",
    emailcontato: "contato@example.com",
};

export const Home = ({children}) => {
    const {reset} = useHomeContext();
    const [enterprises, setEnterprises] = useState();
    const [counterReset] = useState(0);
    const [dataMiddle, setDataMiddle] = useState();
    const [dataRight, setDataRight] = useState();
    const [dataFirst, setDataFirst] = useState();
    const [filterValues, setFilterValues] = useState('');
    const [showModal, setShowModal] = useState(false)
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

    useEffect(()=>{
        console.log('rerenderizando')
    })

    useEffect(()=>{
        // gerarDocumentoENovaAba(dados, 'http://192.168.1.5:40/getTerm');
    },[])

    return <DataProvider value={{setDataMiddle, dataMiddle, setDataRight, dataRight, setDataFirst, dataFirst}}>
        {showModal && <PrintBy OpenModal={showModal} onClose={()=>{setShowModal(false)}}/>}
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
        <SaveButton onClick={()=>{
            setShowModal(true);
        }}>Comandos</SaveButton>
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