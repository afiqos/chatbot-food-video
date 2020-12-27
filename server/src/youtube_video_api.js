require('dotenv').config();
const { google } = require('googleapis');

function callYoutubeApi(YoutubeInputs) {

    return google.youtube('v3').videos.list({
        key: process.env.YOUTUBE_TOKEN,
        part: ['snippet', 'contentDetails', 'statistics'],
        chart: 'mostPopular',
        maxResults: 5,
        regionCode: 'SG',
        videoCategoryId: YoutubeInputs.categoryId
    })

}

function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function(x) {
        if (x != null) {
            return x.replace(/\D/, '');
        }
    });

    var hours = (parseInt(match[0]) || 0);
    var minutes = (parseInt(match[1]) || 0);
    var seconds = (parseInt(match[2]) || 0);

    return hours * 3600 + minutes * 60 + seconds;
}

module.exports = {
    callYoutubeApi,
    YTDurationToSeconds
}