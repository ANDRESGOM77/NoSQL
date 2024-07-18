// const { thought, user, reaction, Thought } = require("../models");

const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: "thought not found" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      console.log(`Creating thought with text: ${thoughtText} and username: ${username}`);
  
      const user = await User.findOne({ username });
      if (!user) {
        console.error(`User not found with username: ${username}`);
        return res.status(404).json({ message: "User not found" });
      }
  
      const thought = new Thought({ thoughtText, username });
      await thought.save();
      console.log(`Thought created successfully: ${thought._id}`);
  
      user.thoughts.push(thought);
      await user.save();
      console.log(`Thought added to user's thoughts array`);
  
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating thought" });
    }
  },
  // Handler for the "delete thought" API endpoint
  async deleteThought (req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findByIdAndDelete(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting thought' });
    }
  },

  // Handler for the "update thought by ID" API endpoint
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      if (!thought) {
        res.status(404).json({ message: "thought not found" });
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
      const thoughtId = req.params.thoughtId;
      console.log(`Thought ID: ${thoughtId}`); // Log the thoughtId to verify
  
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        console.error(`Thought not found with ID: ${thoughtId}`);
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      const reaction = new Reaction(req.body);
      thought.reactions.push(reaction);
      await thought.save();
  
      res.json({ message: 'Reaction created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating reaction' });
    }
  },

  // Handler for the "delete reaction" API endpoint
  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const reactionIndex = thought.reactions.findIndex((reaction) => reaction._id.toString() === reactionId);
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
      res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting reaction' });
    }
  },
};
// Export thoughtController
module.exports = thoughtController;
