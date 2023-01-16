const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.url_kfc)

module.exports = {
    connection
};