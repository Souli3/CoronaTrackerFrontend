import CookieBox from 'cookie-consent-box';

let  creatCookies=() =>{
  let   cookies=document.getElementById("cookies");
  let content={title:" accepter les conditions de notre site Corona Tracing",
  content:`<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Email
  </label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
<label class="form-check-label" for="defaultCheck1">
  nom
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
<label class="form-check-label" for="defaultCheck1">prenom</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    suivre vos action afin d'améliorer l'éxperience utilisateur
  </label>
  <p>vous avez la possibilité de  modifier vos données dans mon compte </p>
</div>
  <button  id ='refuser'  type='button'>refuser</button>`};

        cookies.style.position = "fixed";
  let cc= new CookieBox( { backgroundColor: 'rgba(20,20,20,0.8);',language:"fr",cookieKey:"UserCookie",cookieExpireInDays:1,content},cookies).init();
 if(document.getElementsByClassName("cookie-box__button")[0]) document.getElementsByClassName("cookie-box__button")[0].id="accept"
}


export default creatCookies;