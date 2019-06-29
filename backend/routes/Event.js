const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router()

const axios = require('axios')

const DB_PATH = './abcd.db' // sqlite3 file
let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Main error message: ", err.message);
  }
  console.log(`vacayPlan is connected to ${DB_PATH}`);
})


router.get('/reset', (req, res) => {
    console.log("Resetting the DB")
    db.serialize(() => {
        db.run("DROP TABLE allEvents", function(err) {
            if(err) {
                console.log(err.message)
            }
        }) //delete the main table containt all the data
        const command1 = "CREATE TABLE allEvents (" +
            "id	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE," +
            "code	TEXT UNIQUE," +
            "name TEXT," +
            "destination TEXT," +
            "startTime	TEXT," +
            "endTime	TEXT" +
            ")";
        db.run(command1, function(err) {
            if(err) {
                console.log(err.message)
            }
        })
    })
})

router.get('/new', (req, res) => {
    console.log("in /new")
    axios.get('http://localhost:5000/event/example')
        .then((res) => {
            console.log(res)
            return(res.data[0].password)
        })
        .then((response) => {
            db.serialize(function() {
                //adding the code to the main table
                db.run("INSERT INTO allEvents VALUES(null, ?, null, null, null, null)", [response], function(err) {
                    if(err) {
                            console.log("error insert new code: " , err)
                    } else {
                        res.send(this.lastID.toString()) //returning the id
                    }
                });
                //creating the item info table
                var command1 = "CREATE TABLE "+  response + "_ItemInfo"+ " (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT, startTime TEXT, endTime TEXT, itemDesc TEXT)";
                db.run(command1, function(err) {
                    if(err) {
                        console.log("error making table: ", err.message)
                    }
                })
                console.log("table itemInfo " + response + " created")
                //creating the suggestion table
                var command2 = "CREATE TABLE "+  response + "_Suggestion"+ " (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT, createdAt TEXT, text TEXT)";
                db.run(command2, function(err) {
                    if(err) {
                        console.log("error making table: ", err.message)
                    }
                })
                console.log("table Suggestion " + response + " created")
            })
            return response;
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        })


/*
db.serialize(function() {
  db.run("CREATE TABLE user (id INT, dt TEXT)");

  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  for (var i = 0; i < 10; i++) {
  
  var d = new Date();
  var n = d.toLocaleTimeString();
  stmt.run(i, n);
  }
  stmt.finalize();

  db.each("SELECT id, dt FROM user", function(err, row) {
      console.log("User id : "+row.id, row.dt);
  });
});

*/

    // db.run("INSERT INTO eventCode VALUES(null, ?)", (err) => {
    //     if(err) {
    //         console.log("error: " ,err.message)
    //     }
    // });

    // var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
    // for (var i = 0; i < 10; i++) {

    //     var d = new Date();
    //     var n = d.toLocaleTimeString();
    //     stmt.run(i, n);
    // }
    // stmt.finalize();

    // db.each("SELECT id, dt FROM user", function(err, row) {
    //     console.log("User id : "+row.id, row.dt);
    // });
    //db.close();
})    

router.get('/example', (req, res) => {
    axios.get('https://passwordwolf.com/api/?lower=off&numbers=off&special=off&length=7&repeat=1')
        .then(response => res.send(response.data))
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        })
})

router.get('/basic/:eventId', (req, res) => {
    db.all('SELECT * FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
        if(err) {
            console.log("error getting basic: ", err.message)
        } else {
            console.log("basicINfo: ",req.params.eventId," : ", rows)
            res.send(rows)
        }
    })
})

router.get('/items/:eventId', (req, res) => {
    
    db.serialize(function() {
        
        db.all('SELECT code FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
            if(err) {
                console.log("error getting basic: ", err.message)
            } else {
                var temp = rows[0].code + "_ItemInfo"
                console.log("temp: ", temp)
                var command = 'SELECT * FROM ' + temp
                console.log(command)
                db.all(command, (err, rows) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("inside /items/eventId")
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        })
    })
    
})

router.get('/suggestions/:eventId', (req, res) => {
    
    db.serialize(function() {
        
        db.all('SELECT code FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
            if(err) {
                console.log("error getting basic: ", err.message)
            } else {
                var temp = rows[0].code + "_Suggestion"
                console.log("temp: ", temp)
                var command = 'SELECT * FROM ' + temp
                console.log(command)
                db.all(command, (err, rows) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("inside /suggestion/eventId")
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        })
    })
    
})

router.post('/updateBasic/:eventId', (req, res) => {
    console.log("inside updatye basic")
    var command = "UPDATE allEvents SET " +
         "name = " + "'" + req.body.vacationName + "'" +
         ", destination = " + "'" + req.body.destination + "'" + 
         ", startTime = " + req.body.defaultTimeStart + 
         ", endTime = " + req.body.defaultTimeEnd +
         " WHERE id = " + req.params.eventId;

    console.log("command: ")
    console.log(command)
    db.run(command, function(err) {
        if(err) {
            console.log("error in posting basic update: " + err.message)
        }
    })
    res.send(command)
});

router.post('/addItem/:eventId', (req, res) => {
    db.serialize(function() {

        db.all('SELECT code FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
            if(err) {
                console.log("error getting basic: ", err.message)
            } else {
                console.log(req.params)
                console.log("rows: ", rows)
                console.log(req.body)
                var code = rows[0].code + "_ItemInfo"
                var command = "INSERT INTO " + code + " VALUES(null, " + 
                    "'" + req.body.title + "'" +  ", " +
                    "'" + req.body.startTime + "'" + ", " +
                    "'" + req.body.endTime + "'" + ", " + 
                    "'" + " " + "'" + ")";
                    
                console.log("command: ", command)
                db.run(command, function(err) {
                    if(err) {
                            console.log("error insert new code: " , err)
                    } else {
                        res.send(this.lastID.toString());
                    }
                });
            }
        })


    })
});

router.post('/addSuggestion/:eventId', (req, res) => {
    db.serialize(function() {
        db.all('SELECT code FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
            if(err) {
                console.log("error getting suggsetion: ", err.message)
            } else {
                console.log(req.params)
                console.log("rows: ", rows)
                console.log(req.body)

                var code = rows[0].code + "_Suggestion"
                var command = "INSERT INTO " + code + " VALUES(null";
                for(x in req.body) {
                        command += ", " + x + " = " + "'" + req.body[x] + "'"
                }    
                command += ")"

                console.log("command: ", command)
                db.run(command, function(err) {
                    if(err) {
                            console.log("error adding suggestion: " , err)
                    } else {
                        res.send(this.lastID.toString());
                    }
                });
            }
        })
    })
});


router.post('/updateItem/:eventId/:itemId', (req, res) => {
    db.serialize(function() {
        db.all('SELECT code FROM allEvents WHERE id=?', [req.params.eventId], (err, rows) => {
            if(err) {
                console.log("error getting basic: ", err.message)
            } else {
                console.log(req.params)
                console.log("rows: ", rows)
                console.log(req.body)
                
                var code = rows[0].code + "_ItemInfo"
                var command = "UPDATE " + code + " SET";
                const len = Object.keys(req.body).length
                var i = 1;
                for(x in req.body) {
                        command += " " + x + " = " + "'" + req.body[x] + "'"
                        if(i < len) {
                            command += " ,";
                            i++
                        }
                }    
                command += " WHERE id = " + req.params.itemId;

                console.log("command: ", command)
                db.run(command, function(err) {
                    if(err) {
                            console.log("error update Desc: " , err)
                    } else {
                        res.send(this.lastID.toString());
                    }
                });
            }
        })


    })
});
module.exports = router