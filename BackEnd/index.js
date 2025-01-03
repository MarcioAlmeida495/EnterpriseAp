const fs = require('fs');
// Convertendo o objeto JSON para string
const jsonData = (data) => JSON.stringify(data, null, 2);

// Caminho do arquivo onde o JSON será salvo

const prefixPath = 'C:/Users/marci/Documents'
const caminhoArquivo = (nome) => `${prefixPath}/${nome}.json`;

const enterprises = caminhoArquivo('enterprises');
const properties = caminhoArquivo('properties');
const owners = caminhoArquivo('owners');


const express = require('express');
const app = express();
const port  = 40;
const cors = require('cors');
app.use(cors());
// console.log("rodando em : " + port);
app.listen(port, ()=>{console.log('rodando na porta ', port)});
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
const { getOwner, getEnterprise, getProperty, getDefaultField } = require('./DefaultData');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;

if(!fs.existsSync(enterprises)){
    fs.writeFile(enterprises, jsonData([]), (err)=>{
    if(err){
    }
    else{
    }
})

}else{
}

if(!fs.existsSync(properties)){
    fs.writeFile(properties, jsonData([]), (err)=>{
    if(err){
    }
    else{
    }
})

}else{
}
if(!fs.existsSync(owners)){
    fs.writeFile(owners, jsonData([]), (err)=>{
    if(err){
    }
    else{
    }
})

}else{
}

app.get('/teste', (req, res) => {
    res.json({msg: 'teste'});
})



app.post('/createEnterprise', (req, res) => {
    const {body} = req;
    const {data} = body;
    var newDataFromBody = data;

    

    fs.readFile(enterprises, (err, data)=>{
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



app.get('/getEnterprise', (req,res)=>{
    res.json(getEnterprise)
})

app.post('/getEnterpriseById', (req,res) => {
    console.log('getEnterpriseByID');
    console.log(req.body);
    fs.readFile(enterprises, (err,data) => {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        jsonData.forEach(each => {

            if(String(each['$ID']) === String(req.body.id)){
                console.log('resposta -- > ', each)
                res.json(each);
            }
        })
    })
})

app.get('/getAllEnterprises', (req,res)=>{
    fs.readFile(enterprises, (err, data)=>{
        var object = JSON.parse(data);
        res.json({data: object});
    })
})

app.get('/getNextEnterprise', (req,res)=>{
    fs.readFile(enterprises, (err, data)=>{
        var object = JSON.parse(data);
        res.json({next: object.length});
    })
})
app.get('/getNextProperty', (req,res)=>{
    fs.readFile(properties, (err, data)=>{
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

    

    fs.readFile(properties, (err, data)=>{
        var newData = JSON.parse(data);

        newData.forEach(data=>{
            
            if(Number(data['$ID']) === Number(id)){ 
                res.json(data)}
        })
        
    })
})
app.get('/getOwner', (req, res)=>{
    res.json(getOwner);
})
app.get('/getDefaultField', (req,res)=>{
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
app.get('/getDefaultTerm', (req, res) => {
    // Caminho para o arquivo .docx
    const filePath = path.join(__dirname, 'termoNegociacao.docx');
    
    // Envia o arquivo para o cliente
    res.download(filePath, 'termoNegociacao.docx', (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err);
            res.status(500).send("Erro ao enviar o arquivo.");
        }
    });
});
app.get('/getTerm', (req, res) => {
    const filePath = path.join(__dirname, 'termoNegociacaoAtt.docx');
    
    // Lê o arquivo como buffer
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }

        // Define o tipo MIME para o arquivo .docx
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        // Envia o arquivo como resposta
        res.send(data);
    });
});
app.post('/getAllDataByOwnerID', (req,res)=>{
    const {body} = req;
    const {id} = body;
    console.log(body);
    fs.readFile(owners, (err, data) => {
        var resOwner = JSON.parse(data);
        resOwner.forEach(Owner => {
            if(Number(Owner['$ID']) === Number(id)){
                fs.readFile(properties, (err,data) => {
                    var resProperty = JSON.parse(data);
                    resProperty.forEach(Property => {
                        if(Number(Property['$ID']) === Number(Owner['$PropriedadesID'])){
                            fs.readFile(enterprises, (err,data) => {
                                var resEnterprise = JSON.parse(data);
                                resEnterprise.forEach(Enterprise => {
                                    if(Number(Enterprise['$ID']) === Number(Property['$EnterpriseID'])){
                                        res.json({Owner, Property, Enterprise})
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
        // res.json(response);
    })
})
app.post('/createOwner', (req,res) => {
    const {$ID} = req.body;
    const {$PropriedadesID} = req.body;
    const {body} = req;
    
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

            if(id === $ID){
                isNewOwner = false;
                obj[index] = body;
            }
        })
        if(isNewOwner) obj = [...obj, body];
        fs.writeFile(owners, jsonData(obj), (err)=>{
            
            res.json({msg: 'tudo Certo'});
        })
    })
})