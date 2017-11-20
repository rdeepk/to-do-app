var {mongoose} = require('./../db/mongoose');
var {Project} = require('./../models/project');

var projectController = {};

projectController.addProject = [
  function(req,res,next) {
    var project = new Project({
      title: req.body.title
    });

    project.save().then((doc) => {
      res.send(doc);
    }, (e) => {
        console.log(e)
      res.status(400).send(e);
    });
  }
];

projectController.getProject = [
  function(req,res,next) {
    Project.find().then((project) => {
      res.send({project})
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

projectController.getProjectById = (req,res,next) => {
  if(req.query.id) {
    Project.find({_id:req.query.id}).then((project) => {
      res.send({project})
    }, (e) => {
      res.status(400).send(e);
    });
  } 
}

module.exports = projectController;