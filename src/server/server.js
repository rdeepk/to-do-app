// const mongoose = require('mongoose');
// const schema = mongoose.Schema;
const express = require('express'),
bodyParser = require('body-parser'),
app = express();

var todo = require('./controllers/todo');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

// mongoose.connect('mongodb://localhost/data/db/');

// mongoose.Promise = global.Promise;

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {
//     console.log("connected to db at /data/db");
// });
app.post('/todos', todo.addTodo);
app.get('/todos', todo.getTodos);

app.listen(8080);

// let statusSchema =  new schema({
//     title: String
// })
// let Status = mongoose.model('Status', statusSchema);

// app.post('/add/:key',(req, res)=>{
//     let status = req.query.status;
//     let newStatus = Status(status);
//     newStatus.save()
//     .then((BlogPost) => {
//         console.log("New blog post created");
//     })
//     .catch(err => console.log(err));
// })