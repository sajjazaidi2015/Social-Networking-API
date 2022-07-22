const router = require('express').Router();
const {
  getSingleThought,
  getThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,

} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:userId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/userId/friends/:friendId').post(addReaction).delete(deleteReaction)

module.exports = router;