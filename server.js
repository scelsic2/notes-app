const express = require("express");
const path = require("path");
const APIRoute = require("./routes/api-routes.js");
const HTMLRoute = require("./routes/html-routes.js");
const app = express();

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log("Server is running on localhost:%s", PORT)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", APIRoute);
app.use("/", HTMLRoute)

// app.use(APIRoute)(app);
// app.use(HTMLRoute)(app);

// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// app.get("/", (req, res) => {
//     const pathToIndex = path.join(process.cwd(), "public/index.html");
//     res.sendFile(pathToIndex)
// })

// app.get("/notes", (req, res) => {
//     const pathToNotes = path.join(process.cwd(), "public/notes.html");
//     res.sendFile(pathToNotes)
// })

