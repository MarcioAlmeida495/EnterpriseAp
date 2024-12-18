import { useEffect, useState } from 'react'
import './styles.css'

export const AddButton = ({children, onClick = () => {}, className = '', isClicked = false}) => {
    const [clicked, setClicked] = useState(isClicked);

    // useEffect(()=>{
    //     if(clicked)setTimeout(() => {
    //         setClicked(false);
    //     }, 1000);
    // },[clicked])

    return <>
        <button className={`addButton ${className}${clicked ? 'clicked' : ''}`} onClick={()=>{
            console.log(clicked)
            onClick(clicked)
            setClicked(true);
        }
            }>{children}</button>
    </>
}