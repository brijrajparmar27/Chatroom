//selectors --------------------------------------------
const msgform = document.querySelector(".msgform");
const chatsection = document.querySelector(".chatsection");
const nameform = document.querySelector(".nameform");
const changeName = document.querySelector(".changeName");
const room = document.querySelectorAll(".room");
const roomssection = document.querySelector(".roomssection");
const gridcontainer = document.querySelector(".gridcontainer");
const getName = document.querySelector(".getName");
const enterName = document.querySelector(".enterName");

let Passuname = 'annon';

//get username from local storage
if(localStorage.getItem('uname'))
{
    let Passuname = localStorage.getItem('uname');
    gridcontainer.classList.remove("hide");
    enterName.classList.add("hide");
}

//dbmanager object  --------------------------------------------
let newDB = new dbmanager("general",Passuname);

//functions --------------------------------------------

//handle enter name form
getName.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(getName.uname.value.trim()!== "")
    {
        newDB.updateName(getName.uname.value.trim());
        gridcontainer.classList.remove("hide");
        enterName.classList.add("hide");
    }
});

//handle room select
roomssection.addEventListener("click",(e)=>{
    if(e.target.classList.contains("room"))
    {
        newDB.updateRoom(e.target.getAttribute("id"));
        chatsection.innerHTML = "";
        newDB.fetchchats((data)=>{
            appendToUI(data);
        });
        roomSelect(e.target.getAttribute("id"));
    }
});

const roomSelect = (id)=> {
    room.forEach((r)=>{
        if(r.getAttribute("id") == id)
        {
            r.classList.add("selected");
        }
        else{
            if(r.classList.contains("selected"))
            {
                r.classList.remove("selected");
            }
        }
    })
}

//change listener
newDB.fetchchats((data)=>{
    appendToUI(data);
})

//handle New message Submission
msgform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(msgform.Nmsg.value.trim()!=="")
    {
        newDB.addNewMessage(msgform.Nmsg.value.trim());
        msgform.reset();
    }
})

//handle name change
nameform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(nameform.newName.value.trim()!=="")
    {
        newDB.updateName(nameform.newName.value.trim());
        nameform.reset();
        changeName.classList.remove('hide');
        setInterval(()=>{
            changeName.classList.add('hide');
        },3000);
    }
});

//append the msg to chat
const appendToUI = data => {
    
    const when = dateFns.distanceInWordsToNow(
        data.time.toDate(),
        {addSuffix:true}
    );

    //new msg template
    let msgTemplate = `
        <div class="chat">
            <div class="line1">
                <p class="name">${data.name} &nbsp;</p>
                <p class="msg">${data.msg}</p>
            </div>
        <p class="time">${when}</p>
        </div>
    `;
    
    //prepend to the chat
    chatsection.innerHTML = msgTemplate+chatsection.innerHTML;
}
