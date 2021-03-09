var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 100,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kochkam',
  password        : '*************',
  database        : 'cs340_kochkam'
});
module.exports.pool = pool;
