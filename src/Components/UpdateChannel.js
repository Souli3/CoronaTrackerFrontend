import { API_URL } from "../utils/server.js";
import { getUserSessionData } from "../utils/session.js";
let html=(id,title,sujet,date,etat,region)=>{return `<main role="main" class="container p-5 border border-primary">
<div class="d-flex p-5 bg-purple rounded align-items-center"><form>
<div class="form-row">
<input type="hidden" id="id" value=${id}>
<div class="form-group col-md-6">

  <label for="inputlg"><h6>titre</h6></label>
  <input type="text" class="input-lg" id="title" placeholder="title" value="${title}">
</div>
</div>
<div class="form-row">
<div class="form-group col-md-6">
  <label for="inputlg"><h6>sujet</h6></label>
  <textarea class=".col-lg-*" id="subject" >${sujet}</textarea>
</div>
</div>
<div class="form-row">
<label for="inputlg"><h6>Region</h6></label>
<select class="custom-select" id="region" required>
              <option selected>${region}</option>
              <option>Bruxelles</option>
              <option>Anvers</option>
              <option>Liege</option>
              <option>Mons</option>
              <option>Namur</option>
              <option>Gand</option>
            </select>
</div>
<div class="form-row">
<div class="form-group col-md-6">
<label for="date"><h6>date</h6></label>
<input type="date" class="date" id="date" value="${date}">
</div>
</div>
<div class="form-row">
<div class="form-group col-md-6">
<label><h6 class="mb-3">etat channel</h6></label>
<select class="custom-select" id="etat" required>
<option selected>${etat}</option>
<option>ouvert</option>
<option>ferme</option>
</select>
</div>
</div>
<button type="submit" class="btn btn-primary update" >Modifier</button>
</form>
</main>`};
const UpdateChannel=(id)=>{
let update =document.getElementById("page");
console.log("testUpdateChannel")
fetch(API_URL+"channel/"+id )
.then((response) =>{
    if(!response.ok)
        throw new Error(
            "Error code : "+ response.status +" : "+response.statusText
        );
    return response.json();
})
.then((data) => (update.innerHTML=html(data.channel.id,data.channel.title,data.channel.subject,data.channel.date,data.channel.state,data.channel.region)))
.then(()=>{let modifier=document.querySelector('.update');modifier.addEventListener("click",onUpdate);})
.catch((err) => onError(err));
}
const onUpdate=()=>{
  let idChannel=document.getElementById('id').value;;
   let title=document.getElementById('title').value;
    let region=document.getElementById('region').value;
    let etat=document.getElementById('etat').value;
    let date=document.getElementById('date').value;
    let subject=document.getElementById('subject').value;
    let username= getUserSessionData().username;
    var channel={
        id:idChannel,
        user:username,
        date:date,
        region:region,
        etat:etat,
        title:title,
        sujet:subject
    } 

    fetch(API_URL+"channel",{
      method: "PUT",
      body:JSON.stringify({channel}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(()=>{console.log("put channel")})
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


export default UpdateChannel;