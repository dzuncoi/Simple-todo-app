/*
* @author: dzuncoi
* @date: April 1 2017
*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  created_at: {type: Number, default: 0},
  modified_at: {type: Number, default: 0}
})

/**
 * Pre-save hook
 */
schema
.pre('save', function(next) {
  // Save date created and date modified
  const date = new Date().getTime();
  if (!this.created_at) {
    this.created_at = date;
  }
  this.modified_at = date;
  return next();
});

const category = mongoose.model('category', schema);

export default category
