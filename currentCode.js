const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
})

app.get('/time', (req, res) => {
  res.send(new Date().toString());
})


let port = 8080;
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
});

// Allow cross-origin requests (dont worry about this for now. If you want to know more, google it or ask questions after the lesson)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next();
});

let api = express.Router();

api.get('/', (req, res) => {
  res.send('This is the root of our API!');
});

api.get('/welcome/:name', (req, res) => {
  res.send('Welcome to my app, ' + req.params.name + '!');
})

api.get('/params/:param1/:param2/:param3', (req, res) => {
  res.json(req.params);
})

api.get('/query', (req, res) => {
  res.json(req.query);
})

app.use(express.static('./public'))

app.use('/api', api);
