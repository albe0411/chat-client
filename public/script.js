let messageList = document.getElementById("messageList")
let ipAddressInput = document.getElementById("ipAddress")
let usernameInput = document.getElementById("username")
let messageInput = document.getElementById("messageInput")
 
let ipAddress = "localhost:3000"
 
let latestMessageId = 0

function getMessage() {
    let xmlhttp = new XMLHttpRequest();
 
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
          if(xmlhttp.responseText != "")
            showMessage(xmlhttp.responseText)
        }
      };
 
    xmlhttp.open("GET", `http://${ipAddress}/getMessage`, true);
    xmlhttp.send();
 
};

function sendMessage() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `http://${ipAddress}/sendMessage` , true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    message: messageInput.value,
    username: usernameInput.value
  }));
}
 
function showMessage(messages) {
  messages = JSON.parse(messages)
  for (let i = latestMessageId; i < messages.length; i++) {
    if(messages[i]["id"] >= i){
      msgDiv = document.createElement("div")
      msgDiv.className = "message"
 
      usernameP = document.createElement("p");
      usernameP.innerHTML = messages[i]["username"]
      usernameP.className = "username"  
 
      messageP = document.createElement("p");
      messageP.innerHTML = messages[i]["message"]
      messageP.className = "messageText"
 
      msgDiv.appendChild(usernameP)
      msgDiv.appendChild(messageP)
   
      messageList.appendChild(msgDiv)
 
      latestMessageId = messages[i]["id"]
    }
  }
}
 
ipAddressInput.addEventListener('input', function (evt) {
  messageList.innerHTML = ""
  latestMessageId = 0
  ipAddress = this.value
});

let section = document.getElementById("section");
let aside = document.getElementById("aside");
console.log(aside.className);

function hideShow() {
  if (section.classList == "hide"){
    section.classList.remove("hide");
    aside.classList.add("hide");
  }
  else{
    section.classList.add("hide");
    aside.classList.remove("hide");
  }
}

setInterval(getMessage, 500);