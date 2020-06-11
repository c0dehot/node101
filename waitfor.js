// convert intoa  promise

// promise-enabled version of waitFor
function waitFor(seconds) {
    return new Promise( function( resolve, reject ){
      
      if (isNaN(seconds) || seconds < 1) {
        return reject( Error("Parameter 'seconds' must be a positive number!") );
      }
  
      setTimeout(function() {
        resolve( null, "Success!" );
      }, seconds * 1000);
    })
  }
  
  function showTime(){
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  }
  
  console.log( `-----------------------------------`)
console.log( `${showTime()} waitFor(5).then starting...`)
waitFor(5).then( function(result){
    console.log( `${showTime()} .then has completed after 5s` )
})

console.log( `${showTime()} waitFor(2).then starting...`)
waitFor(2).then( function(result){
    console.log( `${showTime()} .then has completed after 2s` )
})

async function mainApp(){
    let result = await waitFor(5)
    console.log( `${showTime()} await 5-seconds has completed` )
    result = await waitFor(2)
    console.log( `${showTime()} await another 2-seconds has completed` )
}
console.log( `${showTime()} mainApp() starting...`)
mainApp()
