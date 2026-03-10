const API = "https://pscrm-project.onrender.com"

let image = ""

// Image upload
document.getElementById("image").addEventListener("change", function () {

  const file = this.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = function () {
    image = reader.result
  }

  reader.readAsDataURL(file)

})


// Form submit
document.getElementById("form").addEventListener("submit", async (e) => {

  e.preventDefault()

  const name = document.getElementById("name").value
  const category = document.getElementById("category").value
  const location = document.getElementById("location").value
  const issue = document.getElementById("issue").value

  try {

    const res = await fetch(API + "/complaint", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        category,
        location,
        issue,
        image
      })

    })

    const data = await res.json()

    document.getElementById("complaintMessage").innerHTML =
      "Complaint Submitted. Your ID: <b>" + data.complaintId + "</b>"

    document.getElementById("form").reset()

    image = ""

  } catch (error) {

    document.getElementById("complaintMessage").innerHTML =
      "❌ Error submitting complaint"

    console.error(error)

  }

})