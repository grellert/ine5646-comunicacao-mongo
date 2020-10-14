// versão alternativa usando async/await -- RECOMENDADO

// declaramos funções assíncronas com async 
async function insertWord(word, definition, collection){
    const doc = {
        word: word,
        definition: definition
    };
    // toda promise é precedida de um await - bloqueia a execução dessa função até ser completada
    res = await collection.insertOne(doc);  
    console.log(`Adicionado: ${res.insertedId}`);
}

async function printDefinition(palavra, collection){
    const query = {word: palavra};
    res = await collection.findOne(query); 
   
    if(res)
        console.log(res.definition)
    else
        console.log("Palavra não encontrada");
}

async function printAll(collection){
    const words = await collection.find().toArray();
    for(wordObj of words){
        console.log(wordObj.word, wordObj.definition);
    }
}

const {MongoClient} = require('mongodb');

const MONGO_URL = `mongodb://localhost/27017`;
var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});

client.connect((err, conn) => {
  if(err){
      console.dir(err);
  }

  db = conn.db('dicionario');

  const collection = db.collection('words');

  insertWord("teste","testando", collection);
  printDefinition("teste", collection);
  printDefinition("teeste", collection);
  printAll(collection);
});
