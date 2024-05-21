import { Personagem } from '../factory/Personagem.js';

export class Kyo extends Personagem {
    constructor(elemento) {
        super(elemento);
        this.posicaoX = 0;
        this.estaPulando = false;
        this.velocidadeVertical = 200;
        this.alturaMaxima = 150;
        this.direcaoPulo = 1;
        this.gravidade = 2;
        this.vidaMaxima = 100;
        this.vida = 1000;
    }

    perderFolego(origem, intervaloAtual) {
        this.vida -= origem === 1 ? 30 : 2;
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
        if (this.vida <= 0) {
            alert('sem fôlego');
            this.parar(intervaloAtual);
            return true;
        }
    }

    ganharVida() {
        this.vida = Math.min(this.vida + 2, this.vidaMaxima); 
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
    }

    pular(intervaloAtual) {
        if (!this.estaPulando) {
            this.estaPulando = true;
            this.velocidadeVertical = 20;
            this.direcaoPulo *= -1;
        }
        this.parar(intervaloAtual);
    }

    atualizaPosicao() {
        if (this.estaPulando) {
            let posicaoAtual = parseInt(this.elemento.style.bottom || '0px', 10);
            let posicaoHorizontal = parseInt(this.elemento.style.left || '0px', 10) + (10 * this.direcaoPulo);
            this.velocidadeVertical -= this.gravidade;
            posicaoAtual += this.velocidadeVertical;
            this.elemento.style.background = `url(./img/kyo.png) -120px -100px`;
            this.elemento.style.bottom = `${posicaoAtual}px`;
            this.elemento.style.left = `${posicaoHorizontal}px`;
            if (posicaoAtual <= 0) {
                this.elemento.style.bottom = '0px';
                this.estaPulando = false;
                this.parar(10);
            }
        }
    }

    parar(intervaloAtual) {
        this.posicaoX = 0;
        this.elemento.style.background = 'url(./img/kyo.png) -30px 0px';
        this.ganharVida();
        clearInterval(intervaloAtual);
    }

    correr(intervaloAtual) {
        const larguraCenario = document.getElementsByClassName('cenario')[0].clientWidth;
        let posicaoHorizontal = parseInt(this.elemento.style.left || '0px', 10);

        posicaoHorizontal -= 60 * this.direcaoPulo;

        if (posicaoHorizontal < -340) {
            posicaoHorizontal = -340;
        } 
        if (posicaoHorizontal > larguraCenario - 340) {
            posicaoHorizontal = larguraCenario - 340;
        }
        // else if (posicaoHorizontal > larguraCenario - this.elemento.clientWidth) {
        //     posicaoHorizontal =  this.elemento.clientWidth;
        // }

        this.elemento.style.left = `${posicaoHorizontal}px`;
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -200px`;

        this.posicaoX -= 100;
        if (this.posicaoX <= -500) {
            this.posicaoX = 0;
        }

        //this.perderFolego(2, intervaloAtual);

        if (this.vida <= 0) {
            this.parar(intervaloAtual);
        }
    }

    darSoco(intervaloAtual) {
        this.posicaoX += -99;
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -300px`;
        if (this.posicaoX <= -450) {
            this.parar(intervaloAtual);
        }
    }

    especialinicio(intervaloAtual) {
        if (this.vida <= 30) {
            alert('sem fôlego');
            this.parar(intervaloAtual);
            return true;
        }
        this.posicaoX += -104;
        this.elemento.style.background = `url(./img/kyo.png) ${this.posicaoX}px -440px`;
        if (this.posicaoX <= -550) {
            this.perderFolego(1, intervaloAtual);
            this.parar(intervaloAtual);
        }
    }

    atualizarBarraDeVida() {
        const vidaPercent = (this.vida / this.vidaMaxima) * 100;
        const barraVida = document.getElementById('vidakyo');
        barraVida.style.width = vidaPercent + '%';
    }

    morrer() {
        alert('sem fôlego');
        this.parar(intervaloAtual);
    }
}
