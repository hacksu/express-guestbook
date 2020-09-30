# ExpressJS

Express is a framework for making super quick, easy, and high performing websites!

## Requirements

In order to use express, we need to have [NodeJS](https://nodejs.org/en/download/) and NPM installed. Head [here](https://nodejs.org/en/download/) to download NodeJS (and NPM, which is packaged in to the download)!

## Lets get started

Be sure to have NodeJS installed!

You can check to make sure everything is installed properly by running `node -v && npm -v` which should show two version numbers! If you're having problems, just Google `installing node [PLATFORM]`, like "installing node windows" and they should help you out. Google and StackOverflow is your friend!

### Setting up our project

Lets get started by going in to a directory that we want to do create our project. Open a terminal where you want your project to be.
```
mkdir my-express-project
cd my-express-project
```

Next, we're going to run `npm init -y` which will create some files for us! (the -y argument keeps everything at defaults. Remove -y if you want to specify project info, which tbh isn't important for this tutorial).

Now that we've set up our project, we can start installing stuff!

### Installing Modules

[NPM](https://www.npmjs.com/) is a package repository that allows us to install a variety of open source modules for our projects. We're going to start by installing [Express](https://www.npmjs.com/package/express), which we can do by running
```
npm install express --save
```
(The --save flag adds this module to our package.json, which has a definition of the modules we install. This is very useful for giving your project to your friend or just remembering what you installed)

You can look up many other packages on https://www.npmjs.com/ and install them the same way we did above!
A few of my favorites are:
- [chalk](https://www.npmjs.com/package/chalk)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [moment.js](https://www.npmjs.com/package/moment)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

After our lesson, you should try out some of these modules! They're pretty neat!

## I'm ready to start coding

Okay, we got everything installed. Lets ACTUALLY make our website now.

Create a file called `index.js` in your project folder. (It can be whatever name you want, but 'index' is recommended because its the root of your project)
```
# Windows:
echo > index.js
# Max & Linux:
touch index.js
```

Now, lets open up index.js in any editor you want! I prefer to use [Atom](https://atom.io/), but you can use whatever you want!

To start, we need to be able to reference this module. NodeJS does this via `require(modulename)`. Also, based on Express's [documentation](https://expressjs.com/en/starter/hello-world.html) tells us that we can create an 'Application' by running the module as a function!
```js
const express = require('express');
const app = express();
```

### Setting up some Routes

Now that we've got our app, we need to give it some routes to respond on.

```js
// root of our app, respond with 'Hello there!' when visited with a GET request!
app.get('/', function(req, res) {
  res.send('Hello there!')
})

// at /time, respond with the current server time!
app.get('/time', (req, res) => { // shorthand function declaration in JavaScript
  res.send(new Date().toString())
})
```

### Okay, but how do I visit my routes?

Well, we need to have our app listen somewhere!

We can do this by adding
```js
// listen on port 8080
let port = 8080;
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port)
});
```

Now that we've added this; we can run our app!

### Running our project

Lets switch back to our terminal
```
node index.js
# or node [whatever-you-named-your-file].js
```

If you see `Listening on http://localhost:8080` (or whatever port number you chose), then we're looking good!

Head to your browser and try it out!

http://localhost:8080
- [Visit /](http://localhost:8080)
- [Visit /time](http://localhost:8080/time)

### Okay, lets dive a little deeper.

We just made our app, but there is a lot more that we can do with express!

Lets say we want to make an API for our app.
```js

// Allow cross-origin requests (dont worry about this for now. If you want to know more, google it or ask questions after the lesson)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
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

```

Alright, lets stop our app, save our changes to our index.js, and start it up again!

Try visiting http://localhost:8080/api and http://localhost:8080/api/welcome/YOUR-NAME-GOES-HERE

Eyyyyyyy, we got a nice start to an API for whatever we could want!

## Closing Remarks

Be sure to check out [ExpressJS.com](https://expressjs.com/) and their [Getting Started](https://expressjs.com/en/starter/installing.html) guide, as well as their [API reference](https://expressjs.com/en/4x/api.html)!

If you are looking to have your friends be able to visit your website, take a look in to [DigitalOcean.com](https://www.digitalocean.com/) for their cheap and reliable servers! If you use [Github's Student Developer Pack](https://education.github.com/pack), you get a **$50** Digital Ocean credit that **literally can pay for a server for 10 months**.

<img src='https://i.kym-cdn.com/entries/icons/mobile/000/033/069/jojo.jpg'>
