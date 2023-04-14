const nome = "Marcelo";  //nao muda
let nom = "ru";  //pode mudar
nom = "pedro";

console.log(nome);

let pessoa = {    //cria objeto
    nome: 'rubia',
    idade: '27',
    trabalho: 'desem'
}

let nomes = ["marcelo", "maria"];
let pessoas = [
    {    //cria objeto
        nome: 'rubia',
        idade: '27',
        trabalho: 'desem'
    },
    {    //cria objeto
        nome: 'maria',
        idade: '27',
        trabalho: 'desem'
    }

]; //lista de objetos

let listaVazia = [];

console.log(nomes);
console.log(nomes[0]);
console.log(pessoas);

altera();

console.log("=", nom);

function altera() {   ///sem parametro
    nom = "paulo";
}

recebeAltera("rubiaaaaa");  //chamada da funcao

function recebeAltera(nome) {   //com parametro
    nom = nome;
}

console.log(pessoa);

imprimPessoa(pessoa);

function imprimPessoa(pess) {

    console.log("Nome:");
    console.log(pess.nome);
}

imprimPessoa({
    nome: 'olair',
    idade: '27',
    trabalho: 'desem'
})

function addPessoa(pes) {
    pessoas.push(pes);
}

function imprimPessoas() {
    pessoas.forEach((item) => {
        console.log('Nome: ', item.nome);
        console.log('item: ', item);
    })
}

addPessoa({
    nome: 'nedi',
    idade: '61',
    trabalho: 'prof'
});


imprimPessoas();