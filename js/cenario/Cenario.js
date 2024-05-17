export class Cenario {
    constructor(elemento) {
        this.cenario = elemento;
        this.posicao = 2
        this.contadorChamadas = 0; 
        this.posicoesVerticais = [0, 170, 340, 510, 680, 850]; 
        this.indicePosicaoVertical = 0;
    }

    atualizaCenario(posicaoX) {
        posicaoX = this.posicao === 1 ? posicaoX : Math.abs(posicaoX);
        this.contadorChamadas += (this.posicao === 1 ? 1 : -1);
        let passos = Math.abs(this.contadorChamadas);
        let novaPosicaoVertical = this.posicoesVerticais.find((pos, index) => 
            passos >= pos && passos < (this.posicoesVerticais[index + 1] || Infinity)
        );

        this.cenario.style.background = `url(./img/cenario.jpg) ${posicaoX - 50}px ${novaPosicaoVertical}px`;
        if (posicaoX <= -500 || posicaoX >= 500) {
            posicaoX = 0;
        }
        console.log(`Passos: ${passos}, Posição Vertical: ${novaPosicaoVertical}`);
    }

    pararCenario(intervaloAtual) {
        clearInterval(intervaloAtual);
        this.contadorChamadas = 0;
    }
}
