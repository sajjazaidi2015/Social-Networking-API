const { User, Thought } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) => 
    !user
    ? res
        .status(404)
        .json({ message: 'Thought created, but found no user with that ID' })
    : res.json('Created the thought')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
  // Update the User
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $set: req.body},
      { runValidators: true, new: true})
      .then((err, result) => {
        if(err) res.status(500);
        res.status(200).json(result);
      }
      )
  },
  deleteThought(req, res){
    Thought.findOneAndDelete(
        { _id: req.params.thoughtId })
        .then((err, result) => {
            if (!result) {
                res.status(200).json({
                    message: `Deleted: ${req.params.thoughtId} successfully` 
                });
                console.log(`Deleted: ${req.params.thoughtId} successfully`);
              } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ error: 'Something went wrong' });
          }
        }
        );
  },
  addReaction(req, res){
    User.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true})
        .then((err, result) => {
          if(err) res.status(500);
          res.status(200).json(result);
        });
  },
  deleteReaction(req, res) {
    User.findOneAndDelete(
        { _id: req.params.thoughtId  },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true })
        .then((err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
          }
        });
  }
}