const YoutubeStream = require('youtube-audio-stream');
const YoutubeSearch = require('youtube-search');
const API_KEY = process.env.GOOGLE_API_KEY;

let searchOpts = {
        maxResults: 10,
        key: API_KEY
    };

async function streamYoutubeAudio(videoId) {
    let requestUrl = `http://youtube.com/watch?v=${videoId}`;

    try {
        let data = YoutubeStream(requestUrl);

        return data;
    }
    catch (err) {
        console.error('Error streaming Youtube audio.', err);
        return {err};
    }
}

async function searchForVideo(query) {
    try {
        let { results } = await YoutubeSearch(query, searchOpts);

        return results.map(video => {
            return {
                videoId: video.id,
                thumbnail: video.thumbnails.high,
                title: video.title,
                description: video.description
            } 
        });
    }
    catch (err) {
        console.error('Error searching for video on Youtube.', err);
        return {err};
    }
}

module.exports = {
    streamYoutubeAudio,
    searchForVideo
}