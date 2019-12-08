var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    // employeeID      : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    username        : {type: String, default: "user"},                                
    password        : {type: String, default: "password"},                                 //TODO: hash it
    name            : String,                                
    email           : String,                                 
    phone           : Number,                                 
    govIDNumber     : String,                                
    salary          : {type: Number, default: 0},                                
    role            : { 
                        type: String, 
                        enum: ['Admin','BookingManager', 'Hall Manager','Server Manager','Server', 'Kitchen Manager', 'Chef'], 
                        default: 'Server' 
                        },  
    speciality      : {type: Schema.Types.ObjectId, ref: 'Category'}, 
    tables          : [{type: Schema.Types.ObjectId, ref: 'Table'}],  
    attendance      : {type: Boolean, default: true}                                
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

//get speciality: TODO: remove this
EmployeeSchema
.virtual('get-speciality')
.set(function () {
    if(this.role != 'Chef'){
        return "Not a cook";
    }else{
        return this.speciality;
    }
});

//get tables TODO: remove this
EmployeeSchema
.virtual('get-tables')
.get(function () {
    if(this.role != 'Server'){
        return "Not a Server";
    }else{
        return this.tables;  
    }
});

//get rating======v2 stuff
// EmployeeSchema
// .virtual('rating')
// .get(function () {
//     return this.rating;  
// });


/************** Setters ********************/

//set tables: assign more tables to Server. 
EmployeeSchema
.virtual('add-tables')
.set(function (tables) {
    if(this.role != 'Server'){
        return "Not a Server: Adding tables to wrong employee type";
    }else{
        this.tables.push(tables); 
    }
});


//******v2 stuff */
//increase rating
// EmployeeSchema
// .virtual('give-rating')
// .set(function (rating) {
//     if(this.role != 'Server'){
//         console.log("Not a Server: Rating wrong employee type");
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
EmployeeSchema
.virtual('mark-attendance')
.set((attendance)=> {
    this.attendance = attendance;  
});

//compile the Model
var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {
    Employee
}