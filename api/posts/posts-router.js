// implement your posts router here
const express = require('express')
const post = require('./posts-model')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
      const posts = await post.find(req.query)
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({
        message: `The posts information could not be retrieved`,
      })
    }
  })

  router.get('/:id', (req, res) => {
    post.findById(req.params.id)
      .then(adopter => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be retrieved',
        });
      });
  });

  router.post('/', (req, res) => {
    post.add(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: '{ message: "There was an error while saving the post to the database" }',
        });
      });
  });

  router.put('/:id', (req, res) => {
    const changes = req.body;
    post.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be modified',
        });
      });
  });

  router.delete('/:id', (req, res) => {
    post.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The adopter has been nuked' });
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post could not be removed',
        });
      });
  });

  module.exports = router