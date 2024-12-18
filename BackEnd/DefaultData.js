

 const getDefaultProperty = {
    Area: 0,
    Avaliacao: '',
    Numero_Da_Torre: '',
    Proprietarios: []
}

 const getDefaultEnterprise = {
    Nome: '', //pesquisa
    Cidade: '', //pesquisa
    Propriedades: []
}

 const getDefaultOwner = {
    $PropertyID: '',
    $OwnerID: '',
    Numero_Da_Torre: '',
    Nome: '',
    CPF: '',
    RG: '',
    E_Mail: '',
    Endereco: {
        Estado: '',
        Cidade: '',
        Bairro: '',
        Rua: '',
        Numero: '',
        CEP: '',
    },
    Profissao: '',
    Estado_Civil: '',
    Telefone: '',
}

 const getDefaultField = {
    Proprietarios: {
        type: 'Array',
        object: getDefaultOwner,
    },
    Propriedades: {
        type: 'Array',
        object: getDefaultProperty,
    },
    Empreendimento: {
        type: 'Object',
        object: getDefaultEnterprise,
    },
}

module.exports = {
    getDefaultObject: function () {
        var enterprise = getDefaultEnterprise;
        var property = getDefaultProperty;
        var owner = getDefaultOwner;

        property.Proprietarios = []
        property.Proprietarios[0] = owner
        
        enterprise.Propriedades = []
        enterprise.Propriedades[0] = property
        
        return enterprise;
    },
    getEnterprise: {
        $ID: '',
        Nome: '', //pesquisa
        Avaliacao: '', //pesquisa
        Propriedades: []
    },
    getProperty: {
        $ID: '',
        Area: '',
        Avaliacao: '',
        Numero_Da_Torre: '',
        Proprietarios: []
    }, 
    getOwner: {
        $PropertyID: '',
        $OwnerID: '',
        Numero_Da_Torre: '',
        Nome: '',
        CPF: '',
        RG: '',
        E_Mail: '',
        Endereco: {
            Estado: '',
            Cidade: '',
            Bairro: '',
            Rua: '',
            Numero: '',
            CEP: '',
        },
        Profissao: '',
        Estado_Civil: '',
        Telefone: '',
    },
    getDefaultField: {
        Propriedades : getDefaultOwner,
        Proprietarios : getDefaultProperty,
    }
}
// export const getDefaultObject = () => {
//     var enterprise = getDefaultEnterprise;
//     var property = getDefaultProperty;
//     var owner = getDefaultOwner;
//     property.proprietario = owner
//     enterprise.Propriedade = property
//     return enterprise;
// }
 const getDefaultKeysNames = ({obj, concat = ''}) => {
    console.log('concat:: ', concat);
    var entries = Object.entries(obj);
    entries.forEach((entry) => {
        console.log('entry!',entry);
        console.log('entry typeof', typeof entry[1])
        if(typeof entry[1] === 'object') getDefaultKeysNames({obj:entry[1], concat: `${concat}[${entry[0]}]`});
        else console.log('concat: ', `${concat}${entry[0]}`);
    })
    
}