var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    username        : {type: String, default: "user"},                                
    password        : {type: String, default: "password"},                                 //TODO: hash it
    name            : String,                                
    email           : String,                                 
    phone           : Number,                                 
    govIDNumber     : String,                                
    salary          : {type: Number, default: 0},                                
    role            : { 
                        type: String, 
                        enum: ['Admin','Booking Manager', 'Hall Manager','Waiter Manager','Waiter', 'Kitchen Manager', 'Chef'], 
                        default: 'Waiter' 
                        },  
    // attendance      : {type: Boolean, default: true}                                
    attendance      : { 
                        type: String, 
                        enum: ['Present','Absent'], 
                        default: 'Present' 
                        },                                
    // rating          : {type: Number, default: 3},       //scale-size:5  //TO be done in v2                       
}) 


//===============
//    Methods
//===============
/************** Assertions ********************/
//assertion for email

//assertion for phone

//assertion for govIdNumber

/************** Getters ********************/


//get rating======v2 stuff
// EmployeeSchema
// .virtual('rating')
// .get(function () {
//     return this.rating;  
// });


/************** Setters ********************/



//******v2 stuff */
//increase rating
// EmployeeSchema
// .virtual('give-rating')
// .set(function (rating) {
//     if(this.role != 'Waiter'){
//         console.log("Not a Waiter: Rating wrong employee type");
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
var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee