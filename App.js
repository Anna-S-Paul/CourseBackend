const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { coursemodel } = require("./model/Course")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Annajimmy:annajimmychirackal@cluster0.moqndmi.mongodb.net/coursedb?retryWrites=true&w=majority&appName=Cluster0")

app.post(
    "/add", (req, res) => {
        let input = req.body
        let course = new coursemodel(input)
        course.save()
        console.log(course)
        res.json({"status":"success"})
    }
)

app.post(
    "/search", (req, res) => {
        let input=req.body
        coursemodel.find(input).then(
            (data)=>{
                res.json(data)
            }
        ).catch(
            (error)=>{
                res.json(error)
            }
        )
    }
)

app.get(
    "/viewall", (req, res) => {
        coursemodel.find().then(
            (data)=>{
                res.json(data)
            }
        ).catch(
            (error)=>{

            }
        )
    }
)

app.post("/delete",(req,res)=>{
    let input=req.body
    coursemodel.findByIdAndDelete(input._id).then(
(response)=>{
    res.json({"status":"success"})
}
    ).catch(
        (error)=>{
            res.json({"status":"error"})
        }
    )
})

app.listen(8084, () => {
    console.log("Server started")
}
)
