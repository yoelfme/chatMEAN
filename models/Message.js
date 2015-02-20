module.exports = function  (mongoose) {
	var Schema = mongoose.Schema;

	var MessageSchema = new Schema({
		_user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		_user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		message: String,
		date: Date
	});

	return mongoose.model('Message',MessageSchema);
}