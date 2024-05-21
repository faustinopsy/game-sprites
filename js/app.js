import { PersonagemFactory } from './factory/PersonagemFactory.js';
import { Menu } from './menu/Menu.js';
import { init } from './menu/loading.js';
import { Controles } from './menu/controle.js';
import { Cenario } from './cenario/Cenario.js';
import { MonitorarPerformance } from "./MonitorarPerformance.js";
import { RegistarSW } from "./RegistrarSw.js";

new MonitorarPerformance();
new RegistarSW();

const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');

const kyo = PersonagemFactory.criarPersonagem('kyo', kyoElemento);
const inimigo = PersonagemFactory.criarPersonagem('inimigo', inimigoElemento, kyoElemento);
const cenario = new Cenario(cenarioElemento);
const controles = new Controles(document.querySelector('.controle'), kyo, inimigo, cenario, menu);
window.myKyo = kyo;



init();

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
 }, 2000);





