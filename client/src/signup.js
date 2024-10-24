import { UserData } from './data/UserData.js';

let handler_submit = async function(ev) {
    ev.preventDefault();
    let form = ev.target.form;
    console.log(form);
    let data = new FormData(form);
    console.log(data);
    console.log(data.get('password'));
    let password = data.get('password');
    let confirm_password = data.get('confirm_password');
    if (password !== confirm_password) {
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

let submit = document.querySelector('#Signup'); 
console.log(submit)
submit.addEventListener('click', handler_submit);