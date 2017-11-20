const express = require('express'),
bodyParser = require('body-parser'),
app = express();

var todo = require('./controllers/todo');
var status = require('./controllers/status');
var project = require('./controllers/project');
var label = require('./controllers/label');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.post('/todos', todo.addTodo);
app.get('/todos', todo.getTodos);

app.post('/status', status.addStatus);
app.get('/status', status.getStatus);
app.get('/statusById', status.getStatusById);

app.post('/project', project.addProject);
app.get('/project', project.getProject);
app.get('/projectById', project.getProjectById);

app.post('/label', label.addLabel);
app.get('/label', label.getLabel);
app.get('/labelById', label.getLabelById);

app.listen(8080);