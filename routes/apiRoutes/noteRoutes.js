const router = require("express").Router();
const {filterByQuery, createNewNote, validateNotes} = require("../../lib/notes")
const {notes} = require("../../Develop/db/db")

router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/notes/:id", (req, res) => {
    const result = notes[req.params.id - 1];
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/notes", (req, res) => {
    req.body.id = notes.length;

    if (!validateNotes(req.body)) {
        res.status(400).send("The note is not properly formated")
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete("/notes/:id", (req, res) => {
    const result = notes[req.params.id];
    if (result) {
        res.json(result);
        notes.splice(req.params.id, 1);
    } else {
        res.send(404);
    }
});

module.exports = router;