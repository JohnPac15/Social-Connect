const { User } = require("../models");


const UserController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
          path: 'thoughts',
          select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate(
      //   {
      //   path: "thoughts",
      //   select: "-__v",
      // },
      {
        path: 'friends',
        select: '-__v'
      }
      )
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res){
    User.findOneAndUpdate(
      {_id: params.userId},
      {$addToSet: { friends: params.friendId}},
      {new: true}
    )
    .then(dbUserData =>{
      if(!dbUserData){
        return res.status(404).json({message: "No User with this id"})
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  removeFriend({params}, res){
    console.log(params, "!!!!!!")
    User.findOneAndUpdate(
      {_id: params.userId},
      {$pull: {friends: params.friendId}},
      {new: true}
    )
    .select("-__v")
    .then(dbUserData => {
      console.log(dbUserData,'+++++++')
      if(!dbUserData){
        return res.status(404).json({message: 'No User with this ID'})
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};

module.exports = UserController;
