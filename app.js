const express = require('express');

const PORT = 8080,
    app = express();

app.set('view engine', 'pug');

app.use('/', require('./routes/index'));
app.use('/visualizer', require('./routes/visualizer'));
app.use('/resources', express.static('./resources'));
app.use('/resources', express.static(`${__dirname}/node_modules/bootstrap/dist`));
app.use('/resources/js', express.static(`${__dirname}/node_modules/jquery/dist`));

app.listen(PORT, console.log(`Listening on port ${PORT}`));
