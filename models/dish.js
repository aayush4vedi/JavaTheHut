var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var DishSchema = new Schema({
    // dishID          : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name            : {type: String, required: [true, '1<len<100'], min: 1, max: 100},                                 
    description     : String,
    ingredients     : [String],                               //Major ingredients: to be manually entered for luring customers:Enter ' ' separated items 
    goods           : [{                                      // To be entered as key-val pairs
                        good        : {type: Schema.Types.ObjectId, ref: 'Good'},
                        quantity    : {type: Number, default: '1'}  // xUnits(grams)
                      }],
    // category        : {type: Schema.Types.ObjectId, ref: 'Category'},
    price           : { type: Number, default:0},                                 
    isServing       : { 
                        type: String, 
                        enum: ['Yes','No'], 
                        default: 'Yes' 
                        },
    veg             : { 
                        type: String, 
                        enum: ['Veg','Non-Veg'], 
                        default: 'Veg' 
                        },                            //function returns string: 'veg'/'non-veg'
    eta             : {type: Number, default:15},       //in minutes                                 //of minutes
    // likes           : { type: Number, default:1},    //v2 stuff                              
    // dislikes        : { type: Number, default:0}     //v2 stuff                                              
})


//===============
//    Methods
//===============

/************** Setters ********************/


// ===< v2 stuff >=====
// //increase likes
// DishSchema
// .virtual('liked')
// .set(function () {  
//     this.likes = 1+ this.likes;
// });

// //increase dislikes
// DishSchema
// .virtual('disliked')
// .set(function () {  
//     this.dislikes = 1+ this.dislikes;
// });


/************** Others ********************/


//compile the Model
var Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish