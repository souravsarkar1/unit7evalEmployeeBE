const express = require('express');
const { employModel } = require('../models/addEmploy.models');

const employRouter = express.Router()

//creat
employRouter.post("/addEmploy",async(req,res)=>{
    const payload = req.body
    try {      
        const data = new employModel(payload)
        await data.save()
        res.status(200).send({message:"New employ is added"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

//read
employRouter.get("/getEmploy",async(req,res)=>{
    // const payload = req.body

    const {minSalary,maxSalary,department}=req.query
    const query ={}
    if(minSalary){
        query.salary ={$gte:minSalary}
    }

    if(maxSalary){
      if(query.salary){
        query.salary.$lte=maxSalary
      }else{
        query.salary={$lte:maxSalary}
      }   
    }


    if(department){
       query.department =department
    }

    // console.log(query);


    try {      
        const data = await employModel.find(query)
        
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

//update
employRouter.patch("/updateEmploy/:id",async(req,res)=>{
     const {id} = req.params
     const payload=req.body
    try {      
        const data = await employModel.findByIdAndUpdate({_id:id},payload);
        
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

employRouter.delete("/deleteEmploy/:id",async(req,res)=>{
    const {id} = req.params
   try {      
       const data = await employModel.findByIdAndDelete({_id:id});
       
       res.status(200).send({message:"employ is deleted"})
   } catch (error) {
       res.status(400).send({message:error.message})
   }
})




module.exports={
    employRouter
}