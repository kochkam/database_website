function deleteVG(video_game_id){
    $.ajax({
        url: '/browse_video_games/' + video_game_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};