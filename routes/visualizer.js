const express = require('express'),
    Visualizer = require('../controllers/Visualizer');

const visualizer = express.Router(),
    ctrl = new Visualizer();

visualizer.get('/', (...args) => ctrl.visualizer(...args));
visualizer.get('/playAudio', (...args) => ctrl.playAudio(...args));

module.exports = visualizer;