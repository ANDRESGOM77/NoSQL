const { thought, user, reaction } = require('../models');
const {Types} = require('mongoose');

// Define the thoughtController object, which contains methods for handling various API requests related to thoughts
const thoughtController = {
  async getAllthoughts(req, res) {
    try {
      const thoughts = await thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "get thought by ID" API endpoint
  async getthoughtsById(req, res) {
    try {
      const thought = await thought.findOne({_id:req.params.thoughtId});
      if (!thought) {
        res.status(404).json({ message: 'thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Handler for the "create thought" API endpoint
  async createthought(req, res) {
    try {
      const thought = await thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Handler for the "delete thought" API endpoint
  async deletethought(req,res) {
    try {
        const thought = await thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  // Handler for the "update thought by ID" API endpoint
  async updatethoughtById(req, res) {
    try {
      const thought = await thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "create reaction" API endpoint
  async createReaction(req, res) {
      try {
        const thought = await thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

// Handler for the "delete reaction" API endpoint
  async deleteReaction(req, res) {
      try {
        const thought = await thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        thought ? res.json(thought) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

};
// Export thoughtController
module.exports = thoughtController;