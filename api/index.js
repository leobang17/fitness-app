const user = require("./dummy/user.json");

const express = require("express");
const app = express();
const port = 3000;


app.get("/api/user", (req, res) => {
    res.set({'access-control-allow-origin':'http://localhost:19006'});
    res.send(user);
})

app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${3000}`);
    console.log(user);
})