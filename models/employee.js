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
//get name
EmployeeSchema
.virtual('name')
.get(function () {
    return this.name;  
});

//get email
EmployeeSchema
.virtual('email')
.get(function () {
    return this.email;  
});

//get phone 
EmployeeSchema
.virtual('phone')
.get(function () {
    return this.phone;  
});

//get govIDNumber
EmployeeSchema
.virtual('govIDNumber')
.get(function () {
    return this.govIDNumber;  
});

//get salary
EmployeeSchema
.virtual('salary')
.get(function () {
    return this.salary;  
});

//get role
EmployeeSchema
.virtual('role')
.get(function () {
    return this.role;  
});

//get speciality
// get speciality
EmployeeSchema
.virtual('speciality')
.set(function () {
    if(this.role != 'Chef'){
        return "Not a cook";
    }else{
        return this.speciality;
    }
});

//get tables
EmployeeSchema
.virtual('tables')
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

//get attendance
EmployeeSchema
.virtual('attendance')
.get(function () {
    return this.rating == true ? "Present" : "Absent";  
});


/************** Setters ********************/
//set name
EmployeeSchema
.virtual('name')
.set(function (name) {
    this.name = name;  
});

//set email
EmployeeSchema
.virtual('email')
.set(function (email) {
    this.email = email;  
});

//set phone 
EmployeeSchema
.virtual('phone')
.set(function (phone) {
    this.phone = phone;  
});

//set govIDNumber
EmployeeSchema
.virtual('gov-id-number')
.set(function (govIDNumber) {
    this.govIDNumber = govIDNumber;  
});

//set salary
EmployeeSchema
.virtual('salary')
.set(function (salary) {
    this.salary = salary;  
});

//set role
EmployeeSchema
.virtual('role')
.set(function (role) {
    this.role = role;  
});

// set speciality
EmployeeSchema
.virtual('speciality')
.set(function (speciality) {
    this.speciality = speciality;  
});

//set tables: assign new tables to Server
EmployeeSchema
.virtual('tables')
.set(function (tables) {
    if(this.role != 'Server'){
        return "Not a Server: Adding tables to wrong employee type";
    }else{
        this.tables.push(tables); 
    }
});

//set attendance:
//mark present
EmployeeSchema
.virtual('mark-present')
.set(function () {
    this.attendance = true;  
});

//mark absent
EmployeeSchema
.virtual('mark-absent')
.set(function () {
    this.attendance = false;  
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


//compile the Model
var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {
    Employee
}