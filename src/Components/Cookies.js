import CookieBox from 'cookie-consent-box';

let  creatCookies=() =>{
    
  let   cookies=document.getElementById("cookies");
        cookies.style.position = "fixed";
 let   cc= new CookieBox( { backgroundColor: 'rgba(20,20,20,0.8);',language:"fr",cookieKey:"UserCookie",cookieExpireInDays:1},cookies).init();
    
}
export default creatCookies;