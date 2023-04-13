///document.getElementById('linkConta').addEventListener('click', function( ){
//console.log('O usuario clicou no link');
//})

const myModal = new bootstrap.Modal("#registerModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkedLogged();

//logar no sistema
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const sessao = document.getElementById("sessionCheck").checked;


    const account = getAccount(email);

    if (!account) {
        alert("Ops! Verifiqueo usuario ou a senha!");
        return;
    }
    if (account) {
        if (account.password !== password) {
            alert("Ops! Verifiqueo usuario ou a senha!");
            return;
        }

        safeSession(email, sessao);

        window.location.href = "home.html";
    }
});



//criar conta
document.getElementById("createForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailCreateInput").value;
    const password = document.getElementById("passwordCreateInput").value;

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
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}

function getAccount() {
    const account = localStorage.getItem(account);

    if (account) {
        return JSON.parse(account);
    }
    return "";
}

function saveSession(data, safeSession) {
    if (safeSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}


function checkedLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;

    }

    if (logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }


}