"use strict"
import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import { setUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";

/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
let registerPage = `<form>
<div class="form-group">
  <label for="firstName">Prénom</label>
  <input class="form-control" id="fname" type="text" name="fname" placeholder="Entrez votre Prénom " required="" pattern="^([a-zA-Z]|\s)*$"
  />
</div><div class="form-group">
<label for="Name">Nom</label>
<input class="form-control" id="name" type="text" name="name" placeholder="Entrez votre Nom" required="" pattern="^([a-zA-Z]|\s)*$"
/>
</div>
<div class="form-group">
  <label for="email">Email</label>
  <input class="form-control" id="email" type="text" name="email" placeholder="Entrez  votre email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$" />
</div>
<div class="form-group">
  <label for="password">Mot de passe</label>
  <input class="form-control" id="password" type="password" name="password" placeholder="Entrez  votre Mot De Passe" required="" pattern=".*[A-Z]+.*" />
</div>
<div class="form-group">
  <label for="confpassword">Confirmez le mot de passe</label>
  <input class="form-control" id="confpassword" type="password" name="password" placeholder="Confirmez votre Mot De Passe" required="" pattern=".*[A-Z]+.*" />
</div>
<button class="btn btn-primary" id="btn" type="submit">Submit</button>
<!-- Create an alert component with bootstrap that is not displayed by default-->
<div class="alert alert-danger mt-2 d-none" id="messageBoard"></div><span id="errorMessage"></span>
</form>`;

const RegisterPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = registerPage;
  let registerForm = document.querySelector("form");
  registerForm.addEventListener("submit", onRegister);
};

const onRegister = async (e) => {
  e.preventDefault();
  let user = {
    fname: document.getElementById("fname").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
   confpassword: document.getElementById("confpassword").value,

  };
  
try{
  let response = await fetch("/api/users/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log(response);
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText);
    let jsonResponse = await response.json();
    console.log("Response from JSON" , jsonResponse);
    setUserSessionData(jsonResponse);
  Navbar(jsonResponse);
  RedirectUrl("/list");

}catch(err){
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("409"))
    errorMessage = "This user is already registered.";
    
   else if(err.message.includes("408"))
    errorMessage = "Confirmation de motDePasse n'est pas correct ";
  else errorMessage = err.message;

  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
  
}
}

export default RegisterPage;
