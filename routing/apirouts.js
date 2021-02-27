const fs = require('fs');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    fs.readFile('.db/db.json', (err, data) => {
      if (err) throw err;
      notesList = JSON.parse(data);
      res.send(notesList);
    });
  });
  app.post('/api/notes', (req, res) => {
      const userNotes = req.body;

      
  })

};
