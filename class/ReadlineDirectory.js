const Directory = require("./Directory")

class ReadLineDirectory{

    readline;
    stop;
    directory;

    constructor(){
        this.stop=false;
        this.directory=new Directory()
        this.readline=require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this._bind()
    }

    _bind(){
        this.readline.on('close', (input) => {
            console.log('\x1b[33m\nThank you to have use your directory !\n See you again !\n\x1b[0m');
          });
    }

    _addContact(){
        let nom;
        let prenom;
        let phone;
        console.clear()
        console.log("\x1b[33mLet's add a new contact !\x1b[0m")
        this.readline.question(`\x1b[33mWhat is the first-name of your contact ?`+"\n\x1b[0m",(value)=>{
            prenom=value
            this.readline.question(`\x1b[33mWhat is the family name of your contact ?`+"\n\x1b[0m",(value)=>{
                nom=value
                this.readline.question(`\x1b[33mWhat is the phone number of \x1b[34m${prenom} ${nom}\x1b[33m ?`+"\n\x1b[0m",(value)=>{
                    if(value.match(/^(0[6])(?:[ _.-]?(\d{2})){4}$/)){
                        phone=value
                        console.log(`\x1b[32mYour contact \x1b[34m${prenom} ${nom}\x1b[32m have beean added succesfully to the directory !\x1b[0m`)
                        this.directory.addContact(nom,prenom,phone)
                        this._reStart()
                    }
                    else{
                        console.log("\x1b[31mWrong phone number !\x1b[0m")
                        this._reStart()
                    }
                    

                });
            });
        });
    };

    _deleteContact(){
        console.clear()
        console.log("\x1b[33mThere is the instructions for delete a contact. Get the ID of the contact with the list under.\n\x1b[0m")
        this.directory.listeContact()
        console.log("\x1b[33mNow choice the ID of the contact you want to delete !\n\x1b[0m")
        this.readline.question(`\x1b[33mWhat is the ID of the contact ?\n\x1b[0m`, value => {
            this.directory.deleteContact(value)
            this._reStart()
        });
    }

    _liste(){
        console.clear()
        this.directory.listeContact()
    }

    _stopInterface(){
        console.clear()
        this.readline.close()
        this.stop=true
    }

    _help(){
        console.clear()
        console.log(`\x1b[33m
        There the detail of different command available
    
        \x1b[34m/help\x1b[33m \x1b[37m: Display all the command available
        \x1b[34m/stop\x1b[33m \x1b[37m: Quit your loved directory
        \x1b[34m/add\x1b[33m \x1b[37m: Add new contact in your directory
        \x1b[34m/list\x1b[33m \x1b[37m: List all the contacts you have in your loved directory
        \x1b[34m/delete\x1b[33m \x1b[37m: Delete one of your contacts by specifying his ID\x1b[0m`)
    }

    _exeCmd(value){
        try{        
            switch (value) {
            case "/help":
                this._help()
                break;
            
            case "/stop":
                this._stopInterface()
                break
            case "/list":
                this._liste()
                break;
            case "/delete":
                this._deleteContact()
                break
            case "/add":
                this._addContact()
                break
            default:
                console.log("\x1b[31mCommande not found !\x1b[0m")
                break
            }
            if(!this.stop){
                this._reStart()
            }}catch(e){
            console.log("\x1b[31mError : "+e.message+"\x1b[0m")
        }

    
    }

    _reStart(){
        try{
            this.readline.question(`\n \x1b[33mEnter /help to display a list of commands. 
            Otherwise just enter any existing commands.\n\x1b[0m`,(value)=>{
                this._exeCmd(value)
            });
        }catch(e){
            console.log("\x1b[31mError : "+e.message+"\x1b[0m")
        }

    }

    start(){
        try{
            this.readline.question(`\x1b[33mHey Sir, i'm your directory ! 
            Enter /_help to display a list of commands. 
            Otherwise just enter any existing commands.\n\x1b[0m`,(value)=>{
                this._exeCmd(value)
               });
            }catch(e){
                console.log("\x1b[31mError : "+e.message+"\x1b[0m")
            }
        }

}

module.exports=ReadLineDirectory