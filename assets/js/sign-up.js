let eyeIcon = document.getElementById("eyeIcon");
let password= document.getElementById("password");

eyeIcon.onclick=function(){
    if(password.type== "password"){
        password.type = "text";
        eyeIcon.src = "assets/imgs/sign-up/eye-opened-icon.svg"
    }else{
        password.type = "password";
        eyeIcon.src = "assets/imgs/sign-up/eye-closed-icon.svg"
    }
}


