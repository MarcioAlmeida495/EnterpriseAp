import { useState } from 'react'
import './styles.css'

export const AddButton = ({children, onClick = () => {}}) => {
    const [clicked, setClicked] = useState(false)
    return <>
        <button className={`addButton ${clicked ? 'clicked' : ''}`} onClick={()=>{
            onClick(clicked)
            setClicked(!clicked);
        }
            }>{children}</button>
    </>
}