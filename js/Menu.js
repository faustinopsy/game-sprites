export class Menu {
    constructor(container) {
        this.container = container; 
    }

    init() {
        this.render();
        this.afterRender();
    }

    render() {
        this.container.innerHTML = '';

        const menuHtml = `
            <div class="menu">
                <h1>Bem-vindo ao Jogo!</h1>
                <button id="inicia-game">Iniciar Jogo</button>
                <button id="options">Opções</button>
            </div>
        `;
        this.container.innerHTML = menuHtml;
    }

    afterRender() {
        const iniciaButton = this.container.querySelector('#inicia-game');
        const optionsButton = this.container.querySelector('#options');

        iniciaButton.addEventListener('click', () => {
            this.iniciaJogo();
        });

        optionsButton.addEventListener('click', () => {
            this.mostrOpcoes();
        });
    }

    iniciaJogo() {
        console.log('Iniciando o jogo...');
        this.container.innerHTML = ''; 
    }

    mostrOpcoes() {
        console.log('Mostrando opções...');
    }
}
