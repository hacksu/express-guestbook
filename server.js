const express = require("express");
const app = express();

// put code that does actual stuff here

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// note: do not put any code here; code placed after app.listen() will not be
// run, since app.listen() never actually finishes or returns