# How To Create a Web Server with Node.js and Express

## What a Web Server Is

at some point, web pages were just simple text documents, but now they're basically mini-programs that get downloaded, installed, and run on your computer as soon as you visit them. however, unlike normal programs, they don't have a natural way to save data, since they're trapped inside your browser. sure, you could write code that asks the browser to store some data for you for next time, but a) the browser might not feel like it, especially if the user has privacy settings turned on and clears their history and stuff, and b) you, the creator of the website, never get to chance to see the data and analyze it and sell it to the north korean state. and c), the data won't be there if the user visits the website with a different browser, like the one on their phone. this is why the programs that create web pages kind of need to be split in two: we need to run half of the program in the user's browser, to respond to what they're doing, and half of it on some computer that stores data and lets you retrieve it from anywhere. that computer is called a web server.

a more formal definition of a server is that it's a computer that provides resources to a network. every time you view any kind of website, a web server is sending you the html, javascript, images, and et cetera that constitute the page you're looking at, in addition to storing all the data that it has on you. any network device can play the role of a server: a phone can, a desktop computer can, a raspberry pi can; you usually want a server to be a big powerful computer with a good internet connection sitting in a cool basement somewhere, but sometimes you don't have that, and so you're forced to jailbreak and reverse engineer your smart toaster.

disclaimer: the term "server" can refer to either a whole computer or a specific program that is fulfilling the role of providing resources on a network. so that may sometimes be confusing, sorry. but hopefully it will be possible to use context to figure out what kind of thing i'm talking about.

and, by the way, there is no agreement on the best way to run a server. when you're creating the content that the users see, which is called frontend web development, there really aren't that many options: you have to produce html, css, and javascript, and the main ways to do that are to write programs with react, vue, or angular; frontend web designers do not use too many brain cells pinning down their basic tools. but if you're creating a server, which means you're doing what's called backend engineering, you can do anything. you can write your code in any language, using any or multiple of a million frameworks and libraries people have created for you, you can read and write to files, you can integrate with databases, you can run other unrelated programs from inside your program, anything. we're staring into the abyss, here.

however: since you have to write frontend (user-facing) stuff in javascript, many people have recently started to write their backend server stuff in javascript as well, to avoid having to learn more than one language. they can do this because a program called node.js will run javascript code for you, outside of its original habitat (the browser.) node could theoretically run any kind of program, but it's mostly used for web servers. there's a very popular library for it called "express" that provides convenience functions that make common web server tasks very easy to accomplish. and this introduction is finally over; we can now try creating our own node.js server using express at glitch.com.

## Express Basics: Requests and Responses

glitch.com is a website that will let you run a server program on one of their server computers for free, subject to some restrictions. basically, unless you pay them money, it can only run for a certain number of hours per month, and also there will be loading screens for it sometimes. so consider this a free trial that we're taking advantage of. i have an example server program available at hacksu.com/express ; go there and then click "remix" to get your own version that you can edit.

the interface that glitch gives you is very vscode-esque. we have the files for our project listed on the left, the current file that's open in the middle, and a preview of the result on the right if you click the preview button on the bottom. that url above that preview is a real url; your glitch server is accessible on the public internet. however, currently, as advertised, this program does nothing. let's go to index.js and change that.

```js
import express from "express";
const app = express();

// put code that does actual stuff here

app.listen(3000);
// note: do not put any code here; code placed after app.listen() will not be
// run, since app.listen() never actually finishes or returns
```

so this is what we've got to work with. this is like the empty husk of a server program that uses express. we import a function called express, and call it to create a new variable called app, which will store an object; if you're new here, an object is basically a collection of data items and operations that can be accessed with the object's name and then a dot and then the name of a data item or operation; and we call a function from app called "listen" and give it the argument 3000. the "listen" function is how you start an express server; the 3000 will be used as the port number, which is basically the address number that our program will have within whatever computer is running it. for no reason, 3000 is a common port to use while developing a web site, and so glitch.com is going to try to send messages to it. so that's boring.

what's interesting is how we're going to solve the problem of our web server doing nothing. when you type a url into your browser, your browser sends a request that a server needs to respond to. one way to make ours do that is to write a function that takes two arguments: one object containing the data of our incoming request, and another object that stores the functions that we need to use to respond. then, tell express to use that.

```js
// code that does actual stuff:
function sayHi(request, response) {
    console.log(request.path)
    response.send("hello world!");
}

app.use(sayHi);
```

so, this is our "hello, world" example. console.log will log the path of the incoming request, which is just the portion of the url that we can vary without going to a completely different website, i.e. it's the part after "something.glitch.me". (to view the log, click the log tab at the bottom of the glitch page.) we then respond to the incoming request with these extremely creative words that i came up with. for any request that comes into our server, this function will be run; if we put /dogs/should/have/the/right/to/vote as the path in our url, the function will run and that path will be logged and the same response will be used.

if you wanted, you could develop a whole website inside this function. this is all you need. you could just put if statements in here, like, if the path is equal to this, then respond with this html, or if it's equal to this, respond with this image file; you could split the string up and use segments of it in if statements; you could interpret the path as a math problem like /2+2 and then respond with the answer; you could do anything. there are a million different ways to write a web server because once you have the system calls that get you to this point, you have complete freedom.

however, for some reason, most people write multiple functions when they're programming. the express library has built-in mechanisms you can use to specify and restrict what a given function should be used for. replace the app.use() line above with this:

```js
app.use("/hello", sayHi);
```

and now that response function will only be called when we visit /hello. which seems sensible.

## Express Features: Serving Files & Templates

the most common thing web servers have to do is serve files, and i have provided some files that it can potentially serve in the "public" folder here in our project. let's tell express that we want it to respond with those files when a browser visits it:

```js
// put this under the "sayHi" code (but before app.listen())
const fileProvider = express.static("public");
app.use(fileProvider);
```

now, if we input a path that matches the path to a file in the public folder, our server will respond with that file. this uses a convenience function that express provides, which is much easier than writing our own code to open files, read them, and then send what we read. if we try to access an empty path, file servers will generally look for a file called index.html to serve; we can also specifically get /index.html or /images/confetto.png and the file provider will respond with those. as you can see, the contents of index.html match what you see what you go to the empty path or /index.html in the little browser on the right here.

so, serving files is useful, but if you just want to do that, you can use github pages or kent state's website folder thing or something else that's free and easy. we're more interested in difficult and expensive. to that end, let's start generating user pages dynamically.

the simplest way to create new web pages on a server is to use templates. i have installed a templating engine called "handlebars" in this project; "handlebars" will piece together files and javascript objects to create pages according to the values of variables from the server's code, which lets us create pages that respond to the server's state over time. there are a billion different templating engines out there; this is one of them. it expects templates to be placed in a folder called "views". go there, and you'll see the template i've added with the filename guestbook.handlebars.

the simplest feature of handlebars templates is that they separate actual html content from boring html boilerplate. if you look at our index.html page, there's a bunch of default generic html that wraps our actual content, which lives inside the body tag. every html page should have this stuff and it's annoying. however, looking at guestbook.handlebars, we just have the html that defines our actual content. we can do that because the generic html wrapper code is stored in layouts/main.handlebars, and our content will automatically be dropped into it whenever we go to use it. in the layout file, we have the word body, surrounded by three sets of curly braces; whenever you see two or three sets of curly braces in a handlebars template, you know that that content is going to be replaced with something else when the template is used. this means that if we create a million templates for different web pages, we'll still only need this boilerplate stuff to be in this layout file once, whereas if we created a billion normal html files, we would need to put this boilerplate every time.

to use our template, we need a few extra lines of code in our server.js file. the people who wrote express and the people who created handlebars decided that this is how you add a templating option to their response objects. i'm going to paste these into the discord because they're boring.

```js
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
```

and now, let's add a function that renders our guestbook template.

```js
function renderGuestbook(request, response) {
    response.render("guestbook");
}
app.use("/guestbook", renderGuestbook);
```

and now, if we go to /guestbook, we'll see our guestbook page. at the moment, it's not too new and exciting.

# Sending and Receiving HTML Form Data

any good guestbook will offer an option for users to add an entry to it. we're going to do that by putting an html form in the guestbook file. first, a form tag:

```html
<form method="post" action="/addEntry">

</form>
```

the job of a web server is to respond to web requests, and there are 7ish types of web request used today. all of the requests we've been responding to so far are "get" requests, which is the kind that a browser sends to a server when you put a url in and press enter. however, forms usually use "post" requests, which are intended to send data to the server. so that's why that "method" attribute is there. then, the "action" attribute actually specifies the path that will be included in the post request. now we need to add the actual data that it will carry.

```html
<form method="post" action="/addEntry">
    <input type="text" placeholder="write a message..." name="entryText" />
</form>
```

an html input element lets you create a small text box. the placeholder thing will be displayed in the textbox before the user types stuff, and the name attribute will be used to identify the stuff in the text input once it reaches the server. all we need now is a way to actually make the request:

```html
<form method="post" action="/addEntry">
    <input type="text" placeholder="write a message..." name="entryText" />
    <button>Add Guestbook Entry</button>
</form>
```

and obviously you do that with a button. now we have a complete small form that does not work.

the only reason that it doesn't work is that we need code on our server that will receive the post request. first, express doesn't actually decode form data by default, so we must tell it to do that; after writing this, express will take data submitted through forms and put it in a request object. again, putting this code in the discord.

```js
app.use(express.urlencoded({ extended: true }));
```

then, let's create a variable in our code called guestbookEntries:

```js
let guestbookEntries = [];
```

then, we'll write a function that adds to it (and logs to it so that we can see that it works):

```js
function receiveEntry(request, response) {
    guestbookEntries.push(request.body.entryText);
    console.log(guestbookEntries);
}
```

the value that will be stored in `request.body.entryText` comes directly from the input with the name `entryText` from our HTML template. we also do need to send a response that the browser will display after sending the form. one thing we can do is just tell the browser to display the same page it was previously displaying, like this:

```js
function receiveEntry(request, response) {
    entries.push(request.body.entryText);
    console.log(guestbookEntries);
    response.redirect("back");
}
```

and finally, lets make this function run whenever a post request is sent to the path /addEntry:

```js
app.post("/addEntry", receiveEntry);
```

so, now you should be able to see in the logs that we're storing a new entry in our `guestbookEntries` array every time we submit one through the form.

# Using Variables in Templates

now, obviously, we want to actually display the guestbook entries to the user in a normal way. one way we can do that is by sending them to our handlebars template. the simplest way to do that is to add a line like the following underneath the form in the template:

```hbs
{{entries}}
```

using double curly braces tells handlebars that we want to display the value of a variable here; this is the part of the template that could be different each time it's rendered. we just need to give handlebars the value that we want to use for the name `entries`. to do this, we just need to change the rendering code in `renderGuestbook`. (to do this, you might need to move the declaration of the variable `entries` so that it comes before the definition of `renderGuestbook`.)

```js
response.render("guestbook", {entries: guestbookEntries});
```

so, that should work. the value of this array will now be displayed below the form, because the template will be re-rendered every time we submit the form, because the browser will reload the page and send a new get request to retrieve the page.

however, it's very ugly, because the default conversion from arrays to strings in javascript is very ugly. ideally, each item in the array would be placed in its own HTML element. to accomplish this, we can use the handlebars "each" helper:

```hbs
{{#each entries}}

{{/each}}
```

handlebars syntax looks kind of ridiculous, but bear with me. whatever html you put inside this "each" helper will be rendered once for each element in the array `entries`. inside the html, the element will be accessible under the name `this`:

```hbs
{{#each entries}}
    <p>{{this}}</p>
{{/each}}
```

so yeah. there is our guestbook. since we're using variables stored on the server, this will be accessible and will look the same to anyone who goes to your url. anyone can go to this url and add to my guestbook.

## not sure where this will end up but it's important

```js
function sayHiToName(request, response) {
    const name = request.params.exampleName;
    response.send("Hello, " + name);
}

app.use("/hello/:exampleName", sayHiToName);
```

so, route parameters are pretty simple. take a path, and somewhere in it, put a variable name with a : in front of it. then, navigate to that same path but with some actual value in the place of the variable name. when the response function gets run, the request will store that value under your variable name inside the object `request.params`, so you can access it and do stuff with it.
