const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./routes')

const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',routes);

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.use(function(err, req, res) {
    console.log('there was an app error', err);
    res
        .status(err.status || 500)
        .send(err.message || 'app err');
});

app.listen(process.env.PORT, function() {
    console.log('listening on port', PORT);
});

module.exports = app;