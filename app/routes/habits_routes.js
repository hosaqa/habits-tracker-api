// note_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

  app.get('/habits', (req, res) => {
    db
      .collection('habits')
      .find()
      .toArray((err, data) => {
        res.send(data);
      });
  });

  app.get('/habits/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    db
      .collection('habits')
      .findOne(details, (err, item) => {
        if (err) {
          res.send({'error': 'An error has occurred'});
        } else {
          res.send(item);
        }
      });
  });

  app.post('/habits', (req, res) => {
    const habit = {
      title: req.body.title
    };
    db
      .collection('habits')
      .insert(habit, (err, result) => {
        if (err) {
          res.send({'error': 'An error has occurred'});
        } else {
          res.send(result.ops[0]);
        }
      });
  });

  app.delete('/habits/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    db
      .collection('habits')
      .remove(details, (err, item) => {
        if (err) {
          res.send({'error': 'An error has occurred'});
        } else {
          res.send('Habit ' + id + ' deleted!');
        }
      });
  });

  app.put('/habits/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    const habit = {
      title: req.body.title
    };
    db
      .collection('habits')
      .update(details, habit, (err, result) => {
        if (err) {
          res.send({'error': 'An error has occurred'});
        } else {
          res.send(habit);
        }
      });
  });

};