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
                <details>
                <summary id="opcao">Opções</summary>
                <div>
                    <label for="velocidadeVertical">Velocidade Vertical: <span id="velocidadeValor">200</span></label>
                    <input type="range" id="velocidadeVertical" min="-20" max="2000" value="20">
                </div>
                <div>
                    <label for="gravidade">Gravidade: <span id="gravidadeValor">2</span></label>
                    <input type="range" id="gravidade" min="1" max="10" value="2">
            </div>
                </details>
            </div>
        `;
        this.container.innerHTML = menuHtml;
    }

    afterRender() {
        const iniciaopcaoBotao = this.container.querySelector('#inicia-game');
        const opcaoBotao = this.container.querySelector('#opcao');
        const velocidadeSlider = this.container.querySelector('#velocidadeVertical');
        const gravidadeSlider = this.container.querySelector('#gravidade');

        iniciaopcaoBotao.addEventListener('click', () => {
            this.iniciaJogo();
        });

        opcaoBotao.addEventListener('click', () => {
            this.mostrOpcoes();
        });

        velocidadeSlider.addEventListener('input', (e) => {
            document.getElementById('velocidadeValor').textContent = e.target.value;
            window.myKyo.velocidadeVertical = parseInt(e.target.value, 10);
        });

        gravidadeSlider.addEventListener('input', (e) => {
            document.getElementById('gravidadeValor').textContent = e.target.value;
            window.myKyo.gravidade = parseInt(e.target.value, 10);
        });
    }

    iniciaJogo() {
        console.log('Iniciando o jogo...');
        this.container.innerHTML = ''; 
    }

    mostrOpcoes() {
        console.log('Mostrando opções...');
        console.log(myKyo)
    }
}
