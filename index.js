//Autheur Alexis Vedrenne
const ReadLineDirectory = require("./class/ReadlineDirectory")

readLineDirectory = new ReadLineDirectory()

const main= ()=>{
    readLineDirectory.start()
}

try{
    main()
}catch(e){
    console.log(+e.message)
}

//Autheur Alexis Vedrenne