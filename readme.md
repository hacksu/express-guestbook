# How To Create a Web Server with Node.js and Express

so, web pages. one creates web pages by writing some code in html, css, and/or javascript, and this adds content to a page that goes in front of the user. the main deficiency of web pages is that their memory gets erased as soon as you close them. sure, you can use javascript to ask the browser to store some data for you for next time, but a) the browser might not feel like it, especially if the user has privacy settings turned on and clears their history and stuff, and b) you, the creator of the website, never get to chance to see the data and sell it to the north korean state. and c), the data won't be there if the user visits the website with another browser, like the one on their phone. this is why we need to write our own custom programs that will store and utilize our users' data. these programs need to run on a web server.

a server is just a computer that is in charge of providing some resources to other computers. every time you view any kind of website, a server is sending you the html, javascript, images, and et cetera that constitute the page you're looking at. any network device can play the role of a server: a phone can, a desktop computer can, a raspberry pi can; you usually want a server to be a big powerful computer with a good internet connection sitting in a cool basement somewhere, but sometimes you don't have that, and so you're forced to jailbreak and reverse engineer your smart toaster.

disclaimer: the term "server" can refer to either a whole computer or a specific program that is fulfilling the role of providing resources on a network. so that may sometimes be confusing, sorry. but you should be able to figure out from context what kind of thing i'm talking about.

and, by the way, there is no agreement on the best way to run a server. when you're creating the content that the users see, which is called frontend web development, there really aren't that many options: you have to produce html, css, and javascript, and the main ways to do that are to write programs in react, vue, or angular; frontend web designers do not use too many brain cells pinning down their basic tools. but if you're creating a server, which means you're doing what's called backend development, you can do anything. you can write your code in any language, using any or multiple of a million frameworks and libraries people have created for you, you can read and write to files, you can integrate with databases, you can run other unrelated programs from inside your program, anything. we're staring into the abyss, here.

however: since you have to write frontend (user-facing) stuff in javascript, many people have recently started to write their backend server stuff in javascript as well, to lower brain cell utilization. they can do this because a program called node.js will run javascript code for you, outside of its original habitat, the browser. node could theoretically run any kind of program, but it's mostly used for web servers, and there's a very popular library for it called "express" that provides convenience functions we can use so that common web server tasks are very easy to accomplish. this introduction is finally over; we can now try writing our own node.js server using express at glitch.com.

glitch.com is a website that will let you run a server program on one of their server computers for free, subject to some restrictions. basically, unless you pay them money, it can only run for a certain number of hours per month, and also there will be loading screens for it sometimes. so consider this a free trial that we're taking advantage of.

the interface that glitch gives you is very vscode-esque. we have the files for our project listed on the left, the current file that's open in the middle, and a preview of the result on the right. that url above the results is a real url; your glitch server is accessible on the public internet. however, currently, as advertised, this program does nothing. let's go to index.js and change that.

```js
import express from "express";
const app = express();

app.listen(3000);
```

so this is what we've got to work with. this is like the husk of a server program that uses express. we import a function from express and call it to create a new variable called app that stores an object; if you're new here, an object is basically a collection of data items and operations that can be accessed with the object's name and then a dot and then the name of a data item or operation; and we call a function from app called "listen" and give it the argument 3000. the "listen" function is how you start an express server; the 3000 will be used as the port number, which is basically the address number that our program will have within whatever computer is running it. for no reason, 3000 is a common port to use while developing a web site, and so glitch.com is going to try to send messages to it. so that's boring.

what's interesting is how we're going to solve the problem of our web server doing nothing. when you type a url into your browser, your browser sends a request to an ip address provided by whoever registered that url, which in this case is glitch, and glitch will forward that request to our server, which is listening at port 3000. so our server needs to respond. one way to make it do that is to write a function that takes two arguments: one that contains the data of our incoming request, and one which contains the operations (the functions) that we need to use to respond. then, tell express to use that.

```js
function sayHi(request, response) {
    console.log(request.path)
    response.send("hello world!");
}

app.use(sayHi);
```

so, this is our "hello, world" example. console.log will send the path of the incoming request, which is just the portion of the url that we can vary without going to a completely different website, i.e. it's the part after whatever.glitch.me, to the log screen which we can open by clicking "Log", here; we then respond to the incoming request with these extremely creative words that i came up with. this will respond to any request that comes into our server. if we put /dogs/should/have/the/right/to/vote as the path in our url, the function will run and that path will be logged and the same response will be used.

we probably don't want this function to respond to every path that exists for our website. we could throw some if statements into this function to change what it does based on the path; however, express has a built in way to control when a response function runs. change the app.use() line to this:

```js
app.use("/hello", sayHi);
```

and now our response function will only be called when we visit /hello. that seems sensible.

the most common thing a web server has to do is serve files; i have provided some files that it can potentially serve in the "public" folder here in our project. let's tell express that we want it to respond with those files when a browser visits it:

```js
const fileProvider = express.static("public");
app.use(fileProvider);
```

like i said, express provides convenience functions for a lot of common tasks; this is a lot easier than writing our own code to open files, read them, and then send them. if we don't provide a specific path, file servers will generally look for a file called index.html to serve; we can also use file paths as our url paths and specifically get /index.html or /images/confetto.png and the file provider will respond with them.
