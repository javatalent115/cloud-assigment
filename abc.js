const database = require("./database");
const express = require("express");
const path = require("path");
const app = express();
const body_parser = require("body-parser");
const { deflateRaw } = require("zlib");

const port = 3000;
app.use(body_parser.urlencoded({ extended: false }));

// app.get('/' , (req,res) => {
//   res.sendFile(path.join(__dirname, 'static', 'Untitled-1.html'));
// });

// app.get('/next' , (req,res) => {
//   res.sendFile(path.join(__dirname, 'static', 'Mock_Test.html'));
// });

// app.get('/signup' , (req,res) => {
//   res.sendFile(path.join(__dirname, 'static', 'Mock_Test.html'));
// });

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

// array[80][1024*768]

// for (int x = 0, y = 0, i = 0; y < 768; i++ ){
//   deflateRaw(x,y, array[i]);
//   x++;
//   if(x == 1024){
//     x = 0;
//     y++;
//   }
// }
