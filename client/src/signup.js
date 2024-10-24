import {UserData} from './src/data/UserData.js';

let handler_submit = async function(ev) {
    ev.preventDefault();
    let form = ev.target.form;
    let data = new FormData(form);
    let password = data.get('password');
    let confimr_password = data.get('confirm_password');
    if (password != confimr_password) {
        alert('Les mots de passe ne sont pas identiques');
        return;
    }
    data.delete('confirm_password');
    let ok = await UserData.signup(data);
    if (ok) {
        window.location.href = 'signin.html';
    }
    else{
        alert("Erreur lors de l'inscription");
    }
}

let submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', handler_submit);