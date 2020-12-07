let navBar = document.querySelector("#navBar");
import {getUserSessionData} from "../utils/session.js";
// destructuring assignment
const Navbar = () => {
  let navbar;
  let user = getUserSessionData();    
  if (user) {
    navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Corona Tracker</a>
    <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Accueil <span class="sr-only">(current)</span></a>
        </li>
        
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Parametreee</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item" href="#">Mon Compte</a>
            <a class="dropdown-item" href="#">Mes states</a>
            <a class="dropdown-item" href="#">?</a>
          </div>
        </li>
      </ul>
      
    </div>
  </nav>`;
  } else {//pas connecter 2 eme cas en bas
    navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Corona Tracker</a>
    <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" data-uri="/" href="#">Accueil <span class="sr-only"></span></a>
        </li>
        
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Parametrees</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item"  href="#">Mon Compte</a>
            <a class="dropdown-item" href="#">Mes states</a>
            <a class="dropdown-item" href="#">?</a>
          </div>
        </li>
      </ul>
      
    </div>
  </nav>`;
  }

  return (navBar.innerHTML = navbar);
};

export default Navbar;
