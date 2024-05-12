import { Kyo } from './Kyo.js';
import { Inimigo } from './Inimigo.js';
import { Cenario } from './Cenario.js';
import { Menu } from './Menu.js';
import { init } from './loading.js';


const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');
const kyo = new Kyo(kyoElemento);
const inimigo = new Inimigo(inimigoElemento);
const cenario = new Cenario(cenarioElemento);

let intervaloAtual = null;
let intervaloAtualcenario= null;
let string='';

init();
menu.init();

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
            case 'x':
            intervaloAtual = setInterval(() => kyo.especialinicio(intervaloAtual), 150);
            verificaColisao(true);
            break;
        default:
            intervaloAtual = setInterval(() => kyo.correr(), 200);
            break;
    }
});

  document.addEventListener ('keyup', (event) => {
    string +=event.key
    console.log(string)
    if(string.length >= 9){
      switch(string){
        case 'dev-Enter':
          menu.init()
        break;
        case 'zero-Enter':
          init()
        break;
        case 'ArrowRight' :
          virarDireita()
        break;
        case 'ArrowLeft' :
          virarEsquerda()
        break;
      }
      string=''
    }
    function virarDireita(){
        kyo.kyo.classList.add('virar')
        cenario.posicao=1
      }
      function virarEsquerda(){
        kyo.kyo.classList.remove('virar')
        cenario.posicao=2
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

