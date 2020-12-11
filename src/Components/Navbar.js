let navBar = document.querySelector("#navBar");
import { getUserSessionData } from "../utils/session.js";
import MyImage from "../images/logo.png";
import { RedirectUrl } from "./Router";

// destructuring assignment
const Navbar = () => {
    let navbar;
    let user = getUserSessionData();
    if (!user) { // pas connecte
        navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a id ="logo" data-uri="/"><img src="${MyImage}" alt="CoronaTracker logo" style=" width: 90px;height: 90px;"></a>
        
    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
    
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" data-uri="/">Accueil <span class="sr-only">(current)</span></a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link"  data-uri="/login">Login <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
        <a class="nav-link"  data-uri="/register">Register <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>`;
    } else { //connecte
        navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
        <a id ="logo" data-uri="/"><img src="${MyImage}" alt="CoronaTracker logo" style=" width: 90px;height: 90px;"></a>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" data-uri="/">Accueil <span class="sr-only">(current)</span></a>
        </li>
        
        <li class="nav-item active">
          <a class="nav-link" data-uri="/addChannel">Cree un channel<span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item active">
           <a class="nav-link"  data-uri="/mychannels">Mes channels <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link"  data-uri="/myaccount">Mon Compte <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link"  data-uri="/logout">Logout <span class="sr-only">(current)</span></a>
        </li>
      </ul>
  </div>    
  </nav>`;
    }
    navBar.innerHTML = navbar
    let logo = document.getElementById("logo");

    logo.addEventListener("click", function() { RedirectUrl("/"); })
};

export default Navbar;