const express = require("express");
const app = express(); 
app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = 8888
app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`)
})
