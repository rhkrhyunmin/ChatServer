"use strict"
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const disPlayContainer = document.querySelector(".display-container");

chatinput.addEventListener("keypress", (event)=>
{
    if(event.keycode === 13)
    {
        send();
        chatinput.value = "";
    }
})

function send()
{
    const param = {
        name: nickname.value,
        msg: chatinput.value
    }

    socket.emit("chatting",param)
}

sendButton.addEventListener("click",send)

socket.on("chatting", (data)=> {
   const {name,msg,time} = data;
   const item = new Limodel(name, msg, time);
   item.makeLi(); 
   disPlayContainer.scrollTop = 0;
})

function Limodel(name, msg, time)
{
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>
    {
        const li = document.createElement("li");
        li.classList.add(nickname.value == this.name ? "sent" : "received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://source.unsplash.com/category/nature/150x50" alt="any">
    </span>
    <span class = "message">${this.msg}</span>
    <span class ="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
    
}