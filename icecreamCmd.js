// node icecreamAdd.js "mint chocolate-chip" 50 2.99

const mysql = require("mysql");
const util = require('util');
const exec = util.promisify(require('child_process').exec);


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

const DB_PWD = 'r00tr00t'
const db = new Database({
  host: "localhost",
  port: 3306,
  user: "root",
  password: DB_PWD,
  database: "ice_creamDB",
  insecureAuth : true
});

// console.log( process.argv )
async function mainApp(){
    const command = process.argv[2]

    if( command=='init' ){
          // re-create database
          const { stdout, stderr } = await exec(`mysql -u root -p${DB_PWD} < icecream.sql`);
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);
    } else {
        // do something else
    }

    await db.close()
}
mainApp()