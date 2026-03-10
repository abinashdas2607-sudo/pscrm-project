const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json({limit:"10mb"}))
app.use(cors())

mongoose.connect("mongodb+srv://Abinash2026:PScrm12345@cluster0.4quxiqu.mongodb.net/pscrm?retryWrites=true&w=majority")

const Complaint = mongoose.model("Complaint",{

complaintId:String,
name:String,
category:String,
issue:String,
location:String,
status:String,
image:String

})

app.post("/complaint",async(req,res)=>{

const complaintId = "PSCRM-" + Date.now()

const complaint = new Complaint({

complaintId,
name:req.body.name,
category:req.body.category,
issue:req.body.issue,
location:req.body.location,
status:"Pending",
image:req.body.image

})

await complaint.save()

res.json({
message:"Complaint submitted",
complaintId
})

})

app.get("/complaints",async(req,res)=>{

const data = await Complaint.find()

res.json(data)

})

app.put("/update/:id",async(req,res)=>{

await Complaint.findByIdAndUpdate(req.params.id,{
status:req.body.status
})

res.send("Updated")

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})