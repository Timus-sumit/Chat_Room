const chatList = document.querySelector('.chat-list');
const newchatform = document.querySelector('.new-chat');
const newnameform= document.querySelector('.new-name');
const updateMssg= document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-room');

newchatform.addEventListener('submit', e=>{
    e.preventDefault();
    const message = newchatform.message.value.trim();
    chatroom.addChat(message)
     .then(()=>newchatform.reset())
     .catch(err=>console.log(err));
})

newnameform.addEventListener('submit', e=>{
    e.preventDefault();
    const newname= newnameform.name.value.trim();
    chatroom.updateName(newname);
    newnameform.reset();
    updateMssg.innerText = `Your name was updated to ${newname}`
    setTimeout(()=>updateMssg.innerText=" ", 3000)
})

rooms.addEventListener('click',e=>{
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'))
    chatroom.getChats(chat => chatUI.render(chat));
  }
})

const username = localStorage.username? localStorage.username:'Anon';

const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username);

chatroom.getChats((data)=>{
  chatUI.render(data);
})