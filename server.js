// Dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes //
require('./routing/apirouts')(app);
require('./routing/htmlrouts')(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
