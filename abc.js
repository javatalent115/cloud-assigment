const database = require("./database");
const express = require("express");
const path = require("path");
const app = express();
const body_parser = require("body-parser");

const port = 3000;

app.use(express.static(path.join(__dirname, "build")));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/validateAccount", (req, res) => {
    database.is_valid_account(req.body.email, req.body.password, (obj) => {
        res.send(obj);
    });
});

app.post("/confirmVacination", (req, res) => {
    database.confirmVacination(req.body, (isSuccessful) => {
        res.send(isSuccessful);
    });
});



//------------------------------- body object phai co email, confirmation_time, confirmation_status(Safe/Unsafe)
app.post("/submitConfirmForm", (req, res) => {
    database.submitConfirmForm(req.body, (isSuccessful) => {
        res.send(isSuccessful);
    });
});


//------------------------------- body object phai co email thoi duoc r
app.post("/getConfirmStatus", (req, res) => {
    database.getConfirmStatus(req.body, (obejct) => {
        res.send(obejct);
    });
});

app.post("/signups", (req, res) => {
    database.signup(req.body, (isSucessful) => {
        console.log(isSucessful);
        res.send(isSucessful);
    });
});

app.post("/getUserData", (req, res) => {
    database.dataList(req.body, (list) => {
        console.log(list);
        res.send(list);
    });
});

app.listen(port);
