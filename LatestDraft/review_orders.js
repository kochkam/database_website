module.exports = function() {
    var express = require('express');
    var router = express.Router();




    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT Customers.customer_id, Orders.order_num, Customers.first_name, Customers.last_name, Orders.order_date, Orders.order_complete" +
            " FROM Customers INNER JOIN Orders ON Customers.customer_id = Orders.customer_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            complete();
        });
    }


    function getOrdersByOrderNum(req, res, mysql, context, complete){
        var query = "SELECT Customers.customer_id, Customers.first_name, Customers.last_name, OrderedItems.order_num, OrderedItems.item_id, OrderedItems.video_game_id, VideoGames.game_title, Studios.studio_id, Studios.studio_name, VideoGames.quantity," +
            "VideoGames.price, VideoGames.vg_rating, OrderedItems.order_returned FROM OrderedItems INNER JOIN VideoGames ON VideoGames.video_game_id = OrderedItems.video_game_id " +
            "INNER JOIN Orders ON Orders.order_num = OrderedItems.order_num INNER JOIN Customers ON Customers.customer_id = Orders.customer_id " +
            "INNER JOIN StudioKeys ON StudioKeys.studio_key = VideoGames.studio_key INNER JOIN Studios ON Studios.studio_id = StudioKeys.studio_id " +
            "WHERE OrderedItems.order_num = "+ mysql.pool.escape(req.params.n);
            console.log(query)
                mysql.pool.query(query, function(error, results, fields){
                    if(error){
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    context.orderNum = results;
                    complete();
        });
    }
/**************************************************
  Get
  *************************************************/

  /*Display all people whose name starts with a given string. Search*/

  router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["searchOrders.js"];
      var mysql = req.app.get('mysql');
      getOrders(res, mysql, context, complete);
      function complete(){
          callbackCount++;
           if(callbackCount >= 1){
              res.render('review_orders', context);
         }
       }
    });


    router.get('/:n', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchOrders.js"];
        var mysql = req.app.get('mysql');
        getOrdersByOrderNum(req, res, mysql, context, complete)        
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context.body)
                res.render('review_orders', context);
            }

        }
    });
      router.post('/', function(req, res){
        console.log(req.body)

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (order_date, order_complete, customer_id) VALUES (?, ?, ?)";
        var inserts = [req.body.order_date, req.body.order_complete, req.body.customer_id];
        

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/review_orders');
            }
        });
    });
    return router;
}();