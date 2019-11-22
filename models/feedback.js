var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    feedbackID     : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    order          : {type: Schema.Types.ObjectId, ref: 'Order'},
    serverStars    : Number,
    comments       : String,
    likedDishes    : [Dish],
    dislikedDish   : [Dish]
})

var Feedback = mongoose.model('Feedback', feedbackSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Feedback
}