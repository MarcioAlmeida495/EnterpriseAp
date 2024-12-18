const {_, create} = require('lodash');
const fs = require('fs');
// Convertendo o objeto JSON para string
const jsonData = (data) => JSON.stringify(data, null, 2);

// Caminho do arquivo onde o JSON será salvo
const caminhoArquivo = (nome) => `./${nome}.json`;


const enterprises = `./enterprises.json`;
const properties = `./properties.json`;
const owners = `./owners.json`;


const express = require('express');
const app = express();
const port  = 40;
const cors = require('cors');
app.use(cors());
// console.log("rodando em : " + port);
app.listen(port, ()=>{console.log('rodando')});
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
const {  getDefaultObject, getOwner, getEnterprise, getProperty, getDefaultField } = require('./DefaultData');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;

if(!fs.existsSync(enterprises)){
    fs.writeFile(enterprises, jsonData([]), (err)=>{
    if(err){
        // console.log('erro ao escrever o arquivo', err);
    }
    else{
        // console.log('arquivo criado');
    }
})

}else{
    // console.log('arquivo ja existe');
}

if(!fs.existsSync(properties)){
    fs.writeFile(properties, jsonData([]), (err)=>{
    if(err){
        // console.log('erro ao escrever o arquivo', err);
    }
    else{
        // console.log('arquivo criado');
    }
})

}else{
    // console.log('arquivo ja existe');
}
if(!fs.existsSync(owners)){
    fs.writeFile(owners, jsonData([]), (err)=>{
    if(err){
        // console.log('erro ao escrever o arquivo', err);
    }
    else{
        // console.log('arquivo criado');
    }
})

}else{
    // console.log('arquivo ja existe');
}

app.get('/teste', (req, res) => {
    // console.log('requerimento');
    res.json({msg: 'teste'});
})



app.post('/createEnterprise', (req, res) => {
    const {body} = req;
    const {data} = body;
    const {$ID} = data;
    var newDataFromBody = data;

    // console.log(body)
    // if(Propriedade) {
    //     const {proprietario} = Propriedade[0];
        // console.log(proprietario)
    // }

    fs.readFile(enterprises, (err, data)=>{
        // console.log(enterprises)
        var newData = JSON.parse(data);

        var createNew = true;

        newData.forEach((each, index)=>{
            if(each['$ID'] === newDataFromBody['$ID']){
                newData[index] = newDataFromBody;
                createNew = false;
            } 
        })
        if(createNew)newData = [...newData, newDataFromBody];
        
        fs.writeFile(enterprises, jsonData(newData), (err)=>{
            res.json({data: newData})
        })
    })

})

app.post('/createProperty', (req, res) => {
    const {body} = req;
    const {data} = body;
    const {$ID} = data;
    const {$EnterpriseID} = data;
    var newDataFromBody = data;

    // console.log(body)
    // if(Propriedade) {
    //     const {proprietario} = Propriedade[0];
        // console.log(proprietario)
    // }

    fs.readFile(properties, (err, data)=>{
        
        var newData = JSON.parse(data);

        var createNew = true;

        newData.forEach((each, index)=>{
            if(each['$ID'] === newDataFromBody['$ID']){
                newData[index] = newDataFromBody;
                createNew = false;
            } 
        })
        if(createNew) newData = [...newData, newDataFromBody];

        fs.writeFile(properties, jsonData(newData), (err)=>{

            res.json({data: newData})
        })

        if(createNew) {fs.readFile(enterprises, (err, data) => {
            var newData = JSON.parse(data);
            newData.forEach( (each,index) => {
                if(each['$ID'] === $EnterpriseID){
                    if(!each['Propriedades'].includes($ID)) each['Propriedades'] = [...each['Propriedades'], $ID];
                    newData[index] = each;
                }
            });
            fs.writeFile(enterprises, jsonData(newData), (err)=>{});

        })

        
        }   
    })

})

const saveProperty = ({enterprises = './properties.json', data}) => {
    fs.writeFile(enterprises, jsonData(data), (err) => {
        if(!err) return {msg: 'Cadastrado com Sucesso!'}
        else return {msg: 'Falha ao cadastrar.'} 
    })
}

app.get('/getEnterprise', (req,res)=>{
    res.json(getEnterprise)
})

app.post('/getEnterpriseById', (req,res) => {
    fs.readFile(enterprises, (err,data) => {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        jsonData.forEach(each => {
            if(each['$ID'] === req.body.id){
                res.json(each);
            }
        })
    })
})

app.get('/getAllEnterprises', (req,res)=>{
    fs.readFile(enterprises, (err, data)=>{
        // console.log('all enterprises',data);
        var object = JSON.parse(data);
        res.json({data: object});
    })
})

app.get('/getNextEnterprise', (req,res)=>{
    fs.readFile(enterprises, (err, data)=>{
        // console.log(data);
        var object = JSON.parse(data);
        res.json({next: object.length});
    })
})
app.get('/getNextProperty', (req,res)=>{
    fs.readFile(properties, (err, data)=>{
        // console.log(data);
        var object = JSON.parse(data);
        res.json({next: object.length});
    })
})
app.get('/getProperty', (req, res) => {
    res.json(getProperty);
})
app.post('/getPropertyByIndex', (req,res)=>{
    
    
    const {body} = req;
    const {id} = body;
    // var newDataFromBody = data;

    // console.log(body);
    // if(Propriedade) {
    //     const {proprietario} = Propriedade[0];
        // console.log(proprietario)
    // }

    fs.readFile(properties, (err, data)=>{
        // console.log(enterprises)
        var newData = JSON.parse(data);
        // console.log()
        newData.forEach(data=>{
            if(data['$ID'] === id){ 
                res.json(data)}
        })
        
    })
})
app.get('/getOwner', (req, res)=>{
    res.json(getOwner);
})
app.get('/getDefaultField', (req,res)=>{
    // console.log(getDefaultField);
    res.json(getDefaultField)
})

app.get('/getNextOwner', (req,res)=>{
    fs.readFile(owners, (err,data)=>{
        const json =  JSON.parse(data);
        res.json({next: json.length})
    })
})
app.post('/getOwnerByIndex', (req,res)=>{
    const {$ID} = req.body;

    fs.readFile(owners, (err, data)=>{
        var obj = JSON.parse(data);
        obj.forEach(each => {
            if(each['$ID'] === $ID){
                res.json(each)
            }
        })
    })
})
app.post('/createOwner', (req,res) => {
    const {$ID} = req.body;
    const {$PropriedadesID} = req.body;
    console.log($ID);
    const {body} = req;
    console.log('body-->',body);
    
    fs.readFile(properties, (err,data)=>{
        var obj = JSON.parse(data);
        obj.forEach( (each, index) => {
            if(each['$ID'] === $PropriedadesID){
                if(!each['Proprietarios'].includes($ID)) obj[index]['Proprietarios'] = [...each['Proprietarios'], $ID];
            }
        });
        fs.writeFile(properties, jsonData(obj), (err)=>{
            console.log('properties alterado');
        })
    })

    fs.readFile(owners, (err, data)=>{
        var obj = JSON.parse(data);
        var isNewOwner = true;
        obj.forEach((each,index)=>{
            const id = each['$ID'];
            console.log(`comparando ${id} com ${$ID}`)

            console.log(each)
            if(id === $ID){
                console.log('entrou')
                isNewOwner = false;
                obj[index] = body;
            }
        })
        console.log(obj)
        if(isNewOwner) obj = [...obj, body];
        fs.writeFile(owners, jsonData(obj), (err)=>{
            
            res.json({msg: 'tudo Certo'});
        })
    })
})