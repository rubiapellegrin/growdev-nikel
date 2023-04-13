///document.getElementById('linkConta').addEventListener('click', function( ){
//console.log('O usuario clicou no link');
//})

const myModal = new bootstrap.Modal("#registerModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkedLogged();

//criar conta
document.getElementById("createForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailCreateInput").value;
    const password = document.getElementById("passwordCreateInput").value;



    console.log(email, password);
    if (email.length < 5) {
        alert("Preencha o campo com email valido!");
        return;
    }
    if (password.length < 4) {
        alert("Preencha a senha com no minimo 4 digitos!");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []

    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});   //ok

function saveAccount(data) {
    //console.log(data);
    localStorage.setItem(data.login, JSON.stringify(data));
}  ///ok


//logar no sistema
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const checksessao = document.getElementById("sessionCheck").checked;

    //console.log(email, sessao);

    const account = getAccount(email);

    if (!account) {
        alert("Ops! Verifique o usuario ou a senha!");
        return;
    }
    if (account) {
        if (account.password !== password) {
            alert("Ops! Verifique o usuario ou a senha!");
            return;
        }

        saveSession(email, checksessao);

        window.location.href = "home.html";
    }
});  //ok


function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }
    return "";
}  //ok

function saveSession(data, safeSession) {
    if (safeSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}   ///ok


function checkedLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;

    }

    if (logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
} //ok