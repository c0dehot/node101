// node icecreamAdd.js "mint chocolate-chip" 50 2.99

var mysql = require("mysql");

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
  port: 3306,
  user: "root",
  password: "r00tr00t",
  database: "ice_creamDB",
  insecureAuth : true
});

// console.log( process.argv )
async function mainApp(){
    const flavor = process.argv[2]
    const quantity = process.argv[3]
    const price = process.argv[4]
    if( !flavor || !quantity || !price ){
        console.log( `x Sorry but yuou really need to give the data in this format: 
node icecreamAdd.js "mint chocolate-chip" 50 2.99` )
        process.exit()
    }
    // // got max id from the icecreams
    // CREATE TABLE products (
    //     id INTEGER AUTO_INCREMENT PRIMARY KEY,
    //     flavor VARCHAR(64),
    //     ...
    // )
    // const dbResult = await db.query( "SELECT MAX(id)+1 AS maxId FROM products" )
    // const id = dbResult[0].maxId
    // console.log( `previous max value = ${id}`,dbResult )

    const dbSave = await db.query( "INSERT INTO products VALUES (?)", 
        { flavor, price, quantity }) //id, 
    console.log( `.. icecream added!~ id = ${dbSave.insertId}` )

    await db.close()
}
mainApp()