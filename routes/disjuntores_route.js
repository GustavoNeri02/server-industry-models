const express = require('express');
const router = express.Router();
const Disjuntor = require('../models/disjuntor_model.js');

//////////////////////////////// GET //////////////////////////////////

//Get back all the posts
router.get('/', async (req, res) => {
    //res.send('We are on posts');

    try {
        const posts = await Disjuntor.find(); //retornar tudo
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
})

//Specific get post
router.get('/specific', (req, res) => {
    res.send('We are on specific');
})


//Get by ID
router.get('/get_by_id/:postId', async (req, res) => {


    //receber dados do objeto específico
    try {
        const post = await Disjuntor.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

})


//////////////////////////////// POST //////////////////////////////////


//Submit a post
router.post('/', async (req, res) => {
    //console.log(req.body); saber o que foi postado

    const post = new Disjuntor({
        azimute: req.body.azimute,
        info: req.body.info,
        subStation: req.body.subStation
    });

    //Verificar objeto repetido
    let disjuntorExists = await Disjuntor.findOne({info: req.body.info});
    if(disjuntorExists){
        return res.status(400).json({
            error: true,
            message: "Modelo já cadastrado!"
        })
    }

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

});


//////////////////////////////// DELETE //////////////////////////////////


router.delete('/:postId', async (req, res) => {

    try {
        const removedPost = await Disjuntor.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }

});


//////////////////////////////// UPDATE //////////////////////////////////


router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Disjuntor.updateOne(
            { _id: req.params.postId },
            { $set: req.body }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});




module.exports = router;