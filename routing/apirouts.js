const fs = require('fs');

module.exports = (app) => {
  app.get('./api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      noteList = JSON.parse(data);
      res.send(noteList);
    });
  });
  app.post('/api/notes', (req, res) => {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      noteList = JSON.parse(data);
      noteList.push(userNotes);
      noteList.forEach((x, y) => {
        x.id = y + 1;
        return noteList;
      });
      console.log(noteList);

      fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
        if (err) throw err;
      });
    });
    res.status(200).send();
  });

  app.delete('/api/notes:id', (req, res) => {
    var noteId = req.params.id;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      noteList = JSON.parse(data);

      for (var i = 0; i < noteList.length; i++) {
        if (noteList[i].id === Number(noteId)) {
          noteList.splice([i], 1);
        }
      }
      noteList.forEach((x, i) => {
        x.id = i + 1;
      });
      console.log(noteList);

      fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
        if (err) throw err;
      });
      res.status(204).send();
    });
  });
};
