export class Personagem {
    constructor(elemento) {
        this.elemento = elemento;
        this.vida = 100;
    }

    perderVida(dano) {
        this.vida -= dano;
        this.atualizarBarraDeVida();
        if (this.vida <= 0) {
            this.morrer();
        }
    }

    atualizarBarraDeVida() {
        throw new Error('Método atualizarBarraDeVida() deve ser implementado');
    }

    morrer() {
        throw new Error('Método morrer() deve ser implementado');
    }
}
