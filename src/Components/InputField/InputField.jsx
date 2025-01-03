import { useEffect, useState } from "react";
import './styles.css';

export const InputField = ({upValue = '', id = '', keyValue = '', classForm = '', fieldname = '', onChange = ()=>{}, placeholder = '', style = {}}) => {
    const [value, setValue] = useState(upValue);
    useEffect(()=>{
        onChange(value);
    },[value, onChange])
    return <>
        <label className="input-label">{keyValue}
            <input placeholder={placeholder} data-fieldname={`${fieldname}${keyValue}`} id={id} name={`${fieldname}${keyValue}`} value={value} onChange={(event)=>{
                setValue(event.target.value)
            }} className={`input-field ${classForm}`} style={style} ></input>
        </label>
    </>
}