const express=require("express");

const router=express.Router();
const Notes=require("../Model/NotesModel")
router.post("/addnotes",async (req,res)=>{
    const {title, description, UserId}=req.body;
    try {
        await Notes.create({
            title:title,
            desc:description,
            UserId:UserId,
            Date:Date.now()
        })
        res.status(201).json({message:"Notes created successfully"})
    } catch (error) {
        res.status(400).json({message:"Notes not created "})
    }
})
module.exports=router;