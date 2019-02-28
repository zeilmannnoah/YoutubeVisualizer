const express = require('express'),
    Index = require('../controllers/Index');

const index = express.Router(),
    ctrl = new Index();

index.get('/', (...args) => ctrl.index(...args));
index.get('/playAudio', (...args) => ctrl.playAudio(...args));
index.get('/searchVideo', (...args) => ctrl.searchVideo(...args));

module.exports = index;