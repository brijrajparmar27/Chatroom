//class will communicate with database
class dbmanager{

    //constructor
    constructor(room,uname){
        this.room = room;
        this.uname = uname;
        this.db = db.collection("chats");
        this.unsub;
    }

    //update the visited room
    updateRoom(newRoom){
        this.room = newRoom;
        console.log("room changed to ", this.room);
        if(this.unsub)
        {
            this.unsub();
        }

        //resub
        // obj.fetchchats((data)=>{
        //     appendToUI(data);
        // })
    }

    //update the display name
    updateName(newName){
        this.uname = newName;
        localStorage.setItem('uname',newName);
    }

    //create new message in firebase
    async addmsg(msg){

        let now = new Date();

        let msgObj = {
            msg : msg,
            name : this.uname,
            time : firebase.firestore.Timestamp.fromDate(now),
            room : this.room
        }

        this.db.add(msgObj);
    }

    //fetch chats from current room
    fetchchats(addMsg){
        this.unsub = this.db
        .where('room', "==", this.room)
        .orderBy('time')
        .onSnapshot(snapshot=>{
            snapshot.docChanges()
            .forEach(change=>{
                if(change.type == "added"){
                    addMsg(change.doc.data());
                }
            })
        })
    }

    //add msg to firebase and let onSnapshot handle UI update
    addNewMessage(textMsg){
        newDB.addmsg(textMsg).then((resolve)=>{
            console.log("sucessfull!");
        }).catch(reject=>{
            console.log("there was an error", reject);
        });
    }

}