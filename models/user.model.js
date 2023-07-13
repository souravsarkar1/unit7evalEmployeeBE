const express = require('express');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email:{type:String},
    password:{type:String,require:true},
    confirmPassword:{type:String,require:true},
},{
    versionKey:false
})

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}