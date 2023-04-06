const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

// module.exports = (app) => {

    router.get ("/", (req, res) => {
        res.sendFile(path.join(process.cwd(), "/public/index.html"));
    })

    router.get ("/notes", (req, res) => {
        res.sendFile(path.join(process.cwd(), "/public/notes.html"));
    })
    module.exports = router
// }