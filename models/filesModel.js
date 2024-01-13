const mongoose = require('mongoose');
const filesSchema = new mongoose.Schema({
    file: {
        type: String,
        required: false,
      }
});
module.exports = mongoose.model('Files', filesSchema);