import express from 'express'

const app = express()
const bodyParser = require('body-parser')

app.use(express.static('cliente'));

// forma 1 de receber dados - GET com forms HTML
app.get("/registeruserform", function(req,res) {
  console.log(req.url);
  const body = req.query;
  const user = body.user;
  const email = body.mail;
  res.send(`GET: Nome: ${user},  email: ${email} `)
});

// forma 2 de receber dados - POST com forms HTML
app.use(bodyParser.urlencoded({ extended: false }))
app.post("/registeruserform", function(req,res) {
  const body = req.body;
  const user = body.user;
  const email = body.mail;
  res.send('POST: Nome: ' + user + ', email: ' + email);
});

//forma 3 de receber dados - POST fetch + json parser 
app.use(bodyParser.json())
app.post("/registeruserfetch", function(req,res) {
  const body = req.body;
  const user = body.user;
  const email = body.mail;
  res.send('POST: Nome: ' + user + ', email: ' + email);  
});     


// forma 4 de receber dados - GET com route params
app.get("/registeruserurl/:user/:mail", function(req,res) {
  console.log(req.url);
  const routeParams = req.params;
  const user = routeParams.user;
  const email = routeParams.mail;

  res.send('GET: Nome: ' + user + ', email: ' + email);  
});  

app.listen(3000, console.log("escutando na porta 3000"))
