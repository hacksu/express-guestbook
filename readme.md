# Express

## Intro

This will be an introduction to three things, Node.js (a tool to run JavaScript on a server), GitHub/Git (a tool to save, manage, and show off your source code), and Express (a JavaScript library for writing a web server).

## Instructions 

### What you need to know

* A bit of knowledge about HTML 
* A basic understanding of JavaScript
    * http://www.htmldog.com/guides/javascript/ or similar should teach you everything you need
* A very basic understanding of the command line will also help

### What to bring

* A computer
    * Some kind of text editor installed
        * https://code.visualstudio.com/ (I use this one)
        * https://atom.io/
        * https://www.sublimetext.com/
        * Any of these work, or if you have one that seems similar it will probably too
* Your self


### What to install

* First we need to have you install Node if you haven't already
    * https://nodejs.org/en/download/
* Check that it's installed and reasonably up to date by checking the version in your command prompt
    * `npm -v`
        * You should see something like `5.3.0`
        * Update with `npm update npm -g`
    * `node -v`
        * `v8.3.0`
* Now git if you haven't already
    * https://git-scm.com/downloads
    * Windows one can be a bit tricky
* Check it's version with
    * `git --version`

### Download

* Start by going to https://github.com/hacksu/express-tutorial
* In the upper left hand corner click the fork button
* When it asks for a password click "Create an account." if you don't already have one
* When it finishes forking you will have your on copy of the starting project.
* Click the green clone or download and copy the url
* From your documents or a similar location run `git clone ` and whatever url you copied
* CD into `express-tutorial` and open your text editor in that folder

### Build

* Run `npm init` this tells NPM that you have a project
    * The defaults should be fine for us
    * Note it requires a license to be specified. ISC is fine, but it does me that someone could 'gasp' legally use the code you write in this project as long as they credit you 
* Run `npm install -s express` this will install the express library and remember it so anyone else using the project can install it too
* Create a new file named something like `app.js`
    * We'll make our server here
* Open the file and add `var express = require('express');` as the first line
    * This tells node to load JavaScript from another file and set a variable equal to whatever it exported.
* Under that say `var app = express()` 
    * This sets up the server part
* Type 
      app.get('/', function (req, res) {
          res.send(new Date())
      })

    * This sets up a function to handle requests to a url

* Finally `app.listen(3000)` tells the server to listen on port 3000