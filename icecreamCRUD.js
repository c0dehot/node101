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


async function mainApp(){
  // create product
  console.log("Inserting a new product...\n");
  let dbResult = await db.query( "INSERT INTO products SET ?",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    } ) 
  // --> INSERT INTO products SET flavour="Rocky Road", price=3.0, quantity=50
  console.log( `INSERT complete, id=${dbResult.insertId}` )

  // update the rproduct 
  dbResult = await db.query( "UPDATE products SET ? WHERE ?",
    [ { quantity: 100 }, { flavor: "Rocky Road" } ] )
  // UPDATE products SET quantity=100 WHERE flavor="Rocky Road"
  console.log( `UPDATE complete, affectedRows=${dbResult.affectedRows}` )

  // delete
  dbResult = await db.query( "DELETE FROM products WHERE ?",
    { flavor: "strawberry" } )
  // DELETE FROM products WHERE flavor="strawberry"
  console.log( `DELETE complete` )

  // read
  dbResult = await db.query("SELECT * FROM products" )
  console.log( `READ complete:` )
  dbResult.forEach( function(icecream){
      console.log( `id: ${icecream.id}, flavour: ${icecream.flavor}, quantity: ${icecream.quantity}, price $ ${icecream.price}` )
  })
  // close database and thus now allows node to exist application
  await db.close()
}
mainApp()

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "",
//   database: "ice_creamDB"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
//   createProduct();
// });

// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }
