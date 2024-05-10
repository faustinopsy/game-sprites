import {init,iorix} from './loading.js';


init()


const container = document.querySelector('.controle')
const kyo = document.querySelector('.kyo');



let valor=0;
let loopsoco;
let looppulo;
let loopcorre;
let string='';
let secret ='';
document.addEventListener ('keypress', (event) => {
  const keyName = event.key;
  switch(keyName){
    case 'w':  looppulo = setInterval(pular, 300);
    break;
    case 'a':  loopcorre = setInterval(correr, 300);
    break;
    case 'd':  parar;
    break;
    case 's':  loopsoco = setInterval(darSoco, 300);
    break;
  }
});
document.addEventListener ('keyup', (event) => {
  
  string +=event.key
  if(string.length>=9){
    if(string==='dev-Enter'){
      secret = string.split('-');
      
      iorix()
      string=''
      secret=''
    }else if(string==='zero-Enter'){
      init()
    }
    else{
      string=''
      secret=''
    }
  }
  console.log(string)
  
  // switch(keyName){
  //   case 'w':  looppulo = setInterval(pular, 300);
  //   break;
  //   case 'a':  loopcorre = setInterval(correr, 300);
  //   break;
  //   case 'd':  parar;
  //   break;
  //   case 's':  loopsoco = setInterval(darSoco, 300);
  //   break;
  // }
});


function parar(){
  valor=0
  kyo.style.background = `url(kyo.png) -10px 0px`
}
function correr(){
  valor -= 100;
  kyo.style.background = `url(kyo.png) ${valor}px -200px`
  if(valor <= -500){
    console.log(valor)
    parar()
    clearInterval(loopcorre);
  }
}
function pular(){
  valor+=-100;
  kyo.style.background = `url(kyo.png) ${valor}px -100px`;
  if(valor <= -500){
    clearInterval(looppulo);
    parar()
  }
}
function darSoco(){
  valor+=-100;
    kyo.style.background = `url(kyo.png) ${valor}px -300px`
    if(valor <= -500){
      clearInterval(loopsoco);
      parar()
    }
}

function criarElemento(elem,id,back,larg,bordRa,text){
const elemento = document.createElement(elem);
elemento.id = id;
elemento.className= id
//elemento.style.backgroundColor = back;
elemento.style.width = larg
elemento.style.borderRadius= bordRa
elemento.textContent= text
elemento.style.cursor ='pointer'

return elemento 
}


document.body.appendChild(container)
