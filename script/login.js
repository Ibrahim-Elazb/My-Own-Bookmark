const userNameInput=document.getElementById("user-name-input");
const passwordInput=document.getElementById("password-input");
const errorMsgEl=document.getElementById("error-msg");
const loginBtn=document.getElementById("login-btn");

(function initDB(){
    if(!localStorage.getItem("userDB"))
        localStorage.setItem("userDB",JSON.stringify([]))
})();

const checkIfInputEmpty=function(input){
    if(!input.value){
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }else{
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
}

//--------------------------  Check Empty On blur && input events of Input Element --------------------------------------//
userNameInput.addEventListener("blur",function(){
    checkIfInputEmpty(this);
});
userNameInput.addEventListener("input",function(){
    checkIfInputEmpty(this);
});

passwordInput.addEventListener("blur",function(){
    checkIfInputEmpty(this);
});

passwordInput.addEventListener("input",function(){
    checkIfInputEmpty(this);
});


loginBtn.addEventListener("click",function(event){
    event.preventDefault();
    if(checkIfInputEmpty(userNameInput)&&checkIfInputEmpty(passwordInput)){
        const usersList=JSON.parse(localStorage.getItem("userDB"));
        const user=usersList.find(item=>item.userName.toLowerCase()===userNameInput.value.trim().toLowerCase() && item.password===passwordInput.value.trim())
        sessionStorage.setItem("loginUser",JSON.stringify(user));
        setTimeout(() => {
            window.location="index.html";
        }, 1000);
    }

})