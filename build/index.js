"use strict";
let listElement = document.getElementById("lista");
let inputElementNome = document.getElementById("nome");
let inputElementDescricao = document.getElementById("descricao");
let inputElementAutor = document.getElementById("autor");
let inputElementAno = document.getElementById("ano");
let buttonElementAdicionar = document.getElementById("aciona");
let detalhesAnimeDiv = document.getElementById("detalhesAnime");
let animesSalvos = localStorage.getItem("@listagem_animes");
let animes = animesSalvos !== null && JSON.parse(animesSalvos) || [];
function deletarAnime(posicao) {
    animes.splice(posicao, 1);
    detalhesAnimeDiv.innerHTML = "";
    listarAnime();
    salvarDados();
}
function listarAnime() {
    listElement.innerHTML = "";
    animes.map((item, posicao) => {
        let todoElement = document.createElement("li");
        let animeText = document.createTextNode(item.nome);
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
    if (inputElementNome.value.length <= 0 || inputElementDescricao.value.length <= 0 || inputElementAutor.value.length <= 0 || inputElementAno.value.length <= 0) {
        alert("Digite todas as informaões do anime!");
        return;
    }
    let NomeAnime = inputElementNome.value;
    let AutorAnime = inputElementAutor.value;
    let DescricaoAnime = inputElementDescricao.value;
    let AnoAnime = inputElementAno.value;
    let novoAnime = { nome: NomeAnime, autor: AutorAnime, descricao: DescricaoAnime, ano: AnoAnime };
    animes.push(novoAnime);
    inputElementNome.value = "";
    inputElementAutor.value = "";
    inputElementDescricao.value = "";
    inputElementAno.value = "";
    listarAnime();
    salvarDados();
}
buttonElementAdicionar.onclick = adicionarAnime;
function mostrarAnime(posicao) {
    detalhesAnimeDiv.innerHTML = ""; // Limpa qualquer conteúdo anterior
    const anime = animes[posicao];
    let NomeAnime = document.createElement("li");
    let AutorAnime = document.createElement("li");
    let DescricaoAnime = document.createElement("li");
    let AnoAnime = document.createElement("li");
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
