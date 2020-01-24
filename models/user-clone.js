var mongoose                 = require('mongoose'),
    passportLocalMongoose    = require('passport-local-mongoose'),
    Hash                     = require('password-hash');

var userSchema = mongoose.Schema({
    username : String,
    password : String
});
userSchema.plugin(passportLocalMongoose); //Doesn't work at all!

userSchema.statics.authenticate = function(username, password, callback) {
	this.findOne({ username: username }, function(error, user) {
        console.log('user_id: ', user._id);
        
        console.log('Hash says: ',Hash.verify(password, user.password));
		if (user && Hash.verify(password, user.password)) {
			callback(null, user);
		} else if (!user || !error) {
            // Email or password was invalid (no MongoDB error)
            console.log('entered password: ', password);
            console.log('users username: ', user.username);
            console.log('users password: ', user.password);
            
			error = new Error("Your username or password is invalid. Please try again.");
			callback(error, null);
		} else {
			// Something bad happened with MongoDB. You shouldn't run into this often.
			callback(error, null);
		}
	});
};

module.exports =  mongoose.model('User', userSchema)