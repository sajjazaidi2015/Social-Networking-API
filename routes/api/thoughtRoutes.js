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

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(deleteReaction)

module.exports = router;