const container0 = document.querySelector(`#container-0`);
const container3 = document.querySelector(`.container-3`);
const iori = document.querySelector(`.iori`);
iori.style.background = `url(iori.png) -270px 0px`;
let valor=0;
let  loop= null;
export function init(){
  loop = setInterval(mudar, 600);
}

export function iorix(){
  container0.style.display = 'block';
  container3.style.display = 'block';
  iori.style.background = `url(iori.png) -270px -270px`;
}

function mudar(){
  valor+=270;
  iori.style.background = `url(iori.png) -270px -${valor}px`
    if(valor >= 1200){
    clearInterval(loop);
    iori.style.background = `url(iori.png) -270px -270px`
    container0.style.display = 'none'
    container3.style.display = 'none'
    }
}
