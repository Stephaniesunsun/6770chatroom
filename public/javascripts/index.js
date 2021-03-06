//this is the client side.
const socket=io();
const listGroup=document.querySelector('.list-group');
const form=document.querySelector('.chat-form');
const submitBtn=document.querySelector('.btn-primary');
const inputField=document.querySelector('#exampleTextarea');
const chatmessage=document.querySelector('.list-group-item-action');

//get username and room
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

//listen the emit message on server side.    
socket.on('message',messageObj=>{//listen
    //console.log(message)
    outputMassage(messageObj)
    //scroll down
    messageObj.scrollTop=messageObj.scrollHeight;
})
//join room
socket.emit('joinRoom',{username,room});
//get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoom(room);
    outputUsers(users);
})
form.addEventListener("submit",e=>{
    e.preventDefault();
    var input=inputField.value;
    //emit message to server
    socket.emit("chatMessage",input)
    //clear input
    //console.log(e.target.elements)
    e.target.elements[1].value=''
    e.target.elements[1].focus();
}
)
const outputRoom=room=>{
    const roomName=document.querySelector('.roomname');
    roomName.innerText=room;
}
const outputUsers=users=>{
    const roomNumber=document.querySelector('.roomusers');
    roomNumber.innerHTML="current number of users: "+users;
}
const outputMassage=messageObj=>{
    const message=messageObj.text;
    const time=messageObj.time;
    const username=messageObj.username;

    const messageContainer=document.createElement('div');
    messageContainer.classList.add('list-group-item','list-group-item-action','flex-column','align-items-start')
    const messageFlex=document.createElement('div');
    messageFlex.classList.add('d-flex','w-100','justify-content-between')
    const user=document.createElement('h5');
    user.classList.add('mb-1');
    user.innerText=username;
    const timestamp=document.createElement('small');
    timestamp.innerText=time;
    const messageBody=document.createElement('p');
    messageBody.classList.add('mb-1');
    messageBody.innerText=message;
    messageFlex.appendChild(user);
    messageFlex.appendChild(timestamp);
    messageContainer.appendChild(messageFlex);
    messageContainer.appendChild(messageBody);
    listGroup.appendChild(messageContainer);
}