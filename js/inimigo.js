export class Inimigo {
    constructor(elemento) {
        this.inimigo = elemento;
        this.visivel = true;
        this.vida = 100; 
    }

    chamaInimigo(posicao) {
        if(this.visivel ){
            this.inimigo.style.display = 'block';
            this.inimigo.style.background = `url(../img/orochi-chris.png) ${posicao} -2970px`;
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
        location.reload()
    }
}
