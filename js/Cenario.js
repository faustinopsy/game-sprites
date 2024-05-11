export class Cenario {
    constructor(elemento) {
        this.cenario = elemento;
    }

    atualizaCenario(posicaoX) {
        this.cenario.style.background = `url(../img/cenario.jpg) ${posicaoX - 50}px 160px`;
        if (posicaoX <= -500) {
            posicaoX = 0;
        }
    }
    pararCenario(intervaloAtual) {
        clearInterval(intervaloAtual);
    }
}
