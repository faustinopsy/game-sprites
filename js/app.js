import { Kyo } from './kyo.js';
import { Inimigo } from './inimigo.js';
import { Cenario } from './Cenario.js';
import { Menu } from './Menu.js';
import { init } from './loading.js';


const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');
const kyo = new Kyo(kyoElemento);
window.myKyo = kyo;
const inimigo = new Inimigo(inimigoElemento);
const cenario = new Cenario(cenarioElemento);

const container = document.querySelector('.controle')
const frente = document.createElement('button');
frente.id = 'frente';
frente.style.backgroundColor = 'teal';
frente.textContent= "parado"
frente.style.width = '66px'
const tras = document.createElement('button');
frente.id = 'tras';
tras.style.backgroundColor = 'teal';
tras.style.width = '66px'
tras.textContent= "corre"

const soco = document.createElement('button');
soco.id = 'tras';
soco.style.backgroundColor = 'teal';
soco.style.width = '66px'
soco.textContent= "soco"
const pula = document.createElement('button');
pula.id = 'tras';
pula.style.backgroundColor = 'teal';
pula.style.width = '66px'
pula.textContent= "pular"
container.appendChild(frente)
container.appendChild(tras)
container.appendChild(soco)
container.appendChild(pula)



let intervaloAtual = null;
let intervaloAtualcenario= null;
let string='';

init();
const tempoBase = 200;
document.addEventListener('keypress', (event) => {
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);

    let intervaloTempo = tempoBase / window.myKyo.velocidadeVertical;
    switch (event.key) {
        case 'w':
            intervaloAtual = setInterval(() => kyo.pular(intervaloAtual), 200); 
            break;
        case 'a':
            intervaloAtual = setInterval(() => kyo.correr(), tempoBase);
            intervaloAtualcenario = setInterval(() => cenario.atualizaCenario(kyo.posicaoX), tempoBase);
            break;
        case 'd':
            kyo.parar(intervaloAtual); 
            cenario.pararCenario(intervaloAtualcenario);
            break;
        case 's':
            intervaloAtual = setInterval(() => kyo.darSoco(intervaloAtual), tempoBase); 
            verificaColisao(true);
            break;
            case 'x':
            intervaloAtual = setInterval(() => kyo.especialinicio(intervaloAtual), tempoBase);
            verificaColisao(true);
            break;
        default:
            intervaloAtual = setInterval(() => kyo.correr(), tempoBase);
            break;
    }
});

  document.addEventListener ('keyup', (event) => {
    string +=event.key
    console.log(string)
    if(string.length >= 9){
      switch(string){
        case 'dev-Enter':
          kyo.parar(intervaloAtual)
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
        kyo.direcaoPulo=-1
      }
      function virarEsquerda(){
        kyo.kyo.classList.remove('virar')
        cenario.posicao=2
        kyo.direcaoPulo=1
      }
  });

 
  frente.addEventListener('click', function(){
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);
    kyo.parar(intervaloAtual); 
    cenario.pararCenario(intervaloAtualcenario);
  });
  soco.addEventListener('click', function(){
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);
    intervaloAtual = setInterval(() => kyo.darSoco(intervaloAtual), tempoBase); 
    verificaColisao(true);
  });
  pula.addEventListener('click', function(){
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);
    intervaloAtual = setInterval(() => kyo.pular(intervaloAtual), 200);
  });
  tras.addEventListener('click', function(){
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);
    intervaloAtual = setInterval(() => kyo.correr(), tempoBase);
    intervaloAtualcenario = setInterval(() => cenario.atualizaCenario(kyo.posicaoX), tempoBase);
  });

function verificaColisao(soco = false) {
    let kyoRect = kyo.kyo.getBoundingClientRect();
    let inimigoRect = inimigo.inimigo.getBoundingClientRect();
    // console.log(kyoRect)
    // console.log(inimigoRect)
    const tolerancia = 1;
    if (kyoRect.right > inimigoRect.left + tolerancia &&
        kyoRect.left < inimigoRect.right - tolerancia &&
        kyoRect.bottom > inimigoRect.top + tolerancia &&
        kyoRect.top < inimigoRect.bottom - tolerancia) {
        if (soco) {
            console.log('Kyo acertou o soco no inimigo!');
            inimigoElemento.style.backgroundColor = 'red';
            inimigo.receberDano(10);
        }
    }
}

setInterval(() => {
    kyo.atualizaPosicao();
    
}, 50);
const posicao =[
  '10px','-50px','-105px' ,'-169px', '-230px',
  '-300px','-370px','-430px','-510px'
]
let numero=0
  setInterval(() => {
    inimigo.chamaInimigo(posicao[numero]);
    numero +=1
    if(numero >= posicao.length){
      numero=0
    }
 }, 150);



