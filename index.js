const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var stop=false;
var contacts=[]
let contact={
    id:null,
    phone:null,
    firstname:null,
    lastname:null,
}

readline.on('close', (input) => {
    console.log(`\nThank you to have use your directory !\n See you again !\n`);
  });

function addContact(){
    console.clear()
    console.log("Let's add a new contact !")
    readline.question(`What is the first-name of your contact ?`+"\n",(value)=>{
        contact.firstname=value
        readline.question(`What is the family name of your contact ?`+"\n",(value)=>{
            contact.lastname=value
            readline.question(`What is the phone number of ${contact.firstname} ${contact.lastname} ?`+"\n",(value)=>{
                contact.phone=value
                console.log(`Your contact ${contact.firstname} ${contact.lastname} have beean added succesfully to the directory !`)
                contact.id=contacts.length+1
                contacts.push(contact)
                contact={
                    id:null,
                    phone:null,
                    firstname:null,
                    lastname:null,
                }
                reStart()
            });
        });
    });
};

function deleteContact(id){
    if(contacts.find((contact)=>contact.id==id)){
        contacts.splice(id-1,1)
    }else{
        console.log("This ID not exist !")
    }
    listContacts()
}

function listContacts(){
    console.log("Here is a list of your contacts :\n---------------------------\n");
    if(contacts.length > 0){
        contacts.forEach((contact)=>{
            console.log(`ID: ${contact.id} ==> ${contact.firstname} ${contact.lastname}\nphone : ${contact.phone}`)
        });
    }
    else{
        console.log("You don't have any contact yet !")
    }

};



async function exeCmd(value){
    switch (value) {
        case "/help":
            console.clear()
            console.log(`
            There the detail of different command available

            /help : Display all the command available
            /stop: Quit your loved directory
            /add: Add new contact in your directory
            /list: List all the contacts you have in your loved directory
            /delete: Delete one of your contacts by specifying his ID`)
            break;
        
        case "/stop":
            console.clear()
            readline.close()
            stop=true
            break
        case "/list":
            console.clear()
            listContacts()
            break;
        case "/delete":
            console.clear()
            console.log("There is the instructions for delete a contact. Get the ID of the contact with the list under.\n")
            listContacts()
            console.log("Now choice the ID of the contact you want to delete !\n")
            readline.question(`What is the ID of the contact ?\n`, value => {
                deleteContact(value)
                reStart()
            });
            break
        case "/add":
            addContact()
            break
        default:
            break
        }
        if(!stop){
            reStart()
        }

}

async function reStart(){
    await readline.question(`\n Enter /help to display a list of commands. 
    Otherwise just enter any existing commands.\n`,async(value)=>{
        await exeCmd(value)
       });
}

async function start(){
    await readline.question(`Hey Sir, i'm your directory ! 
    Enter /help to display a list of commands. 
    Otherwise just enter any existing commands.\n`,async(value)=>{
        await exeCmd(value)
       });
        

    }

    
const main= async()=>{
    await start()
}

main()