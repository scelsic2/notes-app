const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();
const fs = require("fs");
const random = require("simple-random-number-generator");
let randomParams = {
    min: 100,
    max: 1000,
    integer: true,
}

console.log(random(randomParams))

// const { v4: uuidv4 } = require('uuid');
const { request } = require("http");
// const v4options = {
//   random: [
//     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
//   ],nopde
// };
//console.log(userId); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// This function will take the updated notes array, write it to the db, and then after that, it will stringify it so that it can be stored
const responseToEditNote = function (updatedNotesArray) {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
        if (err) throw err
    })
}; 

// module.exports = (app) => {
    // I am using a server response to get the notes by reading the db that contains all the notes. I have to tell it how to display. If I want to use it, I have to parse it to change it from the string it was stored as to an object that I can use.
    router.get("/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    })

    // The user is posing data on the req body. I need to grab that data in a const. Next I need to read the db file of notes. Now that I'm reading that file, I need to parse it, so that I can get it from a string to an object I can use. I am using the method id to assign a unique id to the note.  Then I am grabbing the notes array and pushing in my new note.
    router.post("/notes", (req, res) => {
        const newNote = req.body;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const notesArray = JSON.parse(data || '[]') ;
            newNote.id = random(randomParams);
            notesArray.push(newNote);

            // Title is a property of newNote, so I stringify newNote.title to store it. Same thing with newNote.text. The ID is that new value I created.
            responseToEditNote(notesArray);
            console.log(
                `Your note has been created. Title ${JSON.stringify(newNote.title)}, Text: ${JSON.stringify(newNote.text)}, ID: ${newNote.id})`
            )
            // Now the server needs to respond with the new notesArray that we've just pushed the user's new notes to.
            res.send(notesArray)
        })
    }
    )

    // By clicking delete, the user makes a request and the program looks at the params (id in this case) so that we can check if it's equal to or includes something. Then I loop through every item of the array to see if I can find an id that matches the id that the user hit delete on. When I find a match, I splice, which means to remove an item from the array.

    router.delete("/notes/:id", (req, res) => {
        const deleteID = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notesArray = JSON.parse(data)
            let wasSomethingDeleted = false;
            for (i = 0; i <notesArray.length; i++) {
                if (notesArray[i].id == deleteID) {
                    // at position i, remove 1 item
                    notesArray.splice(i, 1);
                    wasSomethingDeleted = true;
                    break;
                }
            }
             // Now I need to call on my responseToEditNoteFunction and pass in my new notes array.  I will then console the value it found in deleteID which is the value of the note where the user clicked delete.  The the server will respond with the new notes array
             if(wasSomethingDeleted == true) {
                responseToEditNote(notesArray);
                console.log(`Your note has been deleted. Note ID: ${deleteID}`);
             }
            //res.send(notesArray);
            res.send(wasSomethingDeleted);
        })
    }
    )

    // After a change has been made to the server data, in this case data that was changed by the user, I need to update the server by using PUT. The id is a unique value that I can grab the note by.
    router.put("/notes/:id", (req, res) => {
        const grabID = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            // Here I am parsing my string of data into an object so that I can manipulate it.
            let notesArray = JSON.parse(data);
            // Then I'm going to use the find method to see if the note's id matches any of the id pulled when I looked at all the params in the req.
            let noteByID = notesArray.find((note) => note.id === grabID);

            // Here I am taking the user request of the title and text and attaching it where it belongs in the object, which is why I had to parse the data first so that I had an object to work with. There is no req for the id because the id does not come from the user, it is generated by a function.
            if(noteByID) {
                let updatedNote = {
                    title: req.body.title,
                    text: req.body.text,
                    id: noteByID.id,
                }
                // I'm passing in the note ID here on the method indexOf so that indexOf can search notesArray to find out at what index is this node id.
                let targetIndex = notesArray.indexOf(noteByID)
                // Here I am taking my notesArray at the index of the note that now has an ID that is different from what was in the array before we started, and at position 1, I am adding the object with the updated note information, both properties and from req.
                notesArray.splice(targetIndex, 1, updatedNote)

                // I now need to send the server a status code so it knows all is well.
                res.sendStatus(204);
                // Now I need to pass my entire notesArray in so that it can write to my file and stringify my object into something that can be stored.
                responseToEditNote(notesArray);
                // Here I am having the server respond with JSON that is the notesArray
                res.json(notesArray)
            }   else {
                // If it didn't work, then that's where 404 comes in.
                res.sendStatus(404)
            }

        })
    }
    )
module.exports = router
// }