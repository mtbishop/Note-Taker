// Dependencies
const fs = require('fs');
const express = require('express');
const uniqid = require('uniqid');
const { finished } = require('stream');
var storedData = fs.readFileSync('./db/db.json');
var storedNotes = JSON.parse(storedData);

// Retrives notes from db.json file
module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(storedNotes);
  });

  // Sends new notes to db.json file
  app.post('/api/notes', (req, res) => {
    let userNote = req.body;
    userNote.id = uniqid();
    storedNotes.push(userNote);
    storedData = JSON.stringify(storedNotes);

    fs.writeFile('./db/db.json', storedData, finished);
    function finished(err) {
      console.log('new note added');
      console.log(err);
    }
    res.json(userNote);
  });

  // Deletes notes from db.json file
  app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    let note = storedNotes.find(({ id }) => id === req.params.id);
    storedNotes.splice(storedNotes.indexOf(note), 1);
    res.end('Note Deleted');
  });
};
