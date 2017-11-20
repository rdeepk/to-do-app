// const _ = require('lodash');
// const {ObjectID} = require('mongodb');
var {mongoose} = require('./../db/mongoose');
var {Todo} = require('./../models/todo');

var todoController = {};

todoController.addTodo = [
  function(req,res,next) {
    console.log(req.body);
    var todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      project: req.body.project,
      labels: req.body.labels
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
  }
];

todoController.getTodos = [
  function(req,res,next) {
    Todo.find().then((todos) => {
      res.send({todos})
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

todoController.updateTodo = (req, res, next) => {
  Todo.findOneAndUpdate(req.query.id, req.body, {new: true}, function(err, doc){
    if (err) return res.status(400).send(err);
    return res.send(doc);
  });
}

// todoController.deleteOneTodo = [
//   function(req,res,next) {
//   var id = req.params.id;

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
//   }
// ]

// todoController.deleteOneTodo = [
//   function(req,res,next) {
//   var id = req.params.id;

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
//   }
// ]

module.exports = todoController;