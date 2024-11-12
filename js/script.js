

class Pedido {
    constructor(id, produto, quantidade, status = 'Pendente') {
        this.id = id;
        this.produto = produto;
        this.quantidade = quantidade;
        this.status = status;
    }
}

class Restaurante {
    constructor() {
        this.pedidos = [];
        this.idAtual = 1;
    }

    adicionarPedido(produto, quantidade) {
        const pedido = new Pedido(this.idAtual++, produto, quantidade);
        this.pedidos.push(pedido);
        this.atualizarStorage();
        this.montarElementoProduto();
    }

    atualizarPedido(id, status) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        if(pedido) {
        pedido.status = status;
        this.atualizarStorage();
        this.montarElementoProduto();
        }
    }

    removerPedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if(index != -1) {
            this.pedidos.splice(index, 1);
            this.atualizarStorage();
            this.montarElementoProduto();
        }
    }

    atualizarStorage() {
        localStorage.setItem("@pedidos", JSON.stringify(this.pedidos));
    }

    buscarStorage() {

        const storagePedidos = localStorage.getItem("@pedidos");
        if(storagePedidos) {
        this.pedidos = JSON.parse(storagePedidos);
        this.montarElementoProduto();
        }
    }

    montarElementoProduto() {
    const listaPedidos = document.getElementById("lista-pedidos");
    listaPedidos.innerHTML= "";

    this.pedidos.forEach((pedido) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p><strong>ID:</strong> ${pedido.id}</p> 
            <p><strong>Produto:</strong> ${pedido.produto}</p>
            <p><strong>Quantidades:</strong> ${pedido.quantidade}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <div class="acoes-pedidos">
                <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id}, 'Em preparo')">Em preparo</button>
                <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id}, 'Finalizado')">Finalizado</button>
                <button class="btn-remover" onclick="removerPedido(${pedido.id})">Remover</button>
            </div>
        `;
        listaPedidos.appendChild(li);
        })
    }
}

const restaurante = new Restaurante();

function iniciarDados() {
    restaurante.buscarStorage();

    const lista = document.getElementById("lista-pedidos");
    this.montarElementoNaoExiste(lista);
}

function adicionarPedido() {
    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;


    if(produto && quantidade) {
    restaurante.adicionarPedido(produto, quantidade);
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";

    atualizarMensagem();

    } else {
        alert('Por favor, preencha todos os campos.')
    }
}

function atualizarStatus(id, status) {
    restaurante.atualizarPedido(id, status)
}

function removerPedido(id) {
    restaurante.removerPedido(id);
    this.atualizarMensagem();
}

function atualizarMensagem() {
    const lista = document.getElementById("lista-pedidos");
    let mensagemNaoExiste = document.getElementById("nao-existe");

    if(lista.children.length === 0) {
        this.montarElementoNaoExiste(lista);
    } else {
        if(mensagemNaoExiste) {
            mensagemNaoExiste.remove();
        }
    }
}

function montarElementoNaoExiste(lista) {
    let mensagemNaoExiste = document.getElementById("nao-existe");

    if (!mensagemNaoExiste && lista.children.length === 0) {
        const li = document.createElement("li");
        const mensagem = document.createElement("span");
        mensagem.id = "nao-existe";
        mensagem.textContent = "Não Existe Pedidos!";
        li.appendChild(mensagem);
        lista.appendChild(li);
    }
}

this.iniciarDados();