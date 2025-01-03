const defaultURL = 'http://192.168.1.5:40';
export const getURL = ({prefixURL = defaultURL, sufixURL}) => `${prefixURL}/${sufixURL}`;

export const dataFetch = (URL, init) => new Promise((resolve, reject) => {
  console.log('url e init == > ',URL, init);  
  URL = getURL({sufixURL: URL});
  console.log(init);  
    
    if(init){
      console.log('aquii')
      fetch(URL, init)
          .then(r=>{
            return r.json()
          })
          .then(r=>{
            resolve(r);
          })
        }else {
          fetch(URL)
              .then(r=>r.json())
              .then(r=> {
                    resolve(r)})
          
        } 
})
export const formatInit = (anyObject = {}) => {
    return {
      method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
        'Authorization': 'Bearer token'     // Exemplo de autenticação
      },
      body: JSON.stringify(anyObject)
    }
  }
export const getEnterprise = () => {
    return 's'
}
