import { InputField } from '../InputField/InputField';
import { SaveButton } from '../SaveButton/SaveButton';
import './styles.css';
export const PrintBy = ({OpenModal = false, onClose = () => {}}) => {
    return OpenModal && <>
        <div className="divPrinterModal">
                <div className="divPrinter" >
                    <InputField  onChange={(value)=>{console.log(value)}} placeholder='digite o comando' />
                    <SaveButton>Go</SaveButton>
                    <button onClick={()=>{
                        console.log('oi')
                        onClose();
                    }}>close</button>
                </div>
            </div>
    </>
}