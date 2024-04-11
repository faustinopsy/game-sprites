const container = document.createElement('div')
container.style.display='flex'
const kyo = document.querySelector('.kyo');
const frente = document.createElement('button');
frente.id = 'frente';
frente.style.backgroundColor = 'teal';
frente.textContent= ">>"
frente.style.width = '66px'
const tras = document.createElement('button');
frente.id = 'tras';
tras.style.backgroundColor = 'teal';
tras.style.width = '66px'
tras.textContent= "<<"

let valor=0;
tras.addEventListener('click', paraTras);
frente.addEventListener('click', paraFrente);

function paraFrente(){
  valor += 100;
  kyo.style.background = `url(kyo.png) 3px ${valor}px`
  console.log(valor)
}
function paraTras(){
  valor += -100;
  kyo.style.background = `url(kyo.png) 3px ${valor}px`
}



container.appendChild(tras)
container.appendChild(frente)
document.body.appendChild(container)