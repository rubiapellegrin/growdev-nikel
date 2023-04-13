

const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
//ok

let data = {
    transactions: []
};  //ok


document.getElementById("buttonLogout").addEventListener("click", logout);
document.getElementById("transactionsButton").addEventListener("click", function () {
    window.location.href = "transactions.html"
}); //ok

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

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento lancado com sucesso!");
});  //ok


checkedLogged();

function checkedLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;

    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
} //ok

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}  //ok

function getCashIn() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = '';
        let limit = 0;


        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cashInList").innerHTML = cashInHtml;
    }
} //ok

function getCashOut() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === "2");

    if (cashIn.length) {
        let cashInHtml = '';
        let limit = 0;


        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
        <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cashOutList").innerHTML = cashInHtml;
    }
}  //ok


function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$  ${total.toFixed(2)}`;
}   //ok

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}  ///ok