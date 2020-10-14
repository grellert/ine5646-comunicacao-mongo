
function exitError(msg){
    console.log("erro! ", msg);
    if(client)
        client.close();
}

function insertWord(word, definition, collection){
    const doc = {
        'word': word,
        'definition': definition
    };
    collection.insertOne(doc)
        .then(res => console.log(`Adicionado: ${res.insertedId}`))
        .catch(erro => exitError(erro));
}

function printDefinition(palavra, collection){
    const query = {'word': palavra};

    collection.findOne(query)
    .then(res => { //imprime a definicao
        if(res)
            console.log(res.definition)
        else
            console.log("Palavra não encontrada");
    })
    .catch(erro => exitError(erro));
}

function onConnected(client){
    db = client.db('dicionario');

    const collection = db.collection('palavras');
    
    insertWord("teste1","testando 1", collection);
    insertWord("teste2","testando 2", collection);
    insertWord("teste3","testando 3", collection);

    printDefinition("teste1", collection);
    printDefinition("teste2", collection);
    printDefinition("teste3", collection);
}

const {MongoClient} = require('mongodb');

const MONGO_URL = `mongodb://localhost/27017`;

var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});

client.connect()
    .then(onConnected)
    .catch(erro => exitError(erro));

