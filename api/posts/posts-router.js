// // implement your posts router here
 const express = require('express')
 const post = require('./posts-model')

 const router = express.Router()

 router.get('/', (req, res) => {
    post.find()
      .then(found => {
          res.json(found)
        })
       .catch(err => {
        res.status(500).json({
            message: 'The post information could not be retrieved',
            err: err.message,
            stack: err.stack,

       }) 
       
      });
  });


router.get('/', async (req, res) => {
    try {
      const post = await this.post.findById(req.params.id)
      if(!post) {
          res.status(404).json({
              message: 'The post with the specified ID does not exist',
          })
      }else {
          res.json(post)
      }
    }catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
  })

  

  router.post('/', (req, res) => {
    const { tittle, contents } = rq.body
      if (!tittle || !contents) {
          res.status(400).json({
              message: 'please provide title and contents for the post'
          })
      }else {
          post.insert({ title, contents})
            .then(( { id }) => {
                return post.findById(id)
            })
            .then( post =>{
                res.status(201).json(post)
            })
            .cath(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err.message,
                    stack: err.stack,

            })
            })
       }
    }) 
      

    router.delete('/:id', (req, res) => {
        try {
            const post = await this.post.findById(req.params.id)
            if (!post) {
                res.status(404).json({
                    message: "The post with specified ID does not exist"
                })
            }else {
                await post.remove(req.params.id)
                res.json(post)
            }
        }catch (err) {
          res.status(500).json({
              message: "The post could not be removed",
              err: err.message,
              stack: err.stack,
  
      })
               
        }
      
    });


  router.put('/:id', (req, res) => {
    const { tittle, contents } = rq.body
      if (!tittle || !contents) {
          res.status(400).json({
              message: 'please provide title and contents for the post'
          })
        }else {
            post.findById(req.params.id)
            .then(stuff =>{
                if (!stuff) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                }else {
                    return post.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return post.findById(req.params.id)
                }
            })
            .then(post => {
                if (post) {
                    res.json(post)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "The posts information could not be retrieved",
                    err: err.message,
                    stack: err.stack,
        

                })
            })

        }
  });

  router.get('/api:id:messages', async (req, res) =>{
      try{
        const post = await this.post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: "The post with specified ID does not exist"
            })
      }else {
          const messages = await post.findPostComments(req.params.id)
          res.json(messages)
      }
    }catch(err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })

      }
  })
  
module.exports = router