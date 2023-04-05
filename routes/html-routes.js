const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.get ("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../public/index.html"));
})

app.get ("/api/notes", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../public/notes.html"));
})

module.exports = app;