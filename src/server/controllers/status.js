var {mongoose} = require('./../db/mongoose');
var {Status} = require('./../models/status');

var statusController = {};

statusController.addStatus = [
  function(req,res,next) {
    var status = new Status({
      title: req.body.title
    });

    status.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

statusController.getStatus = [
  function(req,res,next) {
    Status.find().then((status) => {
      res.send({status})
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

statusController.getStatusById = (req,res,next) => {
  if(req.query.id) {
    Status.find({_id:req.query.id}).then((status) => {
      res.send({status})
    }, (e) => {
      res.status(400).send(e);
    });
  } 
}

module.exports = statusController;