console.log( `Welcome to my compare.js file`)

const param1 = process.argv[2]
const param2 = process.argv[3]

if( param1==undefined || param2==undefined ){
    console.log( `Usage: node compare.js <param1> <param2>` )
    process.exit()
}

if( param1 !== param2 ){
    console.log( `PROBLEM: '${param1}' is NOT the same as '${param2}'` )
    process.exit()
}

// we know the parameters match
console.log( `GREAT: both '${param1}' and '${param2}' are the same!` )
