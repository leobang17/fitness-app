const user = require("./dummy/user.json");
const record = require("./dummy/routine.json");

const express = require("express");
const app = express();
const port = 3000;


app.get("/api/user", (req, res) => {
    res.set({'access-control-allow-origin':'http://localhost:19007'});
    res.send(user);
})

app.get("/api/record/:id/:date", (req, res) => {
    res.set({'access-control-allow-origin':'http://localhost:19007'});
    // res.send(req.params);
    res.send(record.routine);
    
})

app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${3000}`);
})