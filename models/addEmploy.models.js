const mongoose = require('mongoose');

const employSchema = mongoose.Schema({
    first_name:{type:String,require:true},
    last_name:{type:String,require:true},
    email:{type:String,require:true},
    department :{type:String,
        require:true,
        default:"Tech",
        enum:["Tech", "Marketing", "Operations"]
    },
    salary:{type:Number,require:true}

},{
    versionKey:false
})

const employModel = mongoose.model("employ",employSchema)

module.exports={
    employModel
}