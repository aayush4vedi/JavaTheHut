//WaiterInstance where role is 'Waiter'var mongoose = require('mongoose');
var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var WaiterSchema = new Schema({
    waiterID        : String,                                
    employee        : {type: Schema.Types.ObjectId, ref: 'Employee'}, 
    // tables          : [{type: Schema.Types.ObjectId, ref: 'Table'}],  //TODO: later
    rating          : {type: Number, default: 5}                                
    // attendance      : {type: Boolean, default: true}                             
}) 


//===============
//    Methods
//===============
/************** Assertions ********************/
//assertion for email

//assertion for phone

//assertion for govIdNumber


//******v2 stuff */
//increase rating
// WaiterSchema
// .virtual('give-rating')
// .set(function (rating) {
//     if(this.role != 'Waiter'){
//         console.log("Not a Waiter: Rating wrong waiter type");
//         return 0;
//     }else{
//         var oldSum = 0;
//         var scale = 5; //make it dynamic later
//         var numberOfRatings = this.rating.length;
//         this.rating.forEach(rating => {
//             oldSum = oldSum + rating;
//         });
//         var oldRating = oldSum/(scale*numberOfRatings);
//     }
// });

/************** Utils ********************/
//signin

//signup

//logout

//forget username

//forget password

//v2 stuff========calculate rating


//compile the Model
var Waiter = mongoose.model('Waiter', WaiterSchema);

module.exports = Waiter