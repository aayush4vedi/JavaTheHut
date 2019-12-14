//WaiterInstance where role is 'Waiter'var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var WaiterSchema = new Schema({
    name            : String,                                
    employee        : {type: Schema.Types.ObjectId, ref: 'Employee'}, 
    tables          : [{type: Schema.Types.ObjectId, ref: 'Table'}],  
    attendance      : {type: Boolean, default: true}                                
}) 


//===============
//    Methods
//===============
/************** Assertions ********************/
//assertion for email

//assertion for phone

//assertion for govIdNumber

/************** Getters ********************/

//get speciality: TODO: remove this
WaiterSchema
.virtual('get-speciality')
.set(function () {
    if(this.role != 'Chef'){
        return "Not a cook";
    }else{
        return this.speciality;
    }
});

//get tables TODO: remove this
WaiterSchema
.virtual('get-tables')
.get(function () {
    if(this.role != 'Waiter'){
        return "Not a Waiter";
    }else{
        return this.tables;  
    }
});

//get rating======v2 stuff
// WaiterSchema
// .virtual('rating')
// .get(function () {
//     return this.rating;  
// });


/************** Setters ********************/

//set tables: assign more tables to Waiter. 
WaiterSchema
.virtual('add-tables')
.set(function (tables) {
    if(this.role != 'Waiter'){
        return "Not a Waiter: Adding tables to wrong waiter type";
    }else{
        this.tables.push(tables); 
    }
});


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


//set attendance:
//1.mark present
WaiterSchema
.virtual('mark-attendance')
.set((attendance)=> {
    this.attendance = attendance;  
});

//compile the Model
var Waiter = mongoose.model('Waiter', WaiterSchema);

module.exports = {
    Waiter
}