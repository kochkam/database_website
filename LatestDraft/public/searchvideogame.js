function searchVideoByName() {
    //get the first name 
    var video_name_search_string  = document.getElementById('video_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/browse_video_games/searching/' + encodeURI(video_name_search_string)
}