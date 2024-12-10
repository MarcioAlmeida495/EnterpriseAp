import { useState } from "react"

export const InputField = ({upValue = '', id = '', keyValue = ''}) => {
    const [value, setValue] = useState(upValue);

    return <>
        <label className="input-label">{keyValue}
            <input id={id} value={value} onChange={(event)=>{
                setValue(event.target.value)
            }} className="input-field" ></input>
        </label>
    </>
}