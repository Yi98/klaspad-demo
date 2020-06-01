const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const dbConnect = require('../database/db_connect');
const db = dbConnect.getDb();

router.get('/messages', (req, res) => {
  db.collection('messages')
    .find({})
    .toArray((err, results) => {
      if (err) {
        return res.json({ err });
      }

      res.render('index', { messages: results });
    });
});

router.get('/messages/:id', (req, res) => {
  db.collection('messages')
    .findOne({ '_id': new ObjectId(req.params.id) }, (err, result) => {
      if (err) {
        return res.json({ err });
      }

      res.render('details', { message: result });
    });
});


router.post('/message', (req, res) => {
  db.collection('messages')
    .insertOne({ 'content': req.body.content }, (err, results) => {
      if (err) {
        return res.json({ err });
      }

      res.redirect('/messages');
    });
});

router.put('/messages/:id', (req, res) => {
  db.collection('messages')
    .updateOne({ '_id': new ObjectId(req.params.id) }, { $set: { content: req.body.content } }, (err, results) => {
      if (err) {
        return res.json({ err });
      }

      res.json({ message: 'succeed' });
    });
});

router.delete('/messages/:id', (req, res) => {
  db.collection('messages')
    .deleteOne({ '_id': new ObjectId(req.params.id) }, (err, results) => {
      if (err) {
        return res.json({ err });
      }

      res.json({ message: 'succeed' });
    });
});


// catch all unknown routes
router.get('*', (req, res) => {
  res.redirect('/messages');
});

module.exports = router;