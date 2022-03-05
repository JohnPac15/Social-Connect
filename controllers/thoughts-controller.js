const { User, Thought} = require('../models')

const ThoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
  },
  
  deleteThought({params}, res){
    Thought.findByIdAndDelete({_id: params.id})
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No Thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
  },

  addReaction(req, res){
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: {reactionId: params.reactionsId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = ThoughtController;
