const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
// const DB_PATH = ".Ohjelma/Database.db";
const DB_PATH = "D:/Coding/ReactMainokset/Database.db";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DB = new sqlite3.Database(DB_PATH, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to " + DB_PATH + " database.");
});

app.get("/getData", (req, res) => {
  let db = new sqlite3.Database(DB_PATH);

  var sql = "SELECT nimi, ip, avain FROM Painikkeet";

  db.all(sql, [], function (error, row) {
    if (error) {
      console.log(error);
    }
    res.send(row);
  });
  db.close();
});


app.post("/postData", (req, res) => {
  let body = req.body;
  let db = new sqlite3.Database(DB_PATH);
  let sql = "INSERT INTO Painikkeet(nimi, ip, avain) VALUES(?, ?, ?) ";
  let insertData = [body.nimi, body.ip, body.avain];
  console.log(body);
  db.run(sql, insertData, error => {
    if (error) {
      console.log(error);
    }

    res.send("tiedot päivitetty");
  });
  db.close();
});

app.delete("/deleteData", (req, res) => {
  let db = new sqlite3.Database(DB_PATH, err => {
    if (err) {
      console.error(err.message);
    }
    db.run("DELETE FROM Painikkeet WHERE nimi=?", data, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Row(s) deleted ${this.changes}");
    });
    db.close(err => {
      if (err) {
        return console.error(err.message);
      }
    });
  });
});



function tallennaPainike(nimi, ip, avain) {
  var sql = "INSERT INTO Painikkeet (nimi, ip, avain) ";
  sql += "VALUES (? ,?, ?) ";
  DB.run(sql, [nimi, ip, avain], function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Last ID: " + this.lastID);
      console.log("# of Row Changes: " + this.changes);
    }
  });
}

// tallennaPainike("kissa, 200, mongoliankissa");

// function ongiNimet() {}

DB.close();

app.listen((PORT = 3000));
