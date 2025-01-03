import './styles.css'
export const Title = ({children, onClick= ()=>{}, fontSize = ''}) => {
    return <p onClick={()=>{onClick()}} className='Title1' style={{fontSize: fontSize}} >{children}</p>
}