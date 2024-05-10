import { init } from './loading.js';

init();

const kyo = document.querySelector('.kyo');
const cenario = document.querySelector('.cenario');
let posicaoX = 50;
let estaPulando = false;
let velocidadeVertical = 0;
let alturaMaxima = 150;
let direcaoPulo = -1;
let gravidade = -3;
let intervaloAtual;
intervaloAtual = setInterval(correr, 200);

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
    kyo.style.background = 'url(kyo.png) -10px 0px';
    clearInterval(intervaloAtual);
}

function correr() {
    posicaoX -= 100;
    kyo.style.background = `url(kyo.png) ${posicaoX}px -200px`;
    cenario.style.background = `url(cenario.jpg) ${posicaoX - 50}px -100px`;
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

setInterval(atualizaPosicao, 50);

function darSoco() {
    posicaoX += -99;
    kyo.style.background = `url(kyo.png) ${posicaoX}px -300px`;
    if (posicaoX <= -450) {
        parar();
    }
    verificaColisao(true);
}

let inimigo = document.querySelector('.inimigo');
let inimigoVisivel = false;

function chamaInimigo() {
    if (inimigoVisivel) {
        inimigo.style.display = 'none';
        inimigoVisivel = false;
    } else {
        inimigo.style.left = `${120}px`;
        inimigo.style.display = 'block';
        inimigoVisivel = true;
    }
}

setInterval(chamaInimigo, Math.random() * (5000 - 2000) + 2000);

function verificaColisao(soco = false) {
    let kyoRect = kyo.getBoundingClientRect();
    let inimigoRect = inimigo.getBoundingClientRect();
    if (kyoRect.x < inimigoRect.x + inimigoRect.width &&
        kyoRect.x + kyoRect.width > inimigoRect.x &&
        kyoRect.y < inimigoRect.y + inimigoRect.height &&
        kyoRect.height + kyoRect.y > inimigoRect.y) {
        if (soco) {
            console.log('Kyo acertou o soco no inimigo!');
            setTimeout(() => {
                destruirInimigo();
            }, 500);
        }
    }
}

function destruirInimigo() {
    inimigo.style.display = 'none';
    inimigoVisivel = false;
}

setInterval(verificaColisao, 200);
