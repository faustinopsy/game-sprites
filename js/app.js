import { init } from './loading.js';

init();

const kyo = document.querySelector('.kyo');
const inimigo = document.querySelector('.inimigo');
const cenario = document.querySelector('.cenario');
let posicaoX = 50;
let estaPulando = false;
let velocidadeVertical = 10;
let alturaMaxima = 150;
let direcaoPulo = -1;
let gravidade = -10;
let intervaloAtual;
intervaloAtual = setInterval(correr, 200);
setInterval(atualizaPosicao, 50);
setInterval(chamaInimigo, Math.random() * (5000 - 2000) + 2000);
setInterval(verificaColisao, 200);


document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (intervaloAtual) {
        clearInterval(intervaloAtual);
    }
    switch (keyName) {
        case 'w':
            intervaloAtual = setInterval(pular, 200);
            break;
        case 'a':
            intervaloAtual = setInterval(correr, 200);
            break;
        case 'd':
            parar();
            break;
        case 's':
            intervaloAtual = setInterval(darSoco, 200);
            break;
    }
});

function parar() {
    posicaoX = 0;
    kyo.style.background = 'url(../img/kyo.png) -10px 0px';
    kyo.style.left -= `${10}px`;
    clearInterval(intervaloAtual);
}

function correr() {
    posicaoX -= 100;
    kyo.style.background = `url(../img/kyo.png) ${posicaoX}px -200px`;
    cenarioAtual()
    if (posicaoX <= -500) {
        posicaoX = 0;
    }
}
function cenarioAtual() {
  cenario.style.background = `url(../img/cenario.jpg) ${posicaoX - 50}px 160px`;
  if (posicaoX <= -500) {
      posicaoX = 0;
  }
}
function pular() {
    if (!estaPulando) {
        estaPulando = true;
        velocidadeVertical = 20;
        direcaoPulo *= -1;
        parar();
    }
}

function atualizaPosicao() {
    if (estaPulando) {
        let posicaoAtual = parseInt(kyo.style.bottom || '0px', 10);
        let posicaoHorizontal = parseInt(kyo.style.left || '0px', 10) + (10 * direcaoPulo);

        velocidadeVertical += gravidade;
        posicaoAtual += velocidadeVertical;
        kyo.style.bottom = `${posicaoAtual}px`;
        kyo.style.left = `${posicaoHorizontal}px`;

        if (posicaoAtual <= 0) {
            kyo.style.bottom = '0px';
            estaPulando = false;
            intervaloAtual = setInterval(correr, 200);
        }
    }
}



function darSoco() {
    posicaoX += -99;
    kyo.style.background = `url(../img/kyo.png) ${posicaoX}px -300px`;
    kyo.style.left += `${10}px`;
    if (posicaoX <= -450) {
        parar();
    }
    verificaColisao(true);
}


let inimigoVisivel = false;

function chamaInimigo() {
    if (inimigoVisivel) {
        inimigo.style.display = 'none';
        inimigoVisivel = false;
    } else {
      inimigo.style.backgroundColor = 'transparent';
        inimigo.style.display = 'block';
        inimigoVisivel = true;
    }
}



function verificaColisao(soco = false) {
  let kyoRect = kyo.getBoundingClientRect();
  let inimigoRect = inimigo.getBoundingClientRect();
  
  const tolerancia = 31; 
  if (kyoRect.right > inimigoRect.left + tolerancia &&
      kyoRect.left < inimigoRect.right - tolerancia &&
      kyoRect.bottom > inimigoRect.top + tolerancia &&
      kyoRect.top < inimigoRect.bottom - tolerancia) {
      // console.log('Kyo:', kyoRect);
      // console.log('Inimigo:', inimigoRect);
    if (soco) {
      console.log('Kyo acertou o soco no inimigo!');
      inimigo.style.backgroundColor = 'red';
      setTimeout(destruirInimigo, 500);
    }
  }
}



function destruirInimigo() {
    
    inimigo.style.display = 'none'
    inimigoVisivel = false;
}


