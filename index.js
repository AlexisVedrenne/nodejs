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
    console.log('\x1b[33m\nThank you to have use your directory !\n See you again !\n\x1b[0m');
  });

function addContact(){
    console.clear()
    console.log("\x1b[33mLet's add a new contact !\x1b[0m")
    readline.question(`\x1b[33mWhat is the first-name of your contact ?`+"\n\x1b[0m",(value)=>{
        contact.firstname=value
        readline.question(`\x1b[33mWhat is the family name of your contact ?`+"\n\x1b[0m",(value)=>{
            contact.lastname=value
            readline.question(`\x1b[33mWhat is the phone number of ${contact.firstname} ${contact.lastname} ?`+"\n\x1b[0m",(value)=>{
                if(value.match(/^(0[6])(?:[ _.-]?(\d{2})){4}$/)){
                    contact.phone=value
                }
                else{
                    console.log("\x1b[31mWrong phone number !\x1b[0m")
                    contact={
                        id:null,
                        phone:null,
                        firstname:null,
                        lastname:null,
                    }
                    reStart()
                }
                
                console.log(`\x1b[32mYour contact ${contact.firstname} ${contact.lastname} have beean added succesfully to the directory !\x1b[0m`)
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
        console.log("\x1b[31mThis ID not exist !\x1b[0m")
    }
    listContacts()
}

function listContacts(){
    console.log("\x1b[33mHere is a list of your contacts :\n---------------------------\n\x1b[0m");
    if(contacts.length > 0){
        contacts.forEach((contact)=>{
            console.log(`\x1b[34mID: ${contact.id} ==> ${contact.firstname} ${contact.lastname}\nphone : ${contact.phone}\x1b[0m`)
        });
    }
    else{
        console.log("\x1b[31mYou don't have any contact yet !\x1b[0m")
    }

};



async function exeCmd(value){
    switch (value) {
        case "/help":
            console.clear()
            console.log(`\x1b[33m
            There the detail of different command available

            /help : Display all the command available
            /stop: Quit your loved directory
            /add: Add new contact in your directory
            /list: List all the contacts you have in your loved directory
            /delete: Delete one of your contacts by specifying his ID\x1b[0m`)
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
            console.log("\x1b[33mThere is the instructions for delete a contact. Get the ID of the contact with the list under.\n\x1b[0m")
            listContacts()
            console.log("\x1b[33mNow choice the ID of the contact you want to delete !\n\x1b[0m")
            readline.question(`\x1b[33mWhat is the ID of the contact ?\n\x1b[0m`, value => {
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
    await readline.question(`\n \x1b[33mEnter /help to display a list of commands. 
    Otherwise just enter any existing commands.\n\x1b[0m`,async(value)=>{
        await exeCmd(value)
       });
}

async function start(){
    await readline.question(`\x1b[33mHey Sir, i'm your directory ! 
    Enter /help to display a list of commands. 
    Otherwise just enter any existing commands.\n\x1b[0m`,async(value)=>{
        await exeCmd(value)
       });
        

    }

    
const main= async()=>{
    await start()
}

try{
    main()
}catch(e){
    console.log("%c "+e.message,'font-color:red')
}
