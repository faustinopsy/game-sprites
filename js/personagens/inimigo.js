import { Personagem } from '../factory/Personagem.js';

export class Inimigo extends Personagem {
    constructor(elemento, player) {
        super(elemento);
        this.player = player;
        this.visivel = true;
        this.intervaloAtaque = null;
        this.iniciarAtaquesAleatorios();
    }

    chamaInimigo(posicao) {
        if (this.visivel) {
            this.elemento.style.display = 'block';
            this.elemento.style.background = `url(./img/orochi-chris.png) ${posicao} -2970px`;
            this.visivel = true;
        }
    }

    receberDano(dano) {
        this.perderVida(dano);
        console.log('Inimigo atingido, vida restante:', this.vida);
        if (this.vida <= 0) {
            console.log('Inimigo derrotado!');
            this.destruirInimigo();
        }
    }

    destruirInimigo() {
        this.elemento.style.display = 'none';
        this.visivel = false;
        alert('Inimigo derrotado! Jogo encerrado.');
        location.reload();
    }

    empurrarInimigo() {
        let posicaoAtual = parseInt(this.elemento.style.right || '0px', 10);
        const forcaDeEmpurrao = 50;
        this.elemento.style.right = `${posicaoAtual + forcaDeEmpurrao}px`;
        const larguraDoJogo = document.getElementById('game').clientWidth;
        if (posicaoAtual + forcaDeEmpurrao > larguraDoJogo - this.elemento.clientWidth) {
            this.elemento.style.right = `${larguraDoJogo - this.elemento.clientWidth}px`;
        }
    }

    atacar() {
        console.log('Inimigo atacando!');
        this.elemento.style.background = `url(./img/orochi-chris.png) -1005px -2970px`;
        this.elemento.style.filter = 'invert(100%)';
        setTimeout(() => {
            this.atualizarOrientacao();
            this.elemento.style.filter = 'none';
        }, 1000); 
    }

    iniciarAtaquesAleatorios() {
        const tempoMinimo = 2000; 
        const tempoMaximo = 10000; 
        this.intervaloAtaque = setInterval(() => {
            this.atacar();
        }, this.tempoAleatorio(tempoMinimo, tempoMaximo));
    }

    tempoAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    atualizarOrientacao() {
        const posicaoInimigo = this.elemento.getBoundingClientRect().left;
        const posicaoPlayer = this.player.getBoundingClientRect().left;
        if (posicaoInimigo < posicaoPlayer) {
            this.elemento.style.transform = 'scaleX(1) rotate(360deg) scale(1.3)'; 
        } else {
            this.elemento.style.transform = 'scaleX(-1) rotate(360deg) scale(1.3)'; 
        }
    }

    atualizarBarraDeVida() {
        const vidaPercent = (this.vida / 100) * 100;
        const barraVida = document.getElementById('vidainimigo');
        barraVida.style.width = vidaPercent + '%';
    }

    morrer() {
        console.log('Inimigo derrotado!');
        this.destruirInimigo();
    }
}