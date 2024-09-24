const mongoose = require('mongoose');
const { DB_URI } = require('./Config/config');

 mongoose.connect(DB_URI);

module.exports = mongoose;
