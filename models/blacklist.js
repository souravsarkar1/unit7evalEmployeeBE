const mongoose = require('mongoose');

const blackListSchema = mongoose.Schema({
    token:{type:String,requried:true}
});

const blackList = mongoose.model("blacklist",blackListSchema)

module.exports={
    blackList
}