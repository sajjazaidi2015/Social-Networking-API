const { Thought, User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Update the User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $set: req.body},
      { runValidators: true, new: true}
      )
      .then((err, result) => {
        if(err) res.status(500);
        res.status(200).json({
            message: `Updated: ${req.params.userId} successfully` 
        });
      })
    
  },
  deleteUser(req, res){
    User.findOneAndDelete(
        { _id: req.params.userId })
        .then((err, result) => {
            console.log("result ===>", result)
          if (!result) {
            res.status(200).json({
                message: `Deleted: ${req.params.userId} successfully` 
            });
            console.log(`Deleted: ${req.params.userId} successfully`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
          }
        })
      ;
  },
  addFriend(req, res){
    console.log('req ===>', req)
    User.findOneAndUpdate(
        { _id: req.params.userId},
        { $push: { friends: req.params.friendId } },
        { new: true}) 
        .then((err, result) => {
          if(err) res.status(500);
          res.status(200).json(result);
        })
      ;
  },
  deleteFriend(req, res) {
    User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true })
        .then((err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
          }
        })
      ;
  }
}