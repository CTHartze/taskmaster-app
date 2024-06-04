//import mongoose to create new Schema
const mongoose = require('mongoose');

//create Schema
const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String,
    required: true
  }
})

//export Schmema
module.exports = mongoose.model('todo', TodoItemSchema);