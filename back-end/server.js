const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/twitter', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for comment in the thread: a name and a comment
const itemSchema = new mongoose.Schema({
  name: String,
  comment: String,
  liked: Boolean,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    comment: req.body.comment,
    liked: req.body.liked,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    console.log("In Get!");
    let items = await Item.find();
    console.log(items);
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req,res)=>{
    try{
      await Item.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/items/:id', async (req, res)=>{
  try{
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.comment = req.body.comment;
    item.save();
    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/items/like/:id', async (req, res)=>{
  console.log("in Like API" + req.params.id);
  try{
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.liked = !item.liked;
    item.save();
    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
