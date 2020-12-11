import { API_URL } from "../utils/server";
import UpdateChannel from "./UpdateChannel.js";
import insertChat from"./ConversationPage.js"
import { getUserSessionData } from "../utils/session";
var html=(id,title,sujet,date,etat,region,user)=>{
  return   `
  <main role="main"  class="container channel p-5 border border-primary">
  <div class="container-fluid">
  <p>
  Title :   ${title} <br>
  Sujet :  ${sujet }<br>
  Date :  ${date}<br>
  Region : ${region}<br>
  Etat :  ${etat}<br>
  User : ${user}<br>
  
</div>
<form>
<button type="submit" class="btn btn-primary fermer" >fermer</button>
</form>
                
</main>
<ul id="message"></ul>
<div class="msj-rta macro">                        
                    <div class="text text-r" style="background:whitesmoke !important">
                    
                        <textarea id="text-message" placeholder="Type a message"/></textarea>
                        <button data-id="${id}" id="sendMessage" class="btn btn-outline-success "><i> &#xe092;</i></button>
                    </div> 
                    
                </div>
                `
};
let ChannelPage=(id)=>{
  let   page=document.getElementById('page');
    fetch(API_URL+"channel/"+id)
      .then((response) =>{
          if(!response.ok)
              throw new Error(
                  "Error code : "+ response.status +" : "+response.statusText
              );
          return response.json();
      })
      .then((data) => (page.innerHTML=html(data.channel.id,data.channel.title,data.channel.subject,data.channel.date,data.channel.state,data.channel.region,data.channel.user)))
      .then(()=>{(document.getElementById('sendMessage')).addEventListener('click',send)}).then(()=>{listMessages(id)})
      .catch((err) => onError(err));
      
    }
   let  listMessages=(idChannel)=>{
      fetch(API_URL+"channel/allMessages",{
        method: "POST", 
        body: JSON.stringify({idChannel}), 
        headers: {
            "Content-Type": "application/json",
            Authorization: getUserSessionData().token,
        },}).then(res=>res.json())
        .then(data=>{data.messages.forEach(e=>{insertChat(data.owner,e.username,e.message)})}).catch((err) => onError(err));
    }
    const send =(e)=>{
      var message=document.getElementById('text-message').value;
      let user=getUserSessionData().username;
      let idChannel= e.target.dataset.id;
      console.log("verify id channel "+idChannel+" message : "+ message+" by User :"+user);
      fetch(API_URL+"channel/addMessage",{
        method: "POST", 
        body: JSON.stringify({user,message,idChannel}), 
        headers: {
            "Content-Type": "application/json",
            Authorization: getUserSessionData().token,
        },}).then(res=>res.json())
        .then(data=>{data.messages.forEach(e=>{console.log(e.username);console.log(data.owner);insertChat(data.owner,e.username,e.message)})}).catch((err) => onError(err));
      };
    const onError = (err) => {
        console.error("Homepage::onError:", err);
        let errorMessage = "Error";
        if (err.message) {
          if (err.message.includes("401"))
            errorMessage =
              "Site has a little probleme.";
          else errorMessage = err.message;
        }
        //RedirectUrl("/error", errorMessage);
      };
    export default ChannelPage;
