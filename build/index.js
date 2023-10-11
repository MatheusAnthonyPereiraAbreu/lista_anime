"use strict";
let listElement = document.querySelector("#app ul");
let inputElementNome = document.querySelector("#nome");
let inputElementDescricao = document.querySelector("#descricao input");
let inputElementAutor = document.querySelector("#autor input");
let inputElementAno = document.querySelector("#ano input");
let buttonElementAdicionar = document.querySelector("#aciona");
let detalhesAnimeDiv = document.getElementById("detalhesAnime");
let form = document.querySelector("form");
let animesSalvos = localStorage.getItem("@listagem_animes");
let animes = animesSalvos !== null && JSON.parse(animesSalvos) || [];
function listarAnime() {
    animes.forEach((item, posicao) => {
        listElement.innerHTML = "";
        let todoElement = document.createElement("li");
        let animeText = document.createTextNode("span");
        animeText.textContent = `${item.nome}`;
        let linkElementDelete = document.createElement("button");
        let linkElementView = document.createElement("button");
        linkElementDelete.innerText = "Excluir";
        linkElementView.innerText = "Exibir";
        linkElementDelete.onclick = () => deletarAnime(posicao);
        linkElementView.onclick = () => mostrarAnime(posicao);
        linkElementDelete.style.marginLeft = "10px";
        linkElementView.style.marginLeft = "20px";
        todoElement.appendChild(animeText);
        todoElement.appendChild(linkElementDelete);
        todoElement.appendChild(linkElementView);
        listElement.appendChild(todoElement);
    });
}
function adicionarAnime() {
    console.log("entro");
    if (inputElementNome == null || inputElementNome.value === "" || inputElementAutor == null || inputElementAutor.value === "" || inputElementAno == null || inputElementAno.value === "" || inputElementDescricao == null || inputElementDescricao.value === "") {
        alert("Digite todas as informaões do anime!");
        console.log(inputElementNome.value);
        return;
    }
    let NomeAnime = inputElementNome.value;
    let AutorAnime = inputElementAutor.value;
    let DescricaoAnime = inputElementDescricao.value;
    let AnoAnime = inputElementAno.value;
    let novoAnime = { nome: NomeAnime, autor: AutorAnime, descricao: DescricaoAnime, ano: AnoAnime };
    animes.push(novoAnime);
    inputElementNome.value = " ";
    inputElementAutor.value = " ";
    inputElementDescricao.value = " ";
    inputElementAno.value = " ";
    listarAnime();
    salvarDados();
}
buttonElementAdicionar.onclick = adicionarAnime;
function deletarAnime(posicao) {
    animes.splice(posicao, 1);
    listarAnime();
    salvarDados();
}
function mostrarAnime(posicao) {
    detalhesAnimeDiv.innerHTML = ""; // Limpa qualquer conteúdo anterior
    const anime = animes[posicao];
    let NomeAnime = document.createElement("a");
    let AutorAnime = document.createElement("a");
    let DescricaoAnime = document.createElement("a");
    let AnoAnime = document.createElement("a");
    NomeAnime.textContent = anime.nome;
    AutorAnime.textContent = anime.autor;
    DescricaoAnime.textContent = anime.descricao;
    AnoAnime.textContent = anime.ano;
    detalhesAnimeDiv.appendChild(NomeAnime);
    detalhesAnimeDiv.appendChild(AutorAnime);
    detalhesAnimeDiv.appendChild(DescricaoAnime);
    detalhesAnimeDiv.appendChild(AnoAnime);
    detalhesAnimeDiv.style.display = "block";
}
function salvarDados() {
    localStorage.setItem("@listagem_animes", JSON.stringify(animes));
}
listarAnime();
