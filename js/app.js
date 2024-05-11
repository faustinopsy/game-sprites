import { Kyo } from './Kyo.js';
import { Inimigo } from './Inimigo.js';
import { Cenario } from './Cenario.js';
import { Menu } from './Menu.js';
import { init } from './loading.js';

init();

const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
menu.init();

const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');

const kyo = new Kyo(kyoElemento);
const inimigo = new Inimigo(inimigoElemento);
const cenario = new Cenario(cenarioElemento);
let intervaloAtual = null;
let intervaloAtualcenario= null;
document.addEventListener('keypress', (event) => {
    if (intervaloAtual) {
        clearInterval(intervaloAtual);
    }
    if (intervaloAtualcenario) {
        clearInterval(intervaloAtualcenario);
    }
    switch (event.key) {
        case 'w':
            intervaloAtual = setInterval(() => kyo.pular(intervaloAtual), 200); 
            break;
        case 'a':
            intervaloAtual = setInterval(() => kyo.correr(), 200);
            intervaloAtualcenario = setInterval(() => cenario.atualizaCenario(kyo.posicaoX), 200);
            break;
        case 'd':
            kyo.parar(intervaloAtual); 
            cenario.pararCenario(intervaloAtualcenario);
            break;
        case 's':
            intervaloAtual = setInterval(() => kyo.darSoco(intervaloAtual), 200); 
            verificaColisao(true);
            break;
        default:
            intervaloAtual = setInterval(() => kyo.correr(), 200);
            break;
    }
});

function verificaColisao(soco = false) {
    let kyoRect = kyo.kyo.getBoundingClientRect();
    let inimigoRect = inimigo.inimigo.getBoundingClientRect();

    const tolerancia = 31;
    if (kyoRect.right > inimigoRect.left + tolerancia &&
        kyoRect.left < inimigoRect.right - tolerancia &&
        kyoRect.bottom > inimigoRect.top + tolerancia &&
        kyoRect.top < inimigoRect.bottom - tolerancia) {
        if (soco) {
            console.log('Kyo acertou o soco no inimigo!');
            inimigoElemento.style.backgroundColor = 'red';
            setTimeout(() => inimigo.destruirInimigo(), 500);
        }
    }
}

setInterval(() => {
    kyo.atualizaPosicao();
    
}, 50);

setInterval(() => {
    inimigo.chamaInimigo();
}, Math.random() * (5000 - 2000) + 2000);

function removeBackgroundColor(imageElement, backgroundColor) {
    // Verifica se a imagem já está carregada
    if (!imageElement.complete || imageElement.naturalWidth === 0) {
        // Adiciona um event listener para carregar a imagem
        imageElement.onload = function() {
            processImage(imageElement, backgroundColor);
        };
    } else {
        // Se a imagem já está carregada, processa imediatamente
        processImage(imageElement, backgroundColor);
    }
}

function processImage(imageElement, backgroundColor) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    ctx.drawImage(imageElement, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] === backgroundColor.r && data[i + 1] === backgroundColor.g && data[i + 2] === backgroundColor.b) {
            data[i + 3] = 0;  // Torna o pixel totalmente transparente
        }
    }

    ctx.putImageData(imageData, 0, 0);
    imageElement.src = canvas.toDataURL();
}

// Supondo que o seu elemento de imagem já exista no HTML
const imageElement = document.querySelector('.sprite');
removeBackgroundColor(imageElement, {r: 252, g: 51, b: 168});


