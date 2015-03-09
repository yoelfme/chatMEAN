if(!global.hasOwnProperty('db')) {
	var mongoose = require('mongoose');
	var dbName = 'chatMean';

	mongoose.connect('mongodb://localhost/' + dbName);

	global.db = {
		mongoose: mongoose,
		User: require('./User')(mongoose),
		Message: require('./Message')(mongoose)
	}
}

module.exports = global.db;