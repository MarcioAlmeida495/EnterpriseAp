import { dataFetch } from "./Functions"



export const enterprise = {
    $ID: '',
    Nome : '',
    Avaliacao : '',
    Propriedades : [],
}

export const dataEnterprise = {
    $ID: 1,
    name : 'Marco',
    Avaliacao : '1233sadwqwqd3',
    Propriedades : [1,2,3,4,5],
}

export const Propriedade = {
    $ID : '',
    Nome : '',
    Area: '',
    Proprietarios : [],
    $EnterpriseID: '',
}

export const Proprietario = {
    $ID: '',
    Numero_Da_Torre: '',
    Nome: '',
    CPF: '',
    RG: '',
    E_Mail: '',
    
        Estado: '',
        Cidade: '',
        Bairro: '',
        Rua: '',
        Numero: '',
        CEP: '',
    
    Profissao: '',
    Estado_Civil: '',
    Telefone: '',
    $PropriedadesID: []

}

export const defaultField = {
    Propriedades : Propriedade,
    Proprietarios : Proprietario, 
}

export const defaultFunc = async () => {
    dataFetch('getDefaultField').then(r=>{
        console.log(r);
        return r
    })
    
    var data = await dataFetch('getDefaultField');

    console.log(data);
    return data;
}