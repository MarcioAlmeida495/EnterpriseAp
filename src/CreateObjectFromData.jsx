import React, { useState } from "react";
import { AddButton } from "./Components/AddButton/AddButton";
import { InputField } from "./Components/InputField/InputField";
import { defaultField, defaultFunc, Propriedade } from "./DefaultData";
import { dataFetch } from "./Functions";

var fields = await defaultFunc();
console.log('fields-->', fields)

function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  
export const FieldSetFromData = ({data, nameOf = '', classSon = ''}) => {
  var keys = Object.keys(data);
  const [buttons, setButtons] = useState([1]);
  const [showComponent, setShowComponent] = useState(false);
  return <div className={`${"myForm "}${classSon}`} >
    <legend>{nameOf}</legend>
    {keys.map((keyValue, index)=>{
      if(keyValue.includes('$'))return undefined;
      if(isObject(data[keyValue])){
        return <React.StrictMode key={index}>
        {FieldSetFromData({data:data[keyValue], nameOf: keyValue})}
        </React.StrictMode>
      }else if(Array.isArray(data[keyValue])){
        return <>
          <div className="slide-content">
          {data[keyValue].map((value, index)=>{
            return <AddButton key={index} className="card-content">{`P${index+1}`}</AddButton>
          })}
          {
            buttons.map((button, index)=>{
              return <AddButton className="card-content" key={index} onClick={(bool)=>{
                setShowComponent(!bool);
                setButtons([...buttons, 1]);
              }}>{showComponent ? `${keyValue.charAt(0)}${data[keyValue].length + 1}` : '+'}</AddButton>
            })
          }
              <AddButton className="card-content" key={index} onClick={(bool)=>{
                setShowComponent(!bool);
                setButtons([...buttons, 1]);
              }}>{showComponent ? `${keyValue.charAt(0)}${data[keyValue].length + 1}` : '+'}</AddButton>

          </div>
          {showComponent && <div><FieldSetFromData classSon="Son" data={defaultField[keyValue]} nameOf={`${keyValue}${data[keyValue].length+1}`}/></div>}
        </>
      }
      else{
        return <div className="input-container" key={`${keyValue}${index}`}>
          <InputField keyValue={keyValue} upValue={data[keyValue]}/>
        </div>
      }
    })}
  </div>
}