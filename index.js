/* Initialization and imports. */
const express = require('express')
const app = express();
const port = 5000;
const AssignButler = require('./AssignButler');

/* Middlewares */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* Routes */

app.get('/assign-butlers', (req, res) => {
    res.send(AssignButler(req.body.requests));
})

/* Server */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))