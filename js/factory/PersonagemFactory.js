import { Kyo } from '../personagens/kyo.js';
import { Inimigo } from '../personagens/inimigo.js';

export class PersonagemFactory {
    static criarPersonagem(tipo, elemento, player) {
        switch (tipo) {
            case 'kyo':
                return new Kyo(elemento);
            case 'inimigo':
                return new Inimigo(elemento, player);
            default:
                throw new Error('Tipo de personagem desconhecido');
        }
    }
}
