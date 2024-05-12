export class Cenario {
    constructor(elemento) {
        this.cenario = elemento;
        this.posicao = 2
    }

    atualizaCenario(posicaoX) {
        posicaoX = this.posicao== 1 ? posicaoX : Math.abs(posicaoX);
        this.cenario.style.background = `url(../img/cenario.jpg) ${posicaoX - 50}px 340px`;
        if (posicaoX <= -500 || posicaoX >= 500) {
            posicaoX = 0;
        }
       
    }
    pararCenario(intervaloAtual) {
        clearInterval(intervaloAtual);
    }
}
