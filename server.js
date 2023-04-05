const express = require("express");
const path = require("path");
const APIRoute = require("./routes/api-routes");
const HTMLRoute = require("./routes/html-routes");
const app = express();

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log("Server is running on localhost:%s", PORT)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use("/api", APIRoute);
// app.use("/", HTMLRoute)


app.get("/", (req, res) => {
    const pathToIndex = path.join(process.cwd(), "public/index.html");
    res.sendFile(pathToIndex)
})

// should be app.post here below
app.get("/api/notes", (req, res) => {
    const pathToNotes = path.join(process.cwd(), "public/notes.html");
    res.sendFile(pathToNotes)
})

