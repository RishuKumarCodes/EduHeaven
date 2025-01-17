//Notes Routes

const express = require("express");
const Note = require("../Models/Note");
const router = express.Router();

//Create a Note

router.post("/notes", async (req, res) => {

    try {

        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {

        res.status(400).json({ error: error.message });
    }


})

//Get Notes

router.get("/notes", async (req, res) => {

    try {

        const notes = await Note.find();
        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})




//get Note by id

router.get("/notes/:id",async (req,res) => {
    
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({error:"Note not found"});
        }
        res.status(200).json(note);
    
    }catch(error){

        res.send(500).json({error:error.message});
    }

});


//Update a note by ID

router.put("/notes/:id",async(req,res)=>{
   try{
     const updatedNote = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
     if(!updatedNote){
        return res.status(404).json({error:"Note not found"});
     }

     res.send(200).json(updatedNote);

   } catch(error){

      res.status(500).json({error:error.message});
   }
})


//delte a note by Id

router.delete("/notes/:id",async(req,res)=>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({error:"Notes not found"});
        }

        res.status(200).json({message:"Notes deleted successfully"})
    }catch(error){

        res.status(500).json({error:error.message});
    }
})


module.exports = router;


