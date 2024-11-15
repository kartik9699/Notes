const express=require("express");
const router=express.Router()
const Notes=require("../Model/NotesModel")
const User=require("../Model/UserModel")
router.post("/fetchData",async (req,res)=>{
    try {
       const data=await Notes.find({})
       const userData=await User.find({})
       res.json([data,userData])
    } catch (error) {
        res.json(error)
    }
})
module.exports=router