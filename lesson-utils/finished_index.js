// The final result of this tutorial
const express = require('express');
const app = express();

// root of our app, respond with 'Hello there!' when visited with a GET request!
app.get('/', function(req, res) {
  res.send('Hello there!')
})

// at /time, respond with the current server time!
app.get('/time', (req, res) => { // shorthand function declaration in JavaScript
  res.send(new Date().toString())
})

// listen on port 8080
let port = 8080;
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port)
});



// Extra stuff for people who wana get deep in express.

// Allow cross-origin requests (dont worry about this for now. If you want to know more, google it or ask questions after the lesson)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Get a new router for our API routes
let api = new express.Router(); // basically a mini app that we'll hook to our main app.

api.get('/', (req, res) => {
  res.send('This is the root of our API!')
})

api.get('/welcome/:name', (req, res) => {
  res.send('Welcome to my app, ' + req.params.name + '!') // /api/welcome/chris -> 'Welcome to my app, chris!'
})

app.use('/api', api); // Mount our API router to our app!
