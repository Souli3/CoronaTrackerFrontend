import { API_URL } from "../utils/server.js";

let creatBorad=()=>{
    let cont=[];
console.log("GET data");
   //fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-pandemic-belgium-hosp-previonce%40public&sort=date&facet=date&facet=region&facet=region', {
   fetch(API_URL+"cases/", {
   method: "get",headers:{
      
    }}).then(response => response.json())
  .then(data => {data.board/* .records */.map(element => {cont.push({region: `${/* element.fields.region */element.region}`,'ouvert' :(/* element.fields.new_in */element["ouvert"]),'ferme' :(/* element.fields. new_out*/element["ferme"])}) })
  make(cont)
    console.log(cont)
})

function make(cont){
 let  board=document.getElementById("board");
 if(board.innerText!='')return
 board.style.width = "1750px";
  board.style.height= "350px";
  board.style.border="2px solid";
  
  new Morris.Bar({
    // ID of the element in which to draw the chart.//
    element: 'board',
    fillOpacity: 9,
    data: cont,
    // The name of the data record attribute that contains x-values.
    xkey: `region`,
    // A list of names of data record attributes that contain y-values.
    ykeys: ['ouvert','ferme'],
    // Labels for the ykeys -- will be displayed when you hover over the
    labels: ['Ouvert','Fermé'],
    gridTextSize:16,
    gridTextWeight:570,
    gridTextColor:'white',
    barColors: ['red',' rgb(34, 177, 77)',],

    lineWidth: '3px',
})

}}
export default creatBorad;