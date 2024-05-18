class Pilha {
    constructor() {
        this._dados = [];
    }

    push(registro) {
        this._dados.push(registro);
    }

    pop() {
        return this._dados.pop();
    }

    isEmpty() {
        return this._dados.length === 0;
    }
}

module.exports = Pilha;


