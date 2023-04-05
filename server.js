const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
// const util = require("util");

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log("Server is running on localhost:%s", PORT)
})

// const readNote = util.promisify(fs.readFile);
// const writeNote = util.promisify(fs.writeFile);

app.use(express.static("public"));

app.get("/", (req, res) => {
    const pathToIndex = path.join(process.cwd(), "public/index.html");
    res.sendFile(pathToIndex)
})

// should be app.post here below
app.get("/api/notes", (req, res) => {
    const pathToNotes = path.join(process.cwd(), "public/notes.html");
    res.sendFile(pathToNotes)
})


//  
// app.get("/notes", (req, res) => {
//     readNote("db/db.json", "ut8f").then(function(data){
//         notes = [].concat(JSON.parse(data))
//         res.json(notes);
//     })
// })

// app.post("/notes", (req, res) => {
//     const note = req.body;
//     readNote("db/db.json", "ut8f").then(function(data){
//         const notes = [].concat(JSON.parse(data));
//         note.id = notes.length + 1;
//         notes.push(note);
//         return notes;
//     }).then(function(notes) {
//         writeNote("db/db.json", "ut8f", JSON.stringify(notes))
//         res.json(note)
//     })
// })