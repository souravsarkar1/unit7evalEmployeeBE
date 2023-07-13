const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(`mongodb+srv://sourav:sourav@cluster0.10rxc0r.mongodb.net/u7evalemployee?retryWrites=true&w=majority`)

module.exports={
    connection
}
