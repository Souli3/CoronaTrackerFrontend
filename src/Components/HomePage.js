import Quote from "./Quote.js";
import creatBorad, { createBoard } from "./Dashboard.js";
let page = document.querySelector("#page");
const HomePage = () => {    
  page.innerHTML = `<div id="quote"></div>`;
    Quote(); 
   // console.log(document.getElementById('board').innerText)
    if(!document.getElementById('board'))
    creatBorad();
};

export default HomePage;
