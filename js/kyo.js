export class Kyo {
    constructor(elemento) {
        this.kyo = elemento;
        this.posicaoX = 0;
        this.estaPulando = false;
        this.velocidadeVertical = 10;
        this.alturaMaxima = 150;
        this.direcaoPulo = -1;
        this.gravidade = -2;
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

            this.velocidadeVertical += this.gravidade;
            posicaoAtual += this.velocidadeVertical;
            this.kyo.style.bottom = `${posicaoAtual}px`;
            this.kyo.style.left = `${posicaoHorizontal}px`;

            if (posicaoAtual <= 0) {
                this.kyo.style.bottom = '0px';
                this.estaPulando = false;
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
        console.log(this.posicaoX)
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX}px -200px`;
        if (this.posicaoX <= -500) {
            this.posicaoX = 0;
        }
    }
    darSoco(intervaloAtual) {
        this.posicaoX += -99;
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX}px -300px`;
        this.kyo.style.left += `10px`;
        if (this.posicaoX <= -450) {
            this.parar(intervaloAtual)
        }
    }
    especialinicio(intervaloAtual) {
        this.posicaoX += -104;
        this.kyo.style.background = `url(../img/kyo.png) ${this.posicaoX }px -440px`;
        this.kyo.style.left += `5px`;
        if (this.posicaoX <= -550) {
            this.parar(intervaloAtual)
        }
    }
    
}
