module.exports = function() {
    var express = require('express');
    var router = express.Router();




    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
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
      context.jsscripts = ["searchCustomers.js"];
      var mysql = req.app.get('mysql');
      getCustomers(res, mysql, context, complete);
      function complete(){
          callbackCount++;
           if(callbackCount >= 1){
              res.render('register', context);
         }
       }
    });

    router.post('/', function(req, res, complete){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.street, req.body.city,
        req.body.state, req.body.zip, req.body.phone_num];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/register');
            }
        });
    });

    return router;
}();