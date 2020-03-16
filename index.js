/* Initialization and imports. */
const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const AssignButler = require('./AssignButler');

/* Middlewares */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

/* Routes */

app.get('/', (req, res) => {
    res.send('Please POST to /assign-butlers with the requests in body');
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/assign-butlers', (req, res) => {
    res.json(AssignButler(JSON.parse(req.body.requests)));
});

/* Server */

app.listen(port, () => console.log(`Assign Butlers server listening on port ${port}!`));

/* Exports */
exports.app = app;