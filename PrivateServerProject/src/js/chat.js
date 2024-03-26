"use strict"
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button")

sendButton.addEventListener("click",()=>
{
    const param = {
        name: nickname.value,
        msg: chatinput.value
    }

    socket.emit("chatting",param)
})

socket.on("chatting", (data)=> {
   const {name,msg,time} = data;
   const item = new Limodel(name, msg, time);
   item.makeLi(); 
   
})

console.log(socket);

function Limodel(name, msg, time)
{
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>
    {
        const li = document.createElement("li");
        li.classList.add(nickname.value == this.name ? "sent" : "received")
        const dom = `<span class="proflie">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/200/50/any" alt="any">
    </span>
    <span class = "message">${this.msg}</span>
    <span class ="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList(li);
    }
    
}