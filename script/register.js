// const form=document.getElementById("form-container");
const firstNameInput=document.getElementById("first-name-input");
const lastNameInput=document.getElementById("last-name-input");
const userNameInput=document.getElementById("user-name-input");
const passwordInput=document.getElementById("password-input");
const cfmPasswordInput=document.getElementById("confirm-password-input");
const emailInput=document.getElementById("email-input");
const mobileInput=document.getElementById("mobile-input");
const registerBtn=document.getElementById("Register-btn");


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

const checkInputValidity=function(inputEl,validExpCheck,emptyErrorMSg,inValidExpMsg){
    if(inputEl.value){
        if(validExpCheck()){
            inputEl.classList.add("is-valid");
            inputEl.classList.remove("is-invalid");
            return true;
        }else{
            inputEl.nextElementSibling.innerText=inValidExpMsg;
            inputEl.classList.remove("is-valid");
            inputEl.classList.add("is-invalid");
            return false;
        }
    }else{
        inputEl.nextElementSibling.innerText=emptyErrorMSg;
        inputEl.classList.remove("is-valid");
        inputEl.classList.add("is-invalid");
        return false;
    }
}

//--------------------------  Check Validation With Regular Expressions --------------------------------------//
const clearInputs=function(){
const inputElList=document.querySelectorAll("input");
inputElList.forEach(inputEl=>{
    inputEl.value="";
    inputEl.classList.remove("is-valid");
    inputEl.classList.remove("is-invalid");
})
}

const checkUserNameValid=function(){
    let alreadyExist=false;
    const usersDB=localStorage.getItem("userDB")?JSON.parse(localStorage.getItem("userDB")):[];
    for (let index = 0; index < usersDB.length; index++) {
        if(userNameInput.value.toLowerCase() === usersDB[index].userName.toLowerCase()){
            alreadyExist=true;
            break;
        }
    }
    return !alreadyExist;
}

const checkPasswordValid=function(){
    //Password should at least contains 1 number, 1 special character, 1 small character, 1 Capital character and at least 8
    const passwordValidExp=/^(?=.*\d)(?=.*[!@#$%^&*\?])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordValidExp.test(passwordInput.value);
}

const checkpasswordMatch=function(){
    return (passwordInput.value===cfmPasswordInput.value)
}

const checkEmailValid=function(){
    const emailValidExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return emailValidExp.test(emailInput.value);
}

const checkMobileValid=function(){
    const mobileValidExp=/^(01)[0-9]{9}$/;
    return mobileValidExp.test(mobileInput.value);
}

//--------------------------  Check Validation On blur && input events of Input Element --------------------------------------//
// First Name input Validation
firstNameInput.addEventListener("blur",function(){
    checkIfInputEmpty(this);
});
firstNameInput.addEventListener("input",function(){
    checkIfInputEmpty(this);
});

// Last Name input Validation
lastNameInput.addEventListener("blur",function(){
    checkIfInputEmpty(this);
});
lastNameInput.addEventListener("input",function(){
    checkIfInputEmpty(this);
});

// User Name input Validation
userNameInput.addEventListener("blur",function(){
    checkInputValidity(userNameInput,checkUserNameValid,"You Should Enter User Name","Already Exist");
})
userNameInput.addEventListener("input",function(){
    checkInputValidity(userNameInput,checkUserNameValid,"You Should Enter User Name","Already Exist");
})

// Password input Validation
passwordInput.addEventListener("blur",function(){
    checkInputValidity(passwordInput,checkPasswordValid,"You Should Enter Password","At least 8 contains a number, a special character (!@#$%^&*?), a small character, a Capital character");
})
passwordInput.addEventListener("input",function(){
    checkInputValidity(passwordInput,checkPasswordValid,"You Should Enter Password","At least 8 contains a number, a special character (!@#$%^&*?), a small character, a Capital character");
})

// Confirm Password input Validation
cfmPasswordInput.addEventListener("blur",function(){
    checkInputValidity(cfmPasswordInput,checkpasswordMatch,"You Should Enter Password Confirm","Password is not matched Yet");
})
cfmPasswordInput.addEventListener("input",function(){
    checkInputValidity(cfmPasswordInput,checkpasswordMatch,"You Should Enter Password Confirm","Password is not matched Yet");
})

// Email input Validation
emailInput.addEventListener("blur",function(){
    checkInputValidity(emailInput,checkEmailValid,"You Should Enter your Email","Not Valid Email");
})
emailInput.addEventListener("input",function(){
    checkInputValidity(emailInput,checkEmailValid,"You Should Enter your Email","Not Valid Email");
})

// Mobile input Validation
mobileInput.addEventListener("blur",function(){
    checkInputValidity(mobileInput,checkMobileValid,"You Should Enter your Mobile Number","Not Valid Egyptian Number starts with 01 and 11 number");
})
mobileInput.addEventListener("input",function(){
    checkInputValidity(mobileInput,checkMobileValid,"You Should Enter your Mobile Number","Not Valid Egyptian Number starts with 01 and 11 number");
})

clearInputs();

const addUserinBookmarkDB=function(userName){
    let BookmarksDB=localStorage.getItem("BookmarksDB")?JSON.parse(localStorage.getItem("BookmarksDB")):[];
    const user={
        userName:userName,
        userBookmarkList:[]
    }
    BookmarksDB.push(user);
    localStorage.setItem("BookmarksDB",JSON.stringify(BookmarksDB));
}


registerBtn.addEventListener("click",function(event){
    event.preventDefault();

    const firstNameValid=checkIfInputEmpty(firstNameInput);
    const lastNameValid=checkIfInputEmpty(lastNameInput);
    const userNameValid=checkInputValidity(userNameInput,checkUserNameValid,"You Should Enter User Name","Already Exist");
    const passwordValid=checkInputValidity(passwordInput,checkPasswordValid,"You Should Enter Password","At least 8 contains a number, a special character (!@#$%^&*?), a small character, a Capital character");
    const cfmPasswordValid=checkInputValidity(cfmPasswordInput,checkpasswordMatch,"You Should Enter Password Confirm","Password is not matched Yet");
    const emailValid=checkInputValidity(emailInput,checkEmailValid,"You Should Enter your Email","Not Valid Email");
    const mobileValid=checkInputValidity(mobileInput,checkMobileValid,"You Should Enter your Mobile Number","Not Valid Egyptian Number starts with 01 and 11 number");

    const genderChoiceEl = document.querySelector( `input[name="gender"]:checked`);

    if(firstNameValid &&
        lastNameValid &&
        userNameValid &&
        passwordValid &&
        cfmPasswordValid &&
        emailValid &&
        mobileValid
    ){// Create New user
        const newUser={
            firstName:firstNameInput.value.trim(),
            lastName:lastNameInput.value.trim(),
            userName:userNameInput.value.trim(),
            password:passwordInput.value.trim(),
            email:emailInput.value.trim(),
            mobile:mobileInput.value.trim(),
            gender:genderChoiceEl.value
        }
        const usersList=JSON.parse(localStorage.getItem("userDB"));
        usersList.push(newUser);
        localStorage.setItem("userDB",JSON.stringify(usersList))
        addUserinBookmarkDB(newUser.userName);
        clearInputs();
        setTimeout(() => {
            window.location="login.html";
        }, 100);
    }
})