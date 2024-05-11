export class Inimigo {
    constructor(elemento) {
        this.inimigo = elemento;
        this.visivel = false;
    }

    chamaInimigo() {
        if (this.visivel) {
            this.inimigo.style.display = 'none';
            this.visivel = false;
        } else {
            this.inimigo.style.display = 'block';
            this.visivel = true;
        }
    }

    destruirInimigo() {
        this.inimigo.style.backgroundColor = 'transparent';
        this.inimigo.style.display = 'none';
        this.visivel = false;
    }
}
