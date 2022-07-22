const express = require('express');
const db = require('./config/connection');

const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/new-User/', (req, res) => {
  // create a constant variable to hold a department
  const newUser = new User({ username: req.body.username , email: req.body.email});
  // the save method will push any data inside of our variable to 
  // a document inside of the database
  newUser.save();
  // after the save, _id will be on the variable "newUser"
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.put('/find-one-update/:_id', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id},
    { username: req.body.username , email: req.body.email},
    { returnDocument: "after"}, 
    (err, result) => {
      if(err) res.status(500);
      res.status(200).json(result);
    }
  );
});

app.get('/User', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.delete('/find-one-delete/:username', (req, res) => {
  User.findOneAndDelete(
    { name: req.params.username },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

