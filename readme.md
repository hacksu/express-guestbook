# ExpressJS 🚂

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

Finally, we need to install Electron for our app. In the command line, type:
```
npm install express --save
 # The --save flag is optional, but good if you want others to be able to download and use
 # your app. 
```

## 🚦Coding in Electron 🚦

Open up `index.js` and let's start coding some Electron! You can skip any commented lines, of course.

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
app.listen(3000, () => console.log('Example app listening on port 3000!'))
```


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
* We run it by just running `node app.js`, then we go to http://localhost:3000/ in the browser

### Publish it

* We've got a working project or hopefully we do, lets publish it so you can share and keep track of your work

> #### A brief intro to Git
> * Git is a version control system
>    * A big long phrase that basically just means it keeps track of the changes made to a piece of software
>    * It's the same sort of thing as SVN which you'll need to use for class
>    * It's distributed though meaning you keep the entire history on your computer and only update it when you need
> * There are a couple of main commands you'll need to know right now
>   * `git clone ....`
>       * Copies a remote repository to your local computer
>   * `git status`
>       * Lists information about the status of git for the current directory
>   * `git add ...`
>       * Prepare files that should be saved as changed
>       * To add all files in a directory `git add .`
>       * We call this staging a file
>   * `git commit`
>       * Saves the current state of all the staged (added files) files
>       * By default opens a text editor to specify a message
>       * Use `git commit -m 'The message'` to specify it all at once
>   * `git push`
>       * Updates the remote you cloned from (or a different one you can specify)

* Lets look at the status of the changed files
* You should see it listing app.js as untracked, but also some other weird files and folders you didn't create
    * `package.json` Should be tracked by version control
        * The file `npm init` created to save the history of your file 
    * `package-lock.json` Should be tracked by version control
        * This stores exactly which libraries were installed with version history, with this file 
        npm will always install the exact same version
    * `node_modules/` Should **not** be tracked by version control
        * Stores all the libraries so your program can use it
* We need to tell git then that some files/folders should not be tracked
    * We do this with a `.gitignore` file
    * create it and add a line like `node_modules`
        * Every line specifies a rule to ignore
        * this is the simplest but we could do `*.js`
            * this would tell git to ignore all js files
* Now when we do `git status` we don't see the weird node_modules folder
* Add all the files with `git add .`
* Commit the files with `git commit -m 'Made a thing'`
* Push them to your branch on git with `git push`

### A more complicated app

* I'm going to make you do your own thing here in a second, but first lets make a more complicated app
* Our app is going to do just two things
    * On it's home page it will display a link
    * Then `/update.html` will be a form to update the link
* Lets make the page to display the link first.
* Open up `app.js` again
* We need to set two variables as local variables in Express, we could just make them global, but storing them in
`app.locals` means that we make our code a bit more reusable

       app.locals.name = 'Hi All';
       app.locals.link = 'https://www.google.com/';

* Then we need to make the output determined by those variables. We can output any string so just

        res.send('<a href="'+app.locals.link+'">'+app.locals.name+'</a>');

* Run the website again to check
* Now lets add the form. 
* The easiest way is just to tell express to host some files 
* `app.use(express.static('static'));` tells Express to host all the files in the static folder on the website
* Make a `static` folder and add `update.html` to it
* Make a very simple website with a form and 3 inputs

        <html>

        <body>
            <form>
                <input type='text' name='name'/>
                <input type="text" name="link"/>
                <input type="submit" value="submit"/>
            </form>
        </body>


        </html>
* Now start the server and notice when you visit `http://localhost:3000/update.html` you see the form
* Click submit and you get something like http://localhost:3000/update.html?name=hi&link=https%3A%2F%2Fwww.google.com%2F
* This is a forms default behavior, it's sending all the information back in the get request.
* We can get it on the server by adding a get handler in our code for `update.html`
* We need to make sure it's before `app.use(express.static('static'));`

        app.get('/update.html', function (req, res, next) {
            console.log(req.query);
            if (req.query.name != undefined) {
                app.locals.name = req.query.name;
                app.locals.link = req.query.link;
                res.send('<a href="/">Successfully added, go back to home</a>');
            } else {
                next();
            }
        });
