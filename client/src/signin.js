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
    
    if (ok) {
        localStorage.setItem('user', JSON.stringify(ok));
        let temp = JSON.parse(localStorage.getItem('user'));
        let dataClient = { role: temp.role };
        if (dataClient.role === 'client') {
            window.close();
        }
        else if (dataClient.role === 'admin') {
            window.open('../backoffice/index.html', '_blank');
        }
        
    }
    else {
        alert("Erreur lors de la connexion");
    }
}

let submit = document.querySelector('#Signin');
console.log(submit);
submit.addEventListener('click', handler_sub);
