var mongoose = require('mongoose');

//===============
//     Structure
//===============

var employeeSchema = mongoose.Schema({
    employeeID      : UUID,     //TODO: figure out more
    password        : String,   //TODO: hash it
    name            : String,
    email           : Email,    //TODO:
    contact_number  : Number,   //TODO: write check for all these entries
    govIDNumber     : String,
    salary          : Number,
    role            : String,   //TODO: make it enum
    speciality      : String,   //TODO: 1. make Enum, 2.check for <null if Role!=Cook>
    tables          : ArrayOfInt,    //TODO:??
    rating          : Number,   //TODO: 1.make it float 2. formula for rating calculation 3. check <null if Role!=Server>
    attendance      : Boolean   //TODO: is this correct
})

//===============
//    Methods
//===============






module.exports = mongoose.model('Employee', employeeSchema)