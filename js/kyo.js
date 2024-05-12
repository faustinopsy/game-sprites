export class Kyo {
    constructor(elemento) {
        this.kyo = elemento;
        this.posicaoX = 0;
        this.estaPulando = false;
        this.velocidadeVertical = 200;
        this.alturaMaxima = 150;
        this.direcaoPulo = -1;
        this.gravidade = 2;
        this.vida = 100;
    }
    pederFolego() {
        this.vida -= 30;
        const vidaPercent = (this.vida / 100) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
        if (this.vida <= 0) {
            console.log('sem folego!');
            
        }
    }
    pular(intervaloAtual) {
        if (!this.estaPulando) {
            this.estaPulando = true;
            this.velocidadeVertical = 20;
            this.direcaoPulo *= -1;
        }
         this.parar(intervaloAtual)
        
    }

    atualizaPosicao() {
        if (this.estaPulando) {
            let posicaoAtual = parseInt(this.kyo.style.bottom || '0px', 10);
            let posicaoHorizontal = parseInt(this.kyo.style.left || '0px', 10) + (10 * this.direcaoPulo);

            this.velocidadeVertical -= this.gravidade;
            posicaoAtual += this.velocidadeVertical;
            this.kyo.style.background = `url(../img/kyo.png) -120px -100px`;
            this.kyo.style.bottom = `${posicaoAtual}px`;
            this.kyo.style.left = `${posicaoHorizontal}px`;

            if (posicaoAtual <= 0) {
                this.kyo.style.bottom = '0px';
                this.estaPulando = false;
                this.parar(10)
            }
        }
    }
    parar(intervaloAtual) {
        this.posicaoX = 0;
        this.kyo.style.background = 'url(../img/kyo.png) -10px 0px';
        this.kyo.style.left -= `${10}px`;
        clearInterval(intervaloAtual);
    }
    correr() {
        this.posicaoX -= 100;
        //console.log(this.posicaoX)
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX}px -200px`;
        if (this.posicaoX <= -500) {
            this.posicaoX = 0;
        }
    }
    darSoco(intervaloAtual) {
        this.posicaoX += -99;
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX}px -300px`;
        this.kyo.style.left += `80px`;
        if (this.posicaoX <= -450) {
            this.parar(intervaloAtual)
        }
    }
    especialinicio(intervaloAtual) {
        if(this.vida <= 30){
            alert('sem folego')
            this.parar(intervaloAtual)
            return true
        }
        this.posicaoX += -104;
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX }px -440px`;
        if (this.posicaoX <= -550) {
            this.pederFolego()
            this.parar(intervaloAtual)
        }
    }
    
}
