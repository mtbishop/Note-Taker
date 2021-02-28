const fs = require('fs');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
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
      notesList.forEach((item, x) => {
        item.id = x + 1;
        return noteList;
      });
      console.log(noteList);

      fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
        if (err) throw err;
      });
    });
    res.status(200).send();
  });
};
