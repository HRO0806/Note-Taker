const fs = require("fs");
const path = require("path");

function filterByQuery(query, db) {
    let filteredResults = db;
    if (query.title) {
        filteredResults = filteredResults.filter(
            (db) => db.title === Number(query.title)
        );
    }
    if (query.text) {
        filteredResults = filteredResults.filter(
            (db) => db.text === query.text
        );
    }
    return filteredResults;
};

function createNewNote(body, db) {
    const notes = body;
    db.push(notes);
    fs.writeFileSync(
        path.join(__dirname, '../Develop/db/db.json'),
        JSON.stringify({notes: db}, null, 2)
    );
    return notes;
}

function validateNotes(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    createNewNote,
    validateNotes
};