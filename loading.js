const container0 = document.querySelector(`#loading`);
const container3 = document.querySelector(`.pai-iori`);
const iori = document.querySelector(`.iori`);
iori.style.background = `url(iori.png) -270px 0px`;
let valor=0;
let  loop= null;
let string='';
let secret ='';
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
document.addEventListener ('keyup', (event) => {
  
  string +=event.key
  if(string.length >= 9){
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
  
});