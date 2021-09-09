const sqlite3 = require("sqlite3").verbose();

module.exports.is_valid_account = function (email, password, cb) {
    var db = new sqlite3.Database("test.db");
    db.all("SELECT * FROM UserInformation", function (err, rows) {
        var obj = {
            email: "",
            role: "",
            avatar: ""
        };
        if (err) return cb(err);
        rows.forEach(function (row) {
            if (email === row.email && password == row.password) {
                obj.email = row.email;
                obj.role = row.role;
                obj.avatar = row.avatar;
            }
        });
        db.close();
        cb(obj);
    });
};

module.exports.signup = function (userdata, cb) {
    var isSucessful = false;
    var db = new sqlite3.Database("test.db");
    var query =
        "INSERT into UserInformation (email, password, username, gender, dob, phone_number, avatar, address, role)" +
        "VALUES ('" +
        userdata.email +
        "','" +
        userdata.password +
        "','" +
        userdata.username +
        "','" +
        userdata.gender +
        "','" +
        userdata.dob +
        "','" +
        userdata.phone +
        "','" +
        userdata.avatar +
        "','" +
        userdata.address +
        "','user'" +
        ");";
    db.run(query, function (err) {
        if (!err) isSucessful = true;
        else console.log(err);
        db.close();
        cb(isSucessful);
    });
};

module.exports.confirmVacination = function (user, cb) {
    var isSucessful = false;
    var db = new sqlite3.Database("test.db");
    var query = "";
    if (user.isfirstshot)
        query =
            "UPDATE UserInformation SET firstshot ='" +
            user.vaccineName +
            "', firstshotdate = '" +
            user.date +
            "' WHERE email ='" +
            user.email +
            "';";
    else
        query =
            "UPDATE UserInformation SET secondshot ='" +
            user.vaccineName +
            "', secondshotdate = '" +
            user.date +
            "' WHERE email ='" +
            user.email +
            "';";
    db.run(query, function (err) {
        if (!err) isSucessful = true;
        else console.log(err);
        db.close();
        cb(isSucessful);
    });
};

module.exports.getConfirmStatus = function (user, cb) {
    var db = new sqlite3.Database("test.db");
    var query = "SELECT confirmation_time, confirmation_status FROM UserInformation WHERE email ='" + user.email + "';";
    db.all(query, function (err, rows) {
        if (err) return cb(err);
        var data = {
            email: rows[0].confirmation_time,
            password: rows[0].confirmation_status
        };
        db.close();
        cb(data);
    });
};

module.exports.submitConfirmForm = function (user, cb) {
    var isSucessful = false;
    var db = new sqlite3.Database("test.db");
    var query = query =
    "UPDATE UserInformation SET confirmation_time ='" +
    user.confirmation_time +
    "', confirmation_status = '" +
    user.confirmation_status +
    "' WHERE email ='" +
    user.email +
    "';";
        
    db.run(query, function (err) {
        if (!err) isSucessful = true;
        else console.log(err);
        db.close();
        cb(isSucessful);
    });
};


module.exports.dataList = function (user, cb) {
    var list = [];
    var db = new sqlite3.Database("test.db");
    if (user.role === "admin") {
        db.all("SELECT * FROM UserInformation", function (err, rows) {
            if (err) return cb(err);
            let index = 0;
            rows.forEach(function (row) {
                if (row.role !== "admin") {
                    var data = {
                        email: row.email,
                        password: row.password,
                        username: row.username,
                        gender: row.gender,
                        dob: row.dob,
                        phone: row.phone_number,
                        address: row.address,
                        firstshot: row.firstshot,
                        secondshot: row.secondshot,
                        firstshotdate: row.firstshotdate,
                        secondshotdate: row.secondshotdate,
                        confirmation_status: row.confirmation_status
                    };
                    list[index] = data;
                    index++;
                }
            });
            db.close();
            cb(list);
        });
    } else {
        db.all(
            "SELECT * FROM UserInformation WHERE email ='" + user.email + "';",
            function (err, rows) {
                if (err) return cb(err);
                var data = {
                    email: rows[0].email,
                    password: rows[0].password,
                    username: rows[0].username,
                    gender: rows[0].gender,
                    dob: rows[0].dob,
                    phone: rows[0].phone_number,
                    address: rows[0].address,
                    firstshot: rows[0].firstshot,
                    secondshot: rows[0].secondshot,
                    firstshotdate: rows[0].firstshotdate,
                    secondshotdate: rows[0].secondshotdate,
                    confirmation_status: rows[0].confirmation_status
                };
                list[0] = data;
                db.close();
                cb(list);
            }
        );
    }
};
