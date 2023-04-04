const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

const dir = path.join(process.cwd());

app.use(express.static("public"));

app.get("/", (req, res) => {
    const pathToIndex = path.join(process.cwd(), "public/index.html");
    res.sendFile(pathToIndex)
    console.log(pathToIndex)
})

app.get ("/notes", (req, res) => {
    const pathToNotes = path.join(process.cwd(), "public/notes.html");
    res.sendFile(pathToNotes)
    console.log(pathToNotes)
})

app.listen(PORT, () => {
    console.log("Server is running on localhost:%s", PORT)
})