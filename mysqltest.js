// see: https://www.npmjs.com/package/dotenv
// will search .env for our passwords, etc
require('dotenv').config()

const mysql = require("mysql")

const MYSQL_PORT = process.env.MYSQL_PORT || 3306

// we will use this for making our mysql calls promises
class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = new Database({
  host: "localhost",
  port: MYSQL_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  insecureAuth : true
});

async function mainApp(){
    const userList = await db.query( "SELECT * FROM users" )
    console.log( `userList: `, userList )
    for( let i=0; i<userList.length; i++ ){
        console.log( `userid='${userList[i].user_id}', username='${userList[i].username}'`)
    }

    userList.forEach( function( user ){
        console.log( `userid='${user.user_id}', username='${user.username}'`)
    })
}
mainApp()