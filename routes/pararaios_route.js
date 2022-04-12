const express = require('express');
const router = express.Router();
const Pararaio = require('../models/pararaio_model.js');

//////////////////////////////// GET //////////////////////////////////

//Get back all the posts
router.get('/', async (req, res) => {
    //res.send('We are on posts');

    try {
        const posts = await Pararaio.find(); //retornar tudo
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
})


router.get('/specific', (req, res) => {
    res.send('We are on specific');
})


//Specific get post
router.get('/get_by_id/:postId', async (req, res) => {


    //receber dados do objeto específico
    try {
        const post = await Pararaio.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

})


//////////////////////////////// POST //////////////////////////////////


//Submit a post
router.post('/', async (req, res) => {
    //console.log(req.body); saber o que foi postado

    const post = new Pararaio({
        azimute: req.body.azimute,
        info: req.body.info,
        subStation: req.body.subStation
    });

    //Verificar objeto repetido
    let pararaioExists = await Pararaio.findOne({info: req.body.info});
    if(pararaioExists){
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
        const removedPost = await Pararaio.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }

});


//////////////////////////////// UPDATE //////////////////////////////////


router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Pararaio.updateOne(
            { _id: req.params.postId },
            { $set: req.body }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});




module.exports = router;