module.exports = function  (mongoose) {
	var Schema = mongoose.Schema;

	var UserSchema = new Schema({
		name: String,
		username: String,
		password: String,
		lastSession: Date
	});

	return mongoose.model('User',UserSchema);
}