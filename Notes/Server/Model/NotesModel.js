const mongoose=require("mongoose");
const { Schema } = mongoose;
const notesSchema=new Schema({
    title:{type:String,
        required:true
    },
desc:{
    type:String,
    required:true
},
UserId:{
    type:String,
    required:true
},
Date:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model("Notes",notesSchema);