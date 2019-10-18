const mysql = require('mysql')
const config = require('./../../config')
const dbConfig = config.database

const pool = mysql.createPool({
  host     :  dbConfig.HOST,
  user     :  dbConfig.USERNAME,
  password :  dbConfig.PASSWORD,
  database :  dbConfig.DATABASE,
  port     :  dbConfig.PORT// config中如果port不是3306，会导致登录被拒，修复port无法映射过来
})


let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log( err )
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log( err )
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}


module.exports = {
  query
}
