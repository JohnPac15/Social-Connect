const router = require('express').Router();
const {getAllThoughts, getSingleThought, addThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thoughts-controller')


router
.route('/')
.get(getAllThoughts)

router
.route('/:id')
.get(getSingleThought)
.post(addThought)
.put(updateThought)
.delete(deleteThought)

router
.route('/reaction/:id')
.post(addReaction)

router
.route('/:thoughtId/:reactionId')
.delete(removeReaction)


module.exports = router