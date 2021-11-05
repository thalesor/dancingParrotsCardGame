//LIsta de dados que armazena os passaros, como objetos
const passaros = [
  {
    id: 0,
    identificador: "bobrossparrot",
    imagem: "resources/bobrossparrot.gif"
  },
  {
    id: 1,
    identificador: "explodyparrot",
    imagem: "resources/explodyparrot.gif"
  },
  {
    id: 2,
    identificador: "fiestaparrot",
    imagem: "resources/fiestaparrot.gif"
  },
  {
    id: 3,
    identificador: "metalparrot",
    imagem: "resources/metalparrot.gif"
  },
  {
    id: 4,
    identificador: "revertitparrot",
    imagem: "resources/revertitparrot.gif"
  },
  {
    id: 5,
    identificador: "tripletsparrot",
    imagem: "resources/tripletsparrot.gif"
  },
  {
    id: 6,
    identificador: "unicornparrot",
    imagem: "resources/unicornparrot.gif"
  }
];

//Iniciando as variáveis globais que serão acessadas nas funções.
let arrayPares = [4, 6, 8, 10, 12, 14];
let jogadas = 0;
let numDeCartas = null;
let paresRestantes = null;
let container = null;
let baralho = null;
let escolhidos = null;

let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let updateClock = false;
let h1 = document.querySelector("h1");
//Função que faz o jogo iniciar.
function Iniciar() {
  h1.innerHTML = "PARROT CARD GAME";
  h1.classList.remove('rainbow');
  updateClock = true;
  clockReset();
  do {
    numDeCartas = parseInt(
      prompt("Com quantas cartas quer jogar? (Somente pares de 4 a 14)")
    );
  } while (!arrayPares.includes(numDeCartas));
  paresRestantes = numDeCartas / 2;
  escolhidos = passaros.sort(comparador).slice(0, paresRestantes);
  container = document.querySelector("section #container");
  console.log(container);
  baralho = container.querySelector("ul");
  baralho.innerHTML = "";
  container.className = "";
  jogadas = 0;
  container.classList.add(`pair-of-${paresRestantes}`);
  baralho.insertAdjacentHTML(
    "afterbegin",
    distribuirCartas(escolhidos.sort(comparador))
  );
  baralho.insertAdjacentHTML(
    "afterbegin",
    distribuirCartas(escolhidos.sort(comparador))
  );
  clockStart();
}

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() {
  return Math.random() - 0.5;
}

function selecionar(item) {
  if (!item.classList.contains("completed")) {
    let cartasSelecionadas = document.querySelectorAll(
      ".card.selected:not(.completed)"
    );
    if (cartasSelecionadas.length < 2)
    {
      item.classList.add("selected");
      if(item != cartasSelecionadas[0])
      jogadas++;
    } 
    item.classList.add("selected");
    cartasSelecionadas = document.querySelectorAll(
      ".card.selected:not(.completed)"
    );
    if (cartasSelecionadas.length >= 2) {
      let card1 = cartasSelecionadas[0];
      let card2 = cartasSelecionadas[1];

      if (card1.dataset.identificador != card2.dataset.identificador) {
        setTimeout(function () {
          card1.classList.remove("selected");
          card2.classList.remove("selected");
        }, 1000);
      } else if (card1.dataset.identificador === card2.dataset.identificador) {
        card1.classList.add("completed");
        card2.classList.add("completed");
        paresRestantes--;
        if (paresRestantes === 0) {
          updateClock = false;
            h1.classList.add('rainbow');
            h1.innerHTML = "Você venceu!!!";
          setTimeout(function () {
            let repeat = prompt(`Parabéns! Voce ganhou em ${jogadas} jogadas, levou cerca de ${millisToMinutesAndSeconds(elapsedTime)}.
                Deseja jogar de novo? 
                1- para sim
                2- para não
                `);
            if (repeat === "1") {
              Iniciar();
            }
          }, 1000);
        }
      }
    }
  }
}

function distribuirCartas(lista) {
  let html;

  html = lista
    .map((item) => {
      return ` 
        <li class="card" onClick="selecionar(this)" data-identificador="${item.identificador}">
      <div class="front-face face">
        <img src="resources/front.png" alt="">
      </div>
      <div class="back-face face">
        <img src="${item.imagem}" alt="">
      </div>
    </li>
         `;
    })
    .join("");

  return html;
}

// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

//Essa função foi sugerida em uma thread no StackOverFlow, ela é muito interessante pois converte milisegundos em segundos e minutos.
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  let response = '';
  if(minutes > 0)
  response += `${minutes} minuto(s) e ${seconds} segundos`;
  else
  response = `${seconds} segundos`;
  return response;
}

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function clockStart() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    if (updateClock) elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
}

function clockReset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
}

Iniciar();
