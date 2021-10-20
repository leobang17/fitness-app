const user = require("./dummy/user.json");
const record = require("./dummy/routine.json");
const category = require("./dummy/category.json");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/api/user", (req, res) => {
    res.send(user);
})

app.get("/api/record/:id/:date", (req, res) => {
    // res.send(req.params);
    res.send(record.routine);
    
})

app.get('/api/category', (req, res) => {
    res.send(category.category);
})

app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${3000}`);
})