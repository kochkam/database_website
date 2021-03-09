module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getGames(res, mysql, context, complete) {
        mysql.pool.query("SELECT DISTINCT VideoGames.video_game_id, StudioKeys.studio_key, Studios.studio_name, VideoGames.game_title, VideoGames.price, VideoGames.quantity, VideoGames.vg_rating "+
        "FROM Studios INNER JOIN StudioKeys ON Studios.studio_id = StudioKeys.studio_id INNER JOIN VideoGames" +
        " ON StudioKeys.studio_key = VideoGames.studio_key", function(error, results, fields){
               if(error){
                 res.write(JSON.stringify(error));
                 res.end();
             }
             context.vgresults = results;
             complete();
         });
     }   

      function getGameID(res, mysql, context, video_game_id, complete) {
            var sql = "SELECT video_game_id, game_title, price, vg_rating, quantity FROM VideoGames WHERE video_game_id = ?";
            var inserts = [video_game_id];
            mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.vgid = results[0];
                complete();
         });
     }   

    router.get('/', function(req,res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchvideogame.js", "deleteVG.js"];
        var mysql = req.app.get('mysql');
        getGames(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('browse_video_games', context);
            }
        }

        
    });


    router.post('/', function(req, res){
        console.log(req.body.price)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity) VALUES (?,?,?,?,?)";
        var inserts = [req.body.studio_key, req.body.game_title, req.body.price, req.body.vg_rating, req.body.quantity];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/browse_video_games');
            }
        });
    });

    router.put('/:video_game_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE VideoGames SET game_title=?, price=?, vg_rating=?, quantity=? WHERE video_game_id=?";
        var inserts = [req.body.game_title, req.body.price, req.body.vg_rating, req.body.quantity, req.params.video_game_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.get('/:video_game_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteVG.js", "updateVG.js"];
        var mysql = req.app.get('mysql');
        getGameID(res,mysql,context,req.params.video_game_id,complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-vg', context);
            }

        }
    });
    router.delete('/:video_game_id', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM VideoGames WHERE video_game_id = ?";
        var inserts = [req.params.video_game_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
return router;
}();