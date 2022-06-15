
class Directory {
    contacts;
    constructor(){
        this.contacts=[]
    }

    getContacts(){
        return this.contacts;
    }

    addContact(nom,prenom,phone){
        this.contacts.push({    
            id:this.contacts.length+1,
            phone:phone,
            firstname:prenom,
            lastname:nom,});
        this.listeContact()
    }

    deleteContact(id){
        if(this.contacts.find((contact)=>contact.id==id)){
            this.contacts.splice(id-1,1)
        }else{
            console.log("\x1b[31mThis ID not exist !\x1b[0m")
        }
        this.listContacts()
    }

    listeContact(){
        console.log("\x1b[33mHere is a list of your contacts :\n---------------------------\n\x1b[0m");
        if(this.contacts.length > 0){
            this.contacts.forEach((contact)=>{
                console.log(`\x1b[34mID: ${contact.id} ==> ${contact.firstname} ${contact.lastname}\nphone : ${contact.phone}\x1b[0m`)
            });
        }
        else{
            console.log("\x1b[31mYou don't have any contact yet !\x1b[0m")
        }
    }
}

module.exports = Directory