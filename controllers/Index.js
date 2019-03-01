const YoutubeService = require('../services/YoutubeService');

class Index {
    async index(req, res) {
        const model = {
            
        };

        res.render('../views/index.pug', model);
    }

    async searchVideo(req, res) {
        const results = await YoutubeService.searchForVideo(req.query.video);

        res.send(results)
    }
}

module.exports = Index;