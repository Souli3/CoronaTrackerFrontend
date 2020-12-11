"use strict";


class SearchBar{

    constructor(){
        console.log("recherche");
        let searchBar = `
  
      
  
       
          <div class="d-flex p-5 bg-purple rounded align-items-center">
            
              <input class="form-control" id="titre" col-8" type="text" placeholder="Entrez votre recherche" aria-label="Search">
    
    
              <div class="p-2">
                
                <select class="custom-select" id="region" required>
                  <option selected disabled value="">Bruxelles</option>
                  <option>*</option>
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
    
    
    
              <button id="rechercher" class="btn btn-outline-success " >Rechercher</button>
            
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

/*

const onSearch = (e) =>{
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
















export default searchBarComponents;
*/
module.exports=SearchBar;