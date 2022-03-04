const express = require('express');
const router = express.Router();
const Post = require('../models/post_model.js');

//////////////////////////////// GET //////////////////////////////////

//Get back all the posts
router.get('/', async (req, res) => {
    //res.send('We are on posts');

    try{
        const posts = await Post.find(); //retornar tudo
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
})


router.get('/specific', (req, res) => {
    res.send('We are on specific');
})


//Specific get post
router.get('/get_by_id/:postId', async (req, res) => {
    //console.log(req.params.postId); receber o que foi escrito após o ultimo /


    //receber dados do objeto específico
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }

})


//////////////////////////////// POST //////////////////////////////////


//Submit a post
router.post('/', async (req, res) => {
    //console.log(req.body); saber o que foi postado

    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
    

});


//////////////////////////////// DELETE //////////////////////////////////


router.delete('/:postId', async (req, res) => {
    
    try {
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch (error) {
        res.json({message: error});
    }

});


//////////////////////////////// UPDATE //////////////////////////////////


router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({message: error});
    }
});




module.exports = router;