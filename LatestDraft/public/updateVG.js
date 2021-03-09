function updateVG(video_game_id){
    $.ajax({
        url: '/browse_video_games/' + video_game_id,
        type: 'PUT',
        data: $('#update-vg').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};