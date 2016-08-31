/**
 * Book model for Mongoose
 */

// Step 0 - Get our dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment').schema;

// Step 1 - Create the Schema
var bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  publishDate: Date,
  publishedBy: String,
  comments: [Comment],
  //postedBy: String
});

// Step 2 - Create the model
var Book = mongoose.model('Book', bookSchema);

// Step 3 - Export our model so we can use it in other parts of our app
module.exports = Book;
