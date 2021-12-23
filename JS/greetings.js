/*
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginInput = loginForm.querySelector("button");
*/
const main = document.querySelector("main");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");


const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginOut(event){
    event.preventDefault;
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    main.classList.add(HIDDEN_CLASSNAME);
    localStorage.removeItem();
}

function onLoginOn(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    //greeting.innerText = "Hello " + username;
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`;
    main.classList.remove(HIDDEN_CLASSNAME);
}


const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginOn);
    //  show the form
    }  else{
        paintGreetings(savedUsername);
    //  show the greeting
    }
