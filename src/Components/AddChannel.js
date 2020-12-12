import { getUserSessionData } from "../utils/session";
import { RedirectUrl } from "./Router";
import { API_URL } from "../utils/server";
import Succes from "./Succes";


let region;
const AddChannel = () => {
    if (!getUserSessionData()) RedirectUrl("/login");
    //console.log("test 1 et 2 et 3");
    //let page = document.querySelector("page");
    getRegionList();
    let addPage = `
   
    <h1 class="mt-5">Cree un channel</h1>
    <form>
    <div id="error"></div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Titre</label>
      <input id="titre" class="form-control" type="text" placeholder="Entrez un titre">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Selectionnez un lieux</label>
      <select class="form-control" id="region">`;

     
        region.forEach(element => {
            addPage+=`<option>${element.region}</option>`;
        });
        addPage+=`
      </select>
    </div>
    
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Sujet</label>
      <textarea class="form-control" id="sujet" rows="3"></textarea>
    </div>
    <button type="button" id="Confirmer" class="btn btn-primary btn-lg btn-block">Cree un channel</button>  
    </form>
  
  
    `;
    page.innerHTML=addPage;

    let btnOpen = document.getElementById("Confirmer");
    btnOpen.onclick = function(e) {
        let error;
        if(isEmptyOrSpaces(document.getElementById("titre").value) ){
              error=  `<div class="alert alert-danger" role="alert">
                Veuillez rentre un titre
              </div>`;

        }else if(isEmptyOrSpaces(document.getElementById("sujet").value)){
            error = `<div class="alert alert-danger" role="alert">
                Veuillez rentre un sujet
              </div>`;
        

        }else if(document.getElementById("region").value=="*"){
            error = `<div class="alert alert-danger" role="alert">
            Veuillez choisir un lieu
          </div>`;
        } 
        else{
            onAddChannel(e);
        }
        document.getElementById("error").innerHTML=error;

    };



};

const onAddChannel = (e) => {
    e.preventDefault();
    let channel = {
        title: document.getElementById("titre").value,
        user: getUserSessionData().username,
        state: "ouvert",
        region: document.getElementById("region").value,
        subject: document.getElementById("sujet").value

    };
    fetch(API_URL + "channel/add", {

            method: "PUT", // *GET, POST, PUT, DELETE, etc.
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

const onChannelAdded = (data) => {
    Succes();
    //RedirectUrl("/");
};


function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function getRegionList(){

  
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
    .then((data) => region=data.tableau)
    .catch((err) => onError(err));
  
  
  
  
  
  }







export default AddChannel;