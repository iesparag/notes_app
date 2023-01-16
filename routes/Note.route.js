const express = require('express');
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model")




noteRouter.get("/", async (req, res) => {
    const userID_making_req = req.body.userID
    const note = await NoteModel.find({ userID: userID_making_req })


    // const userID_in_note =  note[0]?.userID
    try {
        // if (!note) {
        //     res.send({"msg":"Add your first Note"})
        // }
        // else 
        if (note) {
            // if (userID_making_req !== userID_in_note) {
            // res.send({"msg":"you are not authorised "})
            // } else {
            res.send(note)
            // }
        } else {
            res.send({"msg":"you are not authorised "})
        }
        
    } catch (err) {
        res.send({"msg":"something went wrong"})
    }
    // const notes = await NoteModel.find()
    // res.send(notes)
})




noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
          const newNote = new NoteModel(payload)
        await newNote.save()
        res.send("Note created successfully")
    } catch (err) {
        console.log(err);
        res.send({"msg":"something went wrong"})
      }
    
})



noteRouter.patch("/update/:id",async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({ _id: id })
    const userID_in_note =  note.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_note) {
            res.send({"msg":"you are not authorised"})
        } else {
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send(" updated note successfully")
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"something went wrong"})
      }
})




noteRouter.delete("/delete/:id",async (req, res) => {
    
    const id = req.params.id
    const note = await NoteModel.findOne({ _id: id })
    const userID_in_note =  note.userID
    const userID_making_req = req.body.userID
    try {
          if (userID_making_req !== userID_in_note) {
            res.send({"msg":"you are not authorised to delete this"})
        } else {
              await NoteModel.findByIdAndDelete({ "_id": id })
              const dataAfterDelete = await NoteModel.find({ userID: userID_making_req })
            res.send(dataAfterDelete)
        }

    } catch (err) {
        console.log(err);
        res.send({"msg":"something went wrong"})
      }
})





module.exports = {
    noteRouter
}