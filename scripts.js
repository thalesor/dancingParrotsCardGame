//LIsta de dados que armazena os passaros, como objetos
const passaros = 
[
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

//Função que faz o jogo iniciar.
function Iniciar()
{
    do {
          numDeCartas = parseInt(prompt('Com quantas cartas quer jogar? (Somente pares de 4 a 14)'));
    }
    while(!arrayPares.includes(numDeCartas));
    paresRestantes = numDeCartas/2;
    escolhidos = passaros.sort(comparador).slice(0,paresRestantes);
    container = document.querySelector("section > .container");
    baralho = container.querySelector("ul");
    baralho.innerHTML = '';
    container.className = '';
    container.classList.add(`pair-of-${paresRestantes}`);
    baralho.insertAdjacentHTML("afterbegin", distribuirCartas(escolhidos.sort(comparador)));
    baralho.insertAdjacentHTML("afterbegin", distribuirCartas(escolhidos.sort(comparador)));
}

function selecionar(item) 
  {
    if(!item.classList.contains('completed'))
    {
      jogadas++;
      let cartasSelecionadas = document.querySelectorAll(".card.selected:not(.completed)");
      if(cartasSelecionadas.length < 2)
      item.classList.add('selected');
      cartasSelecionadas = document.querySelectorAll(".card.selected:not(.completed)");
      if(cartasSelecionadas.length >= 2)
      {
          let card1 = cartasSelecionadas[0];
          let card2 = cartasSelecionadas[1];
        
          if(card1.dataset.identificador != card2.dataset.identificador)
          {
            setTimeout(function(){
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            },1000);
          }
          else if(card1.dataset.identificador === card2.dataset.identificador)
          { 
            card1.classList.add('completed');
            card2.classList.add('completed');
            paresRestantes--;
            if(paresRestantes === 0)
            {
              alert("virou todos os pares");
            }
            
          }  
        }
    }
  }
 

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
  return Math.random() - 0.5; 
}

// Função que distrubui as cartas(preenche a lista ul com seus respectivos li)
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





Iniciar();