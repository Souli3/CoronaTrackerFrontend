"use strict";

const { API_URL } = require("../utils/server");

class SearchBar{

    constructor(){
      


        getRegionList();
     





        let searchBar = `
  
      
  
       
          <div class="d-flex p-5 bg-purple rounded align-items-center">
            
              <input class="form-control" id="titre" col-8" type="text" placeholder="Entrez votre recherche" aria-label="Search">
    
    
              <div class="p-2">
                
                <select class="custom-select" id="region" required>
               </select>
                <div class="invalid-feedback">
                  Please select a valid state.
                </div>
              </div>
    
    
    
              <button id="rechercher" class="btn btn-dark " >Rechercher</button>
            
          </div>
    
          
    
          
          
            
    </html>
     `;
        
     document.getElementById("searchBar").innerHTML=searchBar;
    }


    static onSearch(){
        let titre = document.getElementById("titre").value;
        if(!titre){
          titre="*";
        }
        let region = document.getElementById("region").value;
        
     fetch(API_URL + "channel/"+titre+"/"+region, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Error code : " + response.status + " : " + response.statusText
            );
          return response.json();
        })
        .then((data) => channelListTable(data))
        .catch((err) => onError(err));
    
        let btnOpen = document.getElementById("option1");
        let btnClose = document.getElementById("option2");
        btnOpen.onclick = function() {
            console.log("oopen");
            inverseState(true);
            channelList();
        };
        btnClose.onclick = function() {
            console.log("cloose");
            inverseState(false);
            channelList();
        };
    
    };
















}




async function getRegionList() {

 
  fetch(API_URL + "region", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
  },
  })
  .then((response) => {
      if (!response.ok)
          throw new Error(
              "Error code : " + response.status + " : " + response.statusText
          );
      return response.json();
  })
  .then((data) => ecrire(data.tableau))
  .catch((err) => onError(err));

 
  

}

function ecrire(data){
  data.forEach(element => {
    document.getElementById("region").innerHTML+=`<option>${element.region}</option>`;
  });
}

module.exports=SearchBar;