const express = require("express");
const fs = require("fs");

const app = express();

const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const fileProvider = express.static("public");  // the folder name
app.use(fileProvider);

app.use(express.urlencoded({ extended: true }));

const DATA_FILE = "guestbook.json";

let guestbookEntries = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8"); 
    guestbookEntries = JSON.parse(data);
    if (!Array.isArray(guestbookEntries)) {
      guestbookEntries = [];
    }
  } catch (err) {
    console.error("Error reading guestbook.json:", err);
    guestbookEntries = [];
  }
}

function saveEntries() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(guestbookEntries, null, 2));
}

function renderGuestbook(req, response) {
  response.render("guestbook", {
    title: "Guestbook",
    entries: guestbookEntries,
  });
}
app.use("/guestbook", renderGuestbook);

function receiveEntry(request, response) {
  const text = request.body.entryText?.trim();
  const name = request.body.nameText?.trim();
  const data = {name, text}
  if (text) {
    guestbookEntries.push(data);
    saveEntries();
  }
  response.redirect("/guestbook");
}
app.post("/addEntry", receiveEntry);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// note: do not put any code here; code placed after app.listen() will not be
// run, since app.listen() never actually finishes or returns