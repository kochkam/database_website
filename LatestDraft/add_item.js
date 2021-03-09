module.exports = function() {
    var express = require('express');
    var router = express.Router();



    function getTitle(res, mysql, context, complete){
        mysql.pool.query("SELECT Customers.customer_id, Customers.first_name, Customers.last_name, OrderedItems.item_id, Orders.order_num, OrderedItems.video_game_id, VideoGames.game_title, Studios.studio_id, Studios.studio_name, VideoGames.quantity, " 
        + "VideoGames.price, VideoGames.vg_rating, OrderedItems.order_returned FROM OrderedItems INNER JOIN VideoGames ON VideoGames.video_game_id = OrderedItems.video_game_id " 
        + "INNER JOIN Orders ON Orders.order_num = OrderedItems.order_num INNER JOIN Customers ON Customers.customer_id = Orders.customer_id " 
        + "INNER JOIN StudioKeys ON StudioKeys.studio_key = VideoGames.studio_key INNER JOIN Studios ON Studios.studio_id = StudioKeys.studio_id ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.title = results;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchOrders.js"];
        var mysql = req.app.get('mysql');
        getTitle(res, mysql, context, complete)
        function complete(){
            callbackCount++;
             if(callbackCount >= 1){
                res.render('add_item', context);
           }
         }
      });


    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql'); 
        var sql = "INSERT INTO OrderedItems (order_returned, order_num, video_game_id) VALUES (?, ?, ?)";
        var inserts = [req.body.order_returned, req.body.order_num, req.body.video_game_id];
        
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/add_item');
            }
        });
    });
    return router;
}();