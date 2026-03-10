const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// Middleware
app.use(express.json({ limit: "10mb" }))
app.use(cors())

// MongoDB connection
mongoose.connect(
  "mongodb+srv://Abinash2026:PScrm12345@cluster0.4quxiqu.mongodb.net/pscrm?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err))

// Complaint schema
const Complaint = mongoose.model("Complaint", {

  complaintId: String,
  name: String,
  category: String,
  issue: String,
  location: String,
  status: String,
  image: String

})


// Root route (for testing server)
app.get("/", (req, res) => {
  res.send("🚀 PSCRM Backend Running")
})


// Submit complaint
app.post("/complaint", async (req, res) => {

  try {

    const complaintId = "PSCRM-" + Date.now()

    const complaint = new Complaint({

      complaintId,
      name: req.body.name,
      category: req.body.category,
      issue: req.body.issue,
      location: req.body.location,
      status: "Pending",
      image: req.body.image

    })

    await complaint.save()

    res.json({
      message: "Complaint submitted successfully",
      complaintId
    })

  } catch (error) {

    res.status(500).json({ error: "Failed to submit complaint" })

  }

})


// Get all complaints
app.get("/complaints", async (req, res) => {

  try {

    const data = await Complaint.find().sort({ _id: -1 })

    res.json(data)

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch complaints" })

  }

})


// Update complaint status
app.put("/update/:id", async (req, res) => {

  try {

    await Complaint.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    })

    res.json({ message: "Complaint updated" })

  } catch (error) {

    res.status(500).json({ error: "Update failed" })

  }

})


// Port for Render
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})