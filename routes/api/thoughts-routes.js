const router = require('express').Router();
const {getAllThoughts, getSingleThought, addThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thoughts-controller')


router
.route('/')
.get(getAllThoughts)
.post(addThought)

router
.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionsId')
.delete(removeReaction)


module.exports = router

