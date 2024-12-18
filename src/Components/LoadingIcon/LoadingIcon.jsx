import { useEffect, useState } from 'react'
import './styles.css'

export const LoadingIcon = () => {
    const [change, setChange] = useState(true);

    useEffect(()=>{
        change && setTimeout(() => {
            setChange(!change)
        }, 500);
    },[])
    return <>
        {change ? <div className="loading"></div> : <div className="checkmark">
  <div className="check"></div>
</div>
}

    </>
}