const router = require('express').Router()

const {
    getAllUsers,
    getSingleUser,
    createUser
} = require('../../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getSingleUser)

module.exports = router