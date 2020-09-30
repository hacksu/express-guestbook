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
