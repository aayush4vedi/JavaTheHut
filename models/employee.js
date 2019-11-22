var mongoose = require('mongoose');
var uuid = require('node-uuid');
import Table from './table'

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    employeeID             : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    password        : String,                                 //TODO: hash it
    name            : String,                                
    email           : String,                                 //TODO: check for email type:write assertion
    contact_number  : Number,                                 //TODO: :write assertion
    govIDNumber     : String,                                
    salary          : Number,                                
    role            : { 
                        type: String, 
                        enum: ['Admin','BookingManager', 'Hall Manager','Server Manager','Server', 'Kitchen Manager', 'Chef'], //TODO: make it dynamic
                        default: 'Server' 
                        },  
    speciality      : { 
                        type: String, 
                        enum: ['Chinese','South Indian', 'North Indian','Punjabi','Itallian', 'All'] , //TODO: make it dynamic
                        default: 'All' 
                        },                                  //TODO: check for <null if Role!=Cook>
    tables          : [Table],                                  //TODO: can't we manage just with table_ID
    rating          : Number,                                 //TODO: 1.make it float 2. formula for rating calculation 3. check <null if Role!=Server>
    attendance      : Boolean                                 
})

var Employee = mongoose.model('Employee', employeeSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Employee
}