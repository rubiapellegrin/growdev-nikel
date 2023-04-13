
const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
//ok

let data = {
    transactions: []
};

//ok

document.getElementById("buttonLogout").addEventListener("click", logout);

//ok


//adicionar lancamento
document.getElementById("transactionsForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("valorCreateInput").value);
    const descricao = document.getElementById("descricaoCreateInput").value;
    const date = document.getElementById("dataCreateInput").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, descricao: descricao, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento lancado com sucesso!");
}); //ok

checkedLogged();

function checkedLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;

    }

    if (!logged) {
        window.location.href = "home.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
} //ok

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}  //ok

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";
            if (item.type == "2") {
                type = "Saida";
            }
            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.descricao}</td>
            </tr>
            `
        })
    }
    document.getElementById("transactionList").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}  //ok