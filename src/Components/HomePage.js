"use strict"
import creatBorad, { createBoard } from "./Dashboard.js";
import { setLayout } from "../utils/render";
import { API_URL } from "../utils/server";

//import {ChannelList} from "./Channel/ChannelList.js";
//import { RedirectUrl } from "./Router.js";
//import Channel from "./Channel/ChannelList";
var etat=false;
const HomePage = () => {    
  console.log("homepage");
  let homepage=`
  
      
  
      <main role="main" class="container p-5">
        <div class="d-flex p-5 bg-purple rounded align-items-center">
          <form class="form-inline  col-12">
            <input class="form-control col-8" type="text" placeholder="Entrez votre recherche" aria-label="Search">
  
  
            <div class="p-2">
              
              <select class="custom-select" id="validationCustom04" required>
                <option selected disabled value="">Bruxelles</option>
                <option>Bruxelles</option>
                <option>Anvers</option>
                <option>Liege</option>
                <option>Mons</option>
                <option>Namur</option>
                <option>Gand</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
  
  
  
            <button id="rechercher" class="btn btn-outline-success " type="submit">Rechercher</button>
          </form>
        </div>
  
        <div class="my-3 p-3 bg-white rounded box-shadow">
          <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
          <h1> tableau de statistique a mettre ici</h1>
        </div>
  
        
        <div id="tableau"></div>
          
            
              
            
      </main>
    
  
  </html>
   `;
   page.innerHTML=homepage;
    channelList();
  creatBorad();
};

const channelList = ()=>{
  
  setLayout("Home page");

    fetch(API_URL+"channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) =>{
        if(!response.ok)
            throw new Error(
                "Error code : "+ response.status +" : "+response.statusText
            );
        return response.json();
    })
    .then((data) => channelListTable(data.tableau))
    .catch((err) => onError(err));
    
    
};


const channelListTable = (data) => {
  console.log("data is here");
  if(!data) return;
  console.log(etat);
  let tableau;
  
  if(etat){
    tableau =`
    <div class="my-3 p-3 bg-white rounded box-shadow">
    <h6 class="border-bottom border-gray pb-2 mb-0">Fil d'actualite</h6>
    <div class="btn-group btn-group-toggle col-12 " data-toggle="buttons">
      <label class="btn  btn-primary col-6 active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked data-uri="/">Channel ouvert</label>
      <label class="btn  btn-secondary  col-6">
        <input type="radio" name="options" id="option2" autocomplete="off" data-uri="/fermé">Channel fermé</label>
    </div>

  
  
  
  
  `;
  }else{
      tableau =`
      <div class="my-3 p-3 bg-white rounded box-shadow">
      <h6 class="border-bottom border-gray pb-2 mb-0">Fil d'actualite</h6>
      <div class="btn-group btn-group-toggle col-12 " data-toggle="buttons">
        <label class="btn  btn-secondary  col-6 active">
          <input type="radio" name="options" id="option1" autocomplete="off" >Channel ouvert</label>
        <label class="btn  btn-primary col-6">
          <input type="radio" name="options" id="option2" autocomplete="off" checked>Channel fermé</label>
      </div>
    `;

  }
  
  tableau += `
  <table class="table table-hover">
        <thead>
          <tr class="bg-primary">
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Region</th>
            <th scope="col">date</th>
            <th scope="col">Etat</th>
          </tr>
        </thead>
  <tbody>
  `;
  
  
  data.forEach((element)=>{
    if(element.state=="ouvert" && etat){
      tableau+= `
    <tr >
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>?</td>
          <td>${element.date}</td>
          <td>${element.state}</td>
    </tr> `;
    }else if(element.state=="ferme" && !etat){
      tableau+= `
    <tr >
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>?</td>
          <td>${element.date}</td>
          <td>${element.state}</td>
    </tr> `;
    }
    

   
});



  tableau +=` </tbody>
      </table>
      </div>
  `;
  
 document.querySelector("#tableau").innerHTML=tableau;


 let btnOpen= document.getElementById("option1");
 let btnClose= document.getElementById("option2");
 btnOpen.onclick = function(){
   console.log("oopen");
   inverseState(true);
   channelList();
 };
 btnClose.onclick = function(){
   console.log("cloose");
   inverseState(false);
   channelList();
 };

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

function inverseState(state){
  etat=state;
}
















export default HomePage;


















