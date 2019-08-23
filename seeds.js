var mongoose    = require('mongoose'),
    Hotel       = require('./models/hotel'),
    Comment     = require('./models/comment')

var data = [
    {
        name        : "The Ritz-Carlton",
        image       : "https://lh3.googleusercontent.com/p/AF1QipNE7Np6SuJ_MdJP8CUuqZuL0tDMN-MRlWdlx428=w592-h404-n-k-rw-no-v1",
        description : "Posh lodging featuring chic dining & a rooftop bar, plus an expansive spa & an outdoor pool."
    },
    {
        name        : "La Marvella",
        image       : "https://lh3.googleusercontent.com/p/AF1QipM_iAS5Y9H40FrxTtPkZszhJhmem6Vva8SasLY4=w592-h404-n-k-rw-no-v1",
        description : "Polished hotel offering a restaurant & a bar, plus an outdoor pool & a 24-hour fitness room."
    },
    {
        name        : "Grand Mercure",
        image       : "https://lh3.googleusercontent.com/p/AF1QipPnaPc7H5JX1zJYEWeNZh1RdYB_iauTgPI-nEaZ=w592-h404-n-k-rw-no-v1",
        description : "Chic suites with kitchenettes in an upmarket hotel offering a restaurant & a poolside bar."
    },
    
];
function seedDB(){
    //Remove all hotels
    Hotel.remove({},(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Removed Hotels!");
            //Add few hotels
            data.forEach((hotel)=>{
                Hotel.create(hotel, (err,data)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a hotel");
                        //create comment for this hotel: FIXME: callback hell
                        Comment.create(
                            {
                                text    : "Ah, the pool sucks.Why don't they allow peeing in it?AAAARGH!!",
                                author  : "Homer"
                            },(err, comment)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    hotel.comments.push(comment);
                                    hotel.save();
                                    console.log("comment created!");
                                } 
                            })
                    }
                })
            });
        }
    });
    //Add few comments
}

module.exports = seedDB;