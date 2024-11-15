const express = require("express");
const router = express.Router();
const Notes = require("../Model/NotesModel");

router.delete("/DeleteNotes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Pass the id directly instead of {id}
        const deletedNote = await Notes.deleteOne({_id:id});
        
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully", deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
});

module.exports = router;
