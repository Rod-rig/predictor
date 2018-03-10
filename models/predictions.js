const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

module.exports.all = (cb) => {
  db.get().collection('table').find().toArray((err, docs) => {
    cb(err, docs);
  });
};

module.exports.getById = (id, cb) => {
  let detailsId = {_id: new ObjectID(id)};
  db.get().collection('predictions').findOne(detailsId, (err, doc) => {
    cb(err, doc);
  });
};

module.exports.create = (prediction, cb) => {
  db.get().collection('predictions').insertOne(prediction, (err) => {
    cb(err);
  });
};

module.exports.update = (id, prediction, cb) => {
  let detailsId = {_id: new ObjectID(id)};
  db.get().collection('predictions').updateOne(detailsId, prediction, (err, docs) => {
    cb(err, docs);
  });
};

module.exports.delete = (id, cb) => {
  let detailsId = {_id: new ObjectID(id)};
  db.get().collection('predictions').removeOne(detailsId, (err) => {
    cb(err);
  });
};