const container = document.querySelector('.controle')
const kyo = document.querySelector('.kyo');
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

let valor=0;
let loopsoco;
let looppulo;

soco.addEventListener('click', function(){
  loopsoco = setInterval(darSoco, 300);
});
pula.addEventListener('click', function(){
  looppulo = setInterval(pular, 300);
});
tras.addEventListener('click', function(){
  loopcorre = setInterval(correr, 200);
});
frente.addEventListener('click', parar);

function parar(){
  valor=0
  kyo.style.background = `url(kyo.png) -10px 0px`
}
function correr(){
  valor -= 100;
  kyo.style.background = `url(kyo.png) ${valor}px -200px`
  if(valor <= -500){
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



container.appendChild(tras)
container.appendChild(frente)
container.appendChild(soco)
container.appendChild(pula)
document.body.appendChild(container)