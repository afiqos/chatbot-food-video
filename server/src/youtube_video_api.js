require('dotenv').config();
const { google } = require('googleapis');

function callYoutubeApi(YoutubeInputs) {

    return google.youtube('v3').videos.list({
        key: process.env.YOUTUBE_TOKEN,
        part: ['snippet', 'contentDetails', 'statistics'],
        chart: 'mostPopular',
        maxResults: 2,
        regionCode: 'SG',
        videoCategoryId: YoutubeInputs.categoryId
    })

}

module.exports = {
    callYoutubeApi
}