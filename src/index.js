const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//Middlewares
app.use(cors());
app.use(bodyParser.json());

/**
//Middlewares, atua sempre quando seu parâmetro é chamado 
app.use('/posts', () => {
    console.log("This is a middleware running");
})
*/

//import Routes
const postsRoute = require('../routes/posts_route.js');

app.use('/posts', postsRoute);



//routes
app.get('/', (req, res) => {
    res.send("Whe are on home");
});



//connect to db
mongoose.connect(
    //url escondida
    process.env.DB_CONNECTION, 
{useNewUrlParser: true},
() => {
    console.log("connetct to db!");
}
);


app.listen(3000, () => console.log("Server running"));