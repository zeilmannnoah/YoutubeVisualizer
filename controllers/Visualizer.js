const YoutubeService = require('../services/YoutubeService');

class Visualizer {
    async visualizer(req, res) {
        const model = {
            videoId: req.query.videoId
        };

        res.render('../views/visualizer.pug', model);
    }

    async playAudio(req, res) {
        try {
            const stream = await YoutubeService.streamYoutubeAudio(req.query.videoId);

            stream.pipe(res);
        }
        catch (err) {
            console.error('Error piping audio to client', err);
            res.status(500).send(err);
        }
    }
}

module.exports = Visualizer;