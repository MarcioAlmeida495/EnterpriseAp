import { Propriedade } from '../../DefaultData'
import { Property } from '../Property/Property'
import './styles.css'

export const Modal = ({children, close}) => {

    return <div className="modal">
        <div className="modal-content">
            <button onClick={()=>close()} className='closeButton'>x</button>
            {children}
        </div>
    </div>
}