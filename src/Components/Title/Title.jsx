import './styles.css'
export const Title = ({children, onClick= ()=>{}}) => {
    return <p onClick={()=>{onClick()}} className='Title1' >{children}</p>
}