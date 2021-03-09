module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudios(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Studios", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studios  = results;
            complete();
        });
    }

    function getStudioKeys(res, mysql, context, complete){
        mysql.pool.query("SELECT Studios.studio_id, StudioKeys.studio_key, Studios.studio_name FROM Studios" +
        " INNER JOIN StudioKeys ON Studios.studio_id = StudioKeys.studio_id ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studioKeys = results;
            complete();
        });
    }

    function getVideoGames(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM VideoGames", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.videoGames = results;
            complete();
        });
    }
    /* Find people whose fname starts with a given string in the req */
    function getStudiosWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT * FROM Studios WHERE studio_name = " + mysql.pool.escape(req.params.s);
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.studiosName = results;
              complete();
          });
      }


   
    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchstudio.js"];
        var mysql = req.app.get('mysql');
        getStudios(res, mysql, context, complete);
        getStudioKeys(res, mysql, context, complete);
        getVideoGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('inventory', context);
            }

        }
    });


    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchstudio.js", "searchvideogame.js"];
        var mysql = req.app.get('mysql');
        getStudios(res, mysql, context, complete);
        getStudiosWithNameLike(req, res, mysql, context, complete) ;
        getStudioKeys(res, mysql, context, complete);
        getVideoGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('inventory', context);
            }
        }
    });
    router.post('/', function(req, res){
        console.log(req.body)

        if(req.body.studio_name != null){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Studios (studio_name) VALUES (?)";
            var inserts = [req.body.studio_name];}
        else{
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO StudioKeys (studio_id) VALUES (?)";
            var inserts = [req.body.studio_id];
        }
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/inventory');
            }
        });
    });

    return router;
}();
