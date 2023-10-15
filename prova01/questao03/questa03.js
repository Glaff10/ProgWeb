/* Código não funcional */
/* Nota: 0.8 */

var Venda = {
    id,
    quantidade,
    preco,
    construtor: (id, quantidade, preco_un) => {
        this.id = id;
        this.quantidade = quantidade;
        this.preco_un = preco_un;
    },
    set_id: (valor) => {
        this.id = valor;
    },
    set_quantidade: (valor) => {
        this.quantidade = valor;
    },
    set_preco: (valor) => {
        this.preco = valor;
    },
    get_id: () => {
        return this.id;
    },
    get_quantidade: (valor) => {
        return this.quantidade;
    },
    get_preco: (valor) => {
        return this.preco;
    },
    getValorTotal: () => {
        return this.preco * this.quantidade;
    }
}

var venda = Venda(0, 5, 20);
var sale = Venda(1, 2, 50);

console.log(venda.getValorTotal());
console.log(sale.getValorTotal());