var {mongoose} = require('./../db/mongoose');
var {Status} = require('./../models/status');

var statusController = {};

statusController.addStatus = [
  function(req,res,next) {
      console.log(req.body);
    var status = new Status({
      title: req.body.title
    });

    status.save().then((doc) => {
      res.send(doc);
    }, (e) => {
        console.log(e)
      res.status(400).send(e);
    });
  }
];

statusController.getStatus = [
  function(req,res,next) {
    Status.find().then((status) => {
      res.send({status})
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
  }
];

module.exports = statusController;