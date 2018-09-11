# ExpressJS 🚂

If you just need the codepen link from this page, you can find it [here](https://codepen.io/bhollan5/pen/pOaLam?editors=1011)! If not, read on!

## ⚠️ Requirements ⚠️

For this tutorial, you'll need a basic understanding of Javascript and how to navigate the command line.

You'll also need to install [NodeJS](https://nodejs.org/en/download/).

## 🤔 Intro - What are we making? 🤔

ExpressJS is a Javascript framework to make an API! 

API stands for **A**pplication **P**rogramming **I**nterface. APIs let us set up 'endpoints' for different programs to talk to eachother. APIs are used to connect programs to databases, recieve data from users securely, and give users data they request securely. 

*It's worth noting that Express can be used to make a lot more than just APIs, but that's what we'll be learning today.*

## ✨ Setting Up Our Project ✨

First, make sure you have [NodeJS](https://nodejs.org/en/download/). You can test this by opening your terminal and typing `npm -v`. If you get an error, you need node still!

Next, we need a folder to hold our project. In your terminal, navigate to the space you want your project, and then make a directory, and enter it, like so: 

```
mkdir my-express-proj
cd my-express-proj
```

Now, inside that folder, we need to set up a Node project. 

```
npm init
```

This will prompt you with some questions about your project. You can just hit enter to skip this entire thing, or fill it out if you'd like.  

One of the things we were prompted for was our entry point: `entry point: (index.js) `. This means our app's main logic should start in a file called `index.js` (unless you chose to rename it.) So let's open a text editor and create that file, and save it to that folder.

Finally, we need to install Express for our app. In the command line, type:
```
npm install express --save
 # The --save flag is optional, but good if you want others to be able to download and use
 # your app. 
```

## 🚦Coding in Express 🚦

Open up `index.js` and let's start coding some 
! You can skip any commented lines, of course.

```
// This gives us access to the 'express' npm package we installed:
const express = require('express');
// This sets up a new variable corresponding to our express app:
const app = express()

// This is our first "route!"
//
// Note that we're passing a function as an argument into the 'get' function. You'll often see functions
// like this written with an => symbol instead of the 'function' keyword - like below in app.listen.
app.get('/', function(req, res) {
  res.send('Hello World!')
});

// Finally, this sets up the 'port' our app will be 'listening' on. 
app.listen(3000, () => console.log('Example app listening on port 3000! 😊'))
```

Save your file, and let's run it! In your command line, run `node index.js`, then go on a web browser to `http://localhost:3000`.

At this point, we can actually try to use our API in a real project. I've set up a sample codepen project here to play with it: (link)[https://codepen.io/bhollan5/pen/pOaLam?editors=1011]

Here's the rest of our project lol:

```
const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to our API!')
                           
});

app.get('/date', (req, res) => res.send('Here\'s today\'s date: ' + new Date()));

var thing = [
    'oh hello!',
    'howdy!',
    'wowie zowie',
    'i love to get things lol'
  ]

app.get('/get-thing', (req, res) => {
  
  res.send(thing)
})

app.get('/get-thing/:id', (req, res) => {
  console.log(req.params)
  res.send(thing[req.params.id])
})

app.get('/get-random', (req, res) => {
  res.send(thing[Math.floor(Math.random() * thing.length)]);
})

app.listen(3000, () => console.log('Our app is now listening on port 3000! 😊'))

```
