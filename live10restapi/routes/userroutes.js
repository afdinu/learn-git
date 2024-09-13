const express = require("express")
const userModel=require("../models/user.model")
const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        //get all users
        const users= await userModel.find()
        res.status(200).send(users)

    }catch(error){
        res.status(500).send({message:"error",error})
    }
})
router.get("/:id",async(req,res)=>{
    try{
       const id = req.params.id
        const user= await userModel.findById(id)
       
        res.status(200).send(user)

    }catch(error){
        res.status(500).send({message:"error",error})
    }
})
router.post("/",async (req,res)=>{
try {
    const{name,username,email,password}=req.body
    if(!name || !username || !email || !password){
       return res.status(400).send("all fields are necessary")
    }
    let user = await userModel.findOne({email});
    if(user){
        return res.status(400).send("email already exists")
    }
    user = await userModel.findOne({username});
    if(user){
        return res.status(400).send("username is already taken")
    }
   
    const newuser =  new userModel({name,username,email,password})
    const resp = await newuser.save();
    return res.status(200).send({message:"user created",resp})
} catch (error) {
    res.status(500).send({message:"some internal error occured",error})
}
})
router.put("/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const {username,password}=req.body;
        let newuser = await userModel.findOne({username});
        if(newuser){
            return res.status(400).send("username is already taken")
        }
         const user= await userModel.findByIdAndUpdate(id,{username,password})
        
         res.status(200).send(user)
 
     }catch(error){
         res.status(500).send({message:"error",error})
     }
})
router.delete("/:id",async(req,res)=>{
    try{
        const id = req.params.id
        
         const user= await userModel.findByIdAndDelete(id)
        
         res.status(200).send({message:"user deleted",user})
 
     }catch(error){
         res.status(500).send({message:"error",error})
     }

})
module.exports = router