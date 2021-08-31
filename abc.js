const database = require("./database");
const express = require("express");
const app = express();
const body_parser = require("body-parser");
const { deflateRaw } = require("zlib");

const port = 3001;
app.use(body_parser.urlencoded({ extended: false }));


app.post("/validateAccount", (req, res) => {
    database.is_valid_account(req.body.email, req.body.password, (isExist) => {
        res.send(isExist);
    });
});

app.post("/confirmVacination", (req, res) => {
    database.confirmVacination(req.body, (isSuccessful) => {
        res.send(isSuccessful);
    });
});

app.post("/isAdmin", (req, res) => {
    database.isAdmin(req.body, (isAdmin) => {
        res.send(isAdmin);
    });
});

app.post("/signup", (req, res) => {
    database.signup(req.body, (isSucessful) => {
        res.send(isSucessful);
    });
});

app.get("/getUserData", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    database.dataList((list) => {
        res.send(list);
    });
});

app.listen(port);


