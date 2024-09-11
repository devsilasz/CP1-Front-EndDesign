function obterProdutosDoHTML() {
    const produtosHTML = document.querySelectorAll('.col.mb-5');
    const produtos = [];

    produtosHTML.forEach(produto => {
        const nome = produto.querySelector('.fw-bolder').textContent;
        const preco = parseFloat(produto.dataset.preco);
        const tipo = produto.dataset.tipo;

        produtos.push({ nome, preco, tipo, element: produto });
    });

    return produtos;
}

function aplicarFiltros() {

    const precoSelecionado = document.querySelector('input[name="price"]:checked')?.value;
    const tiposSelecionados = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(el => el.value);

    let produtos = obterProdutosDoHTML();

    if (precoSelecionado) {
        produtos = produtos.filter(produto => {
            if (precoSelecionado === "0-50") return produto.preco >= 0 && produto.preco <= 50;
            if (precoSelecionado === "50-100") return produto.preco > 50 && produto.preco <= 100;
            if (precoSelecionado === "100-300") return produto.preco > 100 && produto.preco <= 300;
            if (precoSelecionado === "300+") return produto.preco > 300;
        });
    }

    if (tiposSelecionados.length > 0) {
        produtos = produtos.filter(produto => {
            const tiposProduto = produto.tipo.split(',').map(tipo => tipo.trim()); // Divide os tipos em uma lista
            return tiposSelecionados.some(tipoSelecionado => tiposProduto.includes(tipoSelecionado));
        });
    }

    atualizarProdutos(produtos);
}

function atualizarProdutos(produtosFiltrados) {
    const todosProdutos = document.querySelectorAll('.col.mb-5');

    todosProdutos.forEach(produto => {
        produto.style.display = 'none';
    });

    produtosFiltrados.forEach(produto => {
        produto.element.style.display = 'block';
    });
}

document.querySelector('.btn-primary').addEventListener('click', aplicarFiltros);

atualizarProdutos(obterProdutosDoHTML());
