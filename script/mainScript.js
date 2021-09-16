const userNameContainer=document.getElementById("username-container");
const SignOutBtn=document.getElementById("sign-out-btn");
const bookmarkUrlInput=document.getElementById("bookmark-url");
const bookmarkNameInput=document.getElementById("bookmark-name");
const addBookmarkBtn=document.getElementById("add-bookmark");
const confirmUpdateBtn=document.getElementById("confirm-update");
const clrInputsBtn=document.getElementById("clr-inputs");
const bookmarkContrentEl=document.getElementById("bookmark-content");

let BookmarksDB=localStorage.getItem("BookmarksDB")?JSON.parse(localStorage.getItem("BookmarksDB")):[];
let loggedUser="";

let updateIndex=0;

function getUserBKList(userName){
    return BookmarksDB.find(item=>item.userName===userName).userBookmarkList;
}

//--------------------------  Show User Bookmarks in table  --------------------------------------//
const displayBookmarkUI=function(userBookmarkList){
    let bookmarkHTMLContent=``;
    for (let index = 0; index < userBookmarkList.length ; index++) {
        const element = userBookmarkList[index];
        bookmarkHTMLContent+=`<tr id=${index+1}>
        <th scope="row">${index+1}</th>
        <td>
        ${element.bookmarkName}
        </td>
        <td>
            <a class="text-decoration-none text-break" href=${element.bookmarkURL}>
            ${element.bookmarkURL}
            </a>
        </td>
        <td>
            <button class="btn update-btn bg-info">Update</button>
        </td>
        <td>
            <button class="btn delete-btn bg-danger">Delete</button>
        </td>
    </tr>`
    }
    bookmarkContrentEl.innerHTML=bookmarkHTMLContent;
}

//--------------------------  Save to LocalStorage  --------------------------------------//
const updateBookmarksDB=function(){
    localStorage.setItem("BookmarksDB",JSON.stringify(BookmarksDB));
}

//--------------------------  Check If user has Logged in  --------------------------------------//
function isLoggedIn(){
    console.log(sessionStorage.getItem("loginUser"));
    if(sessionStorage.getItem("loginUser"))return true
    else return false;
}

//--------------------------  Check Validation  --------------------------------------//
function checkUrlRegEx(url){
    const regexCheck=/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
    return regexCheck.test(url);
}

const checkBKmarkURLValid=function(){
        if(!checkUrlRegEx(bookmarkUrlInput.value)){
            bookmarkUrlInput.classList.remove("is-valid");
            bookmarkUrlInput.classList.add("is-invalid");
            return false;
        }else{
            bookmarkUrlInput.classList.remove("is-invalid");
            bookmarkUrlInput.classList.add("is-valid");
            return true;
        }
}

const checkBKmarkNameValid=function(){
    if(!bookmarkNameInput.value){
        bookmarkNameInput.classList.remove("is-valid");
        bookmarkNameInput.classList.add("is-invalid");
        return false;
    }else{
        bookmarkNameInput.classList.remove("is-invalid");
        bookmarkNameInput.classList.add("is-valid");
        return true;
    }
}

bookmarkUrlInput.addEventListener("blur",checkBKmarkURLValid);
bookmarkUrlInput.addEventListener("input",checkBKmarkURLValid);

bookmarkNameInput.addEventListener("blur",checkBKmarkNameValid);
bookmarkNameInput.addEventListener("input",checkBKmarkNameValid);


//-------------------------------  Clear Inputs ---------------------------------------//
const clearInput=function(){
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    bookmarkNameInput.value="";
    bookmarkUrlInput.classList.remove("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    bookmarkUrlInput.value="";
}

clrInputsBtn.addEventListener("click",function(event){
    event.preventDefault();
    clearInput();
});

//-----------------------------  Add new Bookmark -------------------------------------//
addBookmarkBtn.addEventListener("click",function(event){
    event.preventDefault();
    if(checkBKmarkNameValid() && checkBKmarkURLValid()){
        const bookmarkObj={
            bookmarkName:bookmarkNameInput.value,
            bookmarkURL:bookmarkUrlInput.value
        }
        const user=JSON.parse(sessionStorage.getItem("loginUser"))
        const userBookmarkList=getUserBKList(user.userName)
        userBookmarkList.push(bookmarkObj);
        console.log(BookmarksDB);
        updateBookmarksDB();
        displayBookmarkUI(userBookmarkList);
        clearInput();
    }
})

//------------------------  Bookmark update and delete --------------------------------//
bookmarkContrentEl.addEventListener("click",function(event){
    if(event.target.classList.contains("update-btn")){
        const rowId=event.target.closest("tr").id;
        updateIndex=parseInt(rowId)-1;
        console.log(loggedUser.userName);
        bookmarkNameInput.value=getUserBKList(loggedUser.userName)[updateIndex].bookmarkName;
        bookmarkUrlInput.value=getUserBKList(loggedUser.userName)[updateIndex].bookmarkURL;
        confirmUpdateBtn.classList.remove("d-none");
        addBookmarkBtn.classList.add("d-none");


    }else if(event.target.classList.contains("delete-btn")){
        const rowId=event.target.closest("tr");
        getUserBKList(loggedUser.userName).splice(parseInt(rowId.id)-1, 1);
        // bookmarkContrentEl.removeChild(rowId);
        displayBookmarkUI(getUserBKList(loggedUser.userName));
        updateBookmarksDB();
    }
})

//------------------------  Confirm Bookmark update --------------------------------//
confirmUpdateBtn.addEventListener("click",function(event){
    event.preventDefault();
    const userBKList=getUserBKList(loggedUser.userName);
    userBKList[updateIndex].bookmarkName=bookmarkNameInput.value;
    userBKList[updateIndex].bookmarkURL=bookmarkUrlInput.value;
    displayBookmarkUI(userBKList);
    updateBookmarksDB();
    confirmUpdateBtn.classList.add("d-none");
    addBookmarkBtn.classList.remove("d-none");
    clearInput()
})

SignOutBtn.addEventListener("click",function(){
    sessionStorage.clear();
    setTimeout(() => {
        window.location="login.html";
    }, 1000);
})

//------------------------  During Window onload --------------------------------//
function init(){
    if(isLoggedIn()){
        console.log("isLoggedIn");
        loggedUser=JSON.parse(sessionStorage.getItem("loginUser"));
        userNameContainer.innerText=loggedUser.userName;
        displayBookmarkUI(getUserBKList(loggedUser.userName));
        clearInput();
    }else{
        setTimeout(() => {
            window.location="login.html";
        }, 1000);
    }
}

window.onload=init();


