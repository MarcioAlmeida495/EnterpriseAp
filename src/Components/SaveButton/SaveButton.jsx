import { useEffect, useState } from 'react'
import './styles.css'

export const SaveButton = ({children, onClick = () => {}, className = '', style = {}}) => {
    const [clicked, setClicked] = useState(false);
    
    useEffect(()=>{
        
        if(clicked) setTimeout(() => {
            setClicked(!clicked);
        }, 2000);
    },[clicked])

    return <>
        <button  className={`saveButton ${className} ${clicked ? 'clicked' : ''}`} style={style} onClick={()=>{
            onClick(clicked)
            setClicked(!clicked);
            
        }
            }>{children}</button>
    </>
}