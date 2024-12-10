import { useState } from "react"
import { useEffect } from "react"
import { CreateFieldSet, FieldSetFromData } from "../../CreateObjectFromData";
import { enterprise, Propriedade, Proprietario, dataEnterprise } from "../../DefaultData";

const dataKey = "Empreendimento"

export const Home = ({children}) => {
    const [components, setComponents] = useState();
    
    return <>
        <h1>{dataKey}</h1>
        <FieldSetFromData nameOf={dataKey} data={dataEnterprise} />
    {children}</>
}