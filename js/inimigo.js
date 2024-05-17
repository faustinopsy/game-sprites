export class Inimigo {
    constructor(elemento, player) {
        this.inimigo = elemento;
        this.player = player;
        this.visivel = true;
        this.vida = 100;
        this.intervaloAtaque = null;
        this.iniciarAtaquesAleatorios();
    }
    chamaInimigo(posicao) {
        if (this.visivel) {
            this.inimigo.style.display = 'block';
            this.inimigo.style.background = `url(./img/orochi-chris.png) ${posicao} -2970px`;
            this.visivel = true;
        }
    }
    receberDano(dano) {
        this.vida -= dano;
        console.log('Inimigo atingido, vida restante:', this.vida);
        const vidaPercent = (this.vida / 100) * 100;
        const barraVida = document.getElementById('vidainimigo');
        barraVida.style.width = vidaPercent + '%';
        if (this.vida <= 0) {
            console.log('Inimigo derrotado!');
            this.destruirInimigo();
        }
    }
    destruirInimigo() {
        this.inimigo.style.display = 'none';
        this.visivel = false;
        alert('Inimigo derrotado! Jogo encerrado.');
        location.reload();
    }
    empurrarInimigo() {
        let posicaoAtual = parseInt(this.inimigo.style.right || '0px', 10);
        const forcaDeEmpurrao = 50;
        this.inimigo.style.right = `${posicaoAtual + forcaDeEmpurrao}px`;
        const larguraDoJogo = document.getElementById('game').clientWidth;
        console.log(this.inimigo.style.right)
        if (this.posicaoAtual + forcaDeEmpurrao > larguraDoJogo - this.inimigo.clientWidth) {
            this.inimigo.style.right = `${larguraDoJogo - this.inimigo.clientWidth}px`;
        }
    }
    atacar() {
        console.log('Inimigo atacando!');
        this.inimigo.style.background = `url(./img/orochi-chris.png) -1005px -2970px`;
        this.inimigo.style.filter = 'invert(100%)';
        setTimeout(() => {
            this.atualizarOrientacao();
            this.inimigo.style.filter = 'none';
        }, 1000); 
    }
    iniciarAtaquesAleatorios() {
        const tempoMinimo = 2000; 
        const tempoMaximo = 5000; 
        this.intervaloAtaque = setInterval(() => {
            this.atacar();
        }, this.tempoAleatorio(tempoMinimo, tempoMaximo));
    }
    
    tempoAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    atualizarOrientacao() {
        const posicaoInimigo = this.inimigo.getBoundingClientRect().left;
        const posicaoPlayer = this.player.getBoundingClientRect().left;
        if (posicaoInimigo < posicaoPlayer) {
            this.inimigo.style.transform = 'scaleX(1) rotate(360deg) scale(1.3)'; 
        } else {
            this.inimigo.style.transform = 'scaleX(-1) rotate(360deg) scale(1.3)'; 
        }
    }
}
