"strict mode";
import anime from 'animejs/lib/anime.js';
import { RedirectUrl } from './Router';

var minuteur =5;
let interval;
const Succes = async()=>{
    console.log("succes");
    let   page=document.getElementById('page');
    let succes=`
   
    
    





        <main role="main" class="container p-5">

        <div class="starter-template">
          <div class="succes">
          <div class="letter">S</div><div class="letter">u</div><div class="letter">c</div>
          <div class="letter">c</div>
          <div class="letter">é</div>
          <div class="letter">s</div>
          </div></br></br></br></br></br>
          <p class="lead chargementText">Vous allez etre rediriger vers le menu principal dans <t id="compteur">5</t> secondes</p>
        </div>
  
      </main>














    
    `;


    page.innerHTML=succes;
   // console.log("ma premier lettre "+document.getElementById('animateMe').value);

    annimationText();
    annimationMinuteur();




}
const annimationMinuteur = ()=>{
  
    interval=setInterval(ecriture, 1000);
        console.log("je passe");
    
    
    
}

const ecriture = ()=>{

        if(minuteur<=0){
            clearInterval(interval);
            RedirectUrl("/");
            return;
        } 
        let variable = document.getElementById('compteur');
        minuteur=minuteur-1;
        variable.innerText=minuteur;
    
}

const annimationText =  ()=>{
    var list= document.querySelectorAll('.letter');
   

    var animation = anime.timeline({
        targets: list,
        delay:  (el, i) => 30 * i,
        loop:true
    })
    .add({

      translateY: ["1.1em", 4],
      duration: 1000,
      delay: (el, i) => 50 * i
    });









/*
  var animation = anime.timeline({
    targets: "#animateMe",
    delay: anime.stagger(50),
    loop: true
  });

  animation
    .add({
      translateY: -40
    })
    .add({
      translateY: 0
    });
*/
}

   

export default Succes;