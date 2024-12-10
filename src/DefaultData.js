
export const enterprise = {
    $ID: undefined,
    name : undefined,
    Avaliacao : undefined,
    Propriedades : [],
}

export const dataEnterprise = {
    $ID: 1,
    name : 'Marco',
    Avaliacao : '1233sadwqwqd3',
    Propriedades : [1,2,3,4,5],
}

export const Propriedade = {
    $ID : undefined,
    Nome : undefined,
    Area: undefined,
    Proprietarios : [],
}

export const Proprietario = {
$ID: undefined,
Nome: undefined,
Endereco: {
    Estado: undefined,
    Rua: undefined,
    Numero: undefined,
},
Fodaci: undefined,

}

export const defaultField = {
    Propriedades : Propriedade,
    Proprietarios : Proprietario, 
}