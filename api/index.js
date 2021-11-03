const user = require("./dummy/user.json");
const record = require("./dummy/routine.json");
const category = require("./dummy/category.json");
const workout = require("./dummy/workout.json");
const type = require("./dummy/type.json");
const setDetail = require("./dummy/setDetail.json");

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

app.get("/api/routine", (req, res) => {
    res.send(record.routine);
})

app.get('/api/category', (req, res) => {
    res.send(category.category);
})

app.get('/api/workout', (req, res) => {
    res.send(workout.workout);
})

app.get("/api/type", (req, res) => {
    res.send(type.type);
})

app.get("/api/setDetail", (req, res) => {
    res.send(setDetail.setDetail);
})

app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${3000}`);
})