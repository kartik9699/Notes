const express = require("express");
const router = express.Router();
const Notes = require("../Model/NotesModel");
router.put("/EditNotes/:id", async (req, res) => {
    const { title, desc } = req.body;
    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, desc },
            { new: true } // This will return the updated document
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(updatedNote); // Send back the updated note
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
});
module.exports = router;
