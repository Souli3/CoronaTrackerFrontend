
import { getUserSessionData } from "../utils/session";
import { RedirectUrl } from "./Router";
import { API_URL } from "../utils/server";



const AddChannel = ()=>{
  if(!getUserSessionData()) RedirectUrl("/login");
    //console.log("test 1 et 2 et 3");
    //let page = document.querySelector("page");
    page.innerHTML = `
    <main class="container p-5" role="main">
   
    <h1 class="mt-5">Cree un channel</h1>
    <form>
    <div class="form-group">
      <label for="exampleFormControlInput1">Titre</label>
      <input id="titre" class="form-control" type="text" placeholder="Entrez un titre">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Selectionnez une lieux</label>
      <select class="form-control" id="region">
        <option>Bruxelles</option>
        <option>Anvers</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Sujet</label>
      <textarea class="form-control" id="sujet" rows="3"></textarea>
    </div>
    <button type="button" id="Confirmer" class="btn btn-primary btn-lg btn-block">Cree un channel</button>  
    </form>
  
  
  </main>
    `;


    let btnOpen= document.getElementById("Confirmer");
    btnOpen.onclick = function(e){
        console.log("test "+document.getElementById("region").value);
        console.log("test "+document.getElementById("titre").value);
        console.log("test "+document.getElementById("sujet").value);
       
        onAddChannel(e);

    };

    

};

const onAddChannel = (e) =>{
    e.preventDefault();
    let channel={
        title:document.getElementById("titre").value,
        user:getUserSessionData().username,
        state:"ouvert",
        region:document.getElementById("region").value,
        subject:document.getElementById("sujet").value
       
    };
    fetch(API_URL+"channel/add", {
            
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(channel), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: getUserSessionData().token,
        },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Error code : " + response.status + " : " + response.statusText
            );
          return response.json();
        })
        .then((data) => onChannelAdded(data))
        .catch((err) => onError(err));




};

const onChannelAdded = (data) => {
    RedirectUrl("/addChannel");
};












export default AddChannel;