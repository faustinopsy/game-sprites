import { Kyo } from './kyo.js';
import { Inimigo } from './inimigo.js';
import { Cenario } from './Cenario.js';
import { Menu } from './Menu.js';
import { init } from './loading.js';
import { Controles } from './controle.js';
import {MonitorarPerformance} from "./MonitorarPerformance.js";
import {RegistarSW} from "./RegistrarSw.js";
//https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
new MonitorarPerformance();
new RegistarSW();

const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');
const kyo = new Kyo(kyoElemento);
window.myKyo = kyo;
const inimigo = new Inimigo(inimigoElemento);
const cenario = new Cenario(cenarioElemento);
const controles = new Controles(document.querySelector('.controle'), kyo,inimigo, cenario,menu);



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





