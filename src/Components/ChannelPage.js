import { API_URL } from "../utils/server";
import UpdateChannel from "./UpdateChannel.js";
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
</main>`
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
      .catch((err) => onError(err));
      
    }
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