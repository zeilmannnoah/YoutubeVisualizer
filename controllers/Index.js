const YoutubeService = require('../services/YoutubeService');

class Index {
    async index(req, res) {
        const model = {
            
        };

        res.render('../views/index.pug', model);
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

    async searchVideo(req, res) {
        const results = await YoutubeService.searchForVideo(req.query.video);

        res.send(results)
    }
}

module.exports = Index;