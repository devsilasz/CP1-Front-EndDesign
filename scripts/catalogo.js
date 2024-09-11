// Função para obter os produtos do HTML
function obterProdutosDoHTML() {
    const produtosHTML = document.querySelectorAll('.col.mb-5'); // Seleciona todos os produtos no HTML
    const produtos = [];

    produtosHTML.forEach(produto => {
        const nome = produto.querySelector('.fw-bolder').textContent;  // Obtém o nome do produto
        const preco = parseFloat(produto.dataset.preco);  // Obtém o preço do data attribute
        const tipo = produto.dataset.tipo;  // Obtém o tipo do data attribute

        // Cria o objeto produto e o adiciona à lista
        produtos.push({ nome, preco, tipo, element: produto });
    });

    return produtos;
}

// Função para aplicar os filtros
function aplicarFiltros() {
    // Captura os valores selecionados nos filtros
    const precoSelecionado = document.querySelector('input[name="price"]:checked')?.value;
    const tiposSelecionados = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(el => el.value);
    
    // Obtém os produtos reais do HTML
    let produtos = obterProdutosDoHTML();
    
    // Filtra os produtos com base no preço
    if (precoSelecionado) {
        produtos = produtos.filter(produto => {
            if (precoSelecionado === "0-50") return produto.preco >= 0 && produto.preco <= 50;
            if (precoSelecionado === "50-100") return produto.preco > 50 && produto.preco <= 100;
            if (precoSelecionado === "100-300") return produto.preco > 100 && produto.preco <= 300;
            if (precoSelecionado === "300+") return produto.preco > 300;
        });
    }

    // Filtra os produtos com base no tipo
    if (tiposSelecionados.length > 0) {
        produtos = produtos.filter(produto => {
            const tiposProduto = produto.tipo.split(',').map(tipo => tipo.trim()); // Divide os tipos em uma lista
            return tiposSelecionados.some(tipoSelecionado => tiposProduto.includes(tipoSelecionado)); 
        });
    }

    // Atualiza a exibição dos produtos
    atualizarProdutos(produtos);
}

// Função para atualizar os produtos na interface
function atualizarProdutos(produtosFiltrados) {
    const todosProdutos = document.querySelectorAll('.col.mb-5');

    todosProdutos.forEach(produto => {
        produto.style.display = 'none'; // Esconde todos os produtos inicialmente
    });

    produtosFiltrados.forEach(produto => {
        produto.element.style.display = 'block'; // Mostra apenas os produtos filtrados
    });

    // Ajusta a altura da imagem se houver apenas um produto
    if (produtosFiltrados.length === 1) {
        produtosFiltrados[0].element.querySelector('.card-img-top').style.height = 'auto';
    } else {
        produtosFiltrados.forEach(produto => {
            produto.element.querySelector('.card-img-top').style.height = '11.5rem';
        });
    }
}

// Adiciona um evento ao botão de aplicar filtros
document.querySelector('.btn-primary').addEventListener('click', aplicarFiltros);

// Exibe todos os produtos ao carregar a página
atualizarProdutos(obterProdutosDoHTML());
