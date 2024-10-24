import { UserData } from "./data/UserData";

let handler_sub = async function(ev) {
    console.log(ev);
    ev.preventDefault();
    let form = ev.target.form;
    console.log(form);
    let data = new FormData(form);
    let email = data.get('email');
    console.log(email);
    let password = data.get('password');
    console.log(password);
    let ok = await UserData.signin(email, password);
    console.log(ok);
    if (ok) {
        window.location.href = 'index.html';
    }
    else {
        alert("Erreur lors de la connexion");
    }
}

let submit = document.querySelector('#Signin');
console.log(submit);
submit.addEventListener('click', handler_sub);
