
const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};


document.getElementById("buttonLogout").addEventListener("click", logout);


//adicionar lancamento
document.getElementById("transactionsForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("valorCreateInput").value);
    const descricao = document.getElementById("descricaoCreateInput").value;
    const date = document.getElementById("dateCreateInput").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, descricao: descricao, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hiden();


    getTransactions();
    alert("Lançamento lancado com sucesso!");
});
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
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    windows.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    const transactionsHtml = ``;

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
}