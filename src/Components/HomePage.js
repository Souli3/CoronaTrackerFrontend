"use strict";
import creatBorad from "./Dashboard.js";
import { setLayout } from "../utils/render";
import { API_URL } from "../utils/server";
import ChannelPage from "./ChannelPage.js"
import UpdateChannel from "./UpdateChannel.js";
import { getUserSessionData } from "../utils/session.js";
let SearchBar= require("./SearchBar.js");


//import {ChannelList} from "./Channel/ChannelList.js";
//import { RedirectUrl } from "./Router.js";
//import Channel from "./Channel/ChannelList";
var user = getUserSessionData();
var etat = true;
let searchBar;
const HomePage = () => {


    document.getElementById('main').innerHTML=`
    <div id="page">
    <div class="">
    <div id="tab" class="my-3 p-3 bg-white rounded box-shadow row justify-content-xl-center board">
      <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
      
      <div col col-xl-auto id="board"></div>
    </div>
              <div id="searchBar"></div>
               <div id="tableau"></div>
        </div>
    
  </div>
        
        <div id="tableau"></div>
          
            
              
                
  
  </html>

  
</div>
   `;


    console.log("homepage");
    creatBorad();
    searchBar = new SearchBar();
    channelList();

    
};

const channelList = () => {

    setLayout("Home page");

    fetch(API_URL + "channel", {
            method: "POST",
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
        .then((data) => channelListTable(data.tableau)).then(() => {
            let btns = document.querySelectorAll(".plus");
            btns.forEach(e => e.addEventListener("click", viewChannel))
        }).then(() => {
            (document.querySelectorAll(".update")).forEach(e => e.addEventListener('click', onupdate))
        })
        .catch((err) => onError(err));


};

const channelListTable = (data) => {
    console.log("data is here" + data);
    if (!data) return;
    console.log(etat);
    let tableau;

    if (etat) {
        tableau = `<br><br><br>
    <div class="my-3 p-3 bg-white rounded box-shadow">
    <h6 class="border-bottom border-gray pb-2 mb-0">Fil d'actualite</h6>
    <div class="btn-group btn-group-toggle col-12 " data-toggle="buttons">
      <label class="btn  btn-primary col-6 active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked data-uri="/">Channel ouvert</label>
      <label class="btn  btn-secondary  col-6">
        <input type="radio" name="options" id="option2" autocomplete="off" data-uri="/fermé">Channel fermé</label>
    </div>

  
  
  
  
  `;
    } else {
        tableau = `<br><br><br>
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
  <span class="fi-arrow-circle-top"></span>      
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


    data.forEach((element) => {
        if (element.state == "ouvert" && etat) {
            tableau += `
    <tr data-id="${element.id}">

          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.region}</td>
          <td>${element.date}</td>
          <td>${element.state}</td>
          <td><input type="button" class="btn btn-outline-success plus"  value="voirPlus"></td>`
            console.log(element.user)
            if (getUserSessionData() && element.user == getUserSessionData().username) {
                tableau += `<td><input type="button" class="btn btn-outline-success update"  value="Update"></td>
             `;
            }
            tableau += `</tr> `;

        } else if (element.state == "ferme" && !etat) {
            tableau += `
    <tr data-id="${element.id}">
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.region}</td>
          <td>${element.date}</td>
          <td>${element.state}</td>

          <td><input type="button" class="btn btn-outline-success plus"  value="voirPlus"></td>`
            tableau+= `</tr> `;
      
    }
  });





    tableau += ` </tbody>

      </table>
      </div>
  `;

    document.querySelector("#tableau").innerHTML = tableau;

  let btnOpen = document.getElementById("option1");
  let btnClose = document.getElementById("option2");

  btnOpen.onclick = function () {
    //btnOpen.scrollTo(0, btnOpen.offsetHeight * 1.5)
    console.log("oopen");
    inverseState(true);
    channelList();
  };
  btnClose.onclick = function () {
    console.log("cloose");
    inverseState(false);
    channelList();
  };
  document.getElementById("rechercher").onclick = function (e){
    onSearch(e);
  };

};
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

const onError = (err) => {
    console.error("Homepage::onError:", err);
    let errorMessage = "Error";
    if (err.message) {
        if (err.message.includes("401"))
            errorMessage =
            "Site has a little problem.";
        else errorMessage = err.message;
    }
};


function inverseState(state) {
    etat = state;
}


let viewChannel = (e) => {

    let idChannel = e.target.parentElement.parentElement.dataset.id;
    ChannelPage(idChannel);

}
let onupdate = (e) => {
    let idChannel = e.target.parentElement.parentElement.dataset.id;
    UpdateChannel(idChannel);
}









export default HomePage;