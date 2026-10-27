const API_URL = 'http://localhost:8080/produtos';

// ===== Utilitários =====

// Mostra (ou esconde, se a mensagem for vazia) a caixa de erro
function mostrarErro(msg) {
    const el = document.getElementById('erroMensage');
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
}

// Lê o ID do formulário (sem espaços nas pontas)
function getId() {
    return document.getElementById('id').value.trim();
}

// Coleta os dados do formulário
function getProdutoFromForm() {
    const nome = document.getElementById('nome').value.trim();
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value;
    const status = document.getElementById('status').value;

    return {
        nome_produto: nome,
        preco: parseFloat(preco.replace(',', '.')),
        quantidade: parseInt(quantidade, 10),
        status
    };
}

// Confere se os campos do produto estão preenchidos corretamente
function formularioValido(produto) {
    if (!produto.nome_produto) {
        mostrarErro('Informe o nome do produto.');
        return false;
    }
    if (Number.isNaN(produto.preco) || Number.isNaN(produto.quantidade)) {
        mostrarErro('Informe um preço e uma quantidade válidos.');
        return false;
    }
    return true;
}

// ===== Operações da API =====

// Criar um produto novo
async function salvarProduto() {
    mostrarErro('');
    const produto = getProdutoFromForm();
    if (!formularioValido(produto)) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        limparCampos(); // limpa o formulário e recarrega a tabela
    } catch (error) {
        console.error('Erro ao enviar produto:', error);
        mostrarErro('Erro ao enviar produto.');
    }
}

// Atualizar o produto selecionado
async function atualizarProduto() {
    mostrarErro('');

    const id = getId();
    if (!id) {
        mostrarErro('Informe o ID (ou clique em uma linha da tabela).');
        return;
    }

    const produto = getProdutoFromForm();
    if (!formularioValido(produto)) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        limparCampos();
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        mostrarErro('Erro ao atualizar produto.');
    }
}

// Deletar o produto selecionado
async function deletarProduto() {
    mostrarErro('');

    const id = getId();
    if (!id) {
        mostrarErro('Informe o ID (ou clique em uma linha da tabela).');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        limparCampos();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        mostrarErro('Erro ao deletar produto.');
    }
}

// Consultar um produto pelo ID e mostrar só ele na tabela
async function consultarProduto() {
    mostrarErro('');

    const id = getId();
    if (!id) {
        mostrarErro('Informe o ID para consultar.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const produto = await response.json();
        produtosTabela([produto]);
    } catch (error) {
        console.error('Erro ao consultar produto:', error);
        mostrarErro('Produto não encontrado ou erro ao consultar.');
    }
}

// Buscar todos os produtos da API
async function chamarProdutos() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const lista = await response.json();
        produtosTabela(lista);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        mostrarErro('Erro ao buscar produtos.');
    }
}

// ===== Interface =====

// Limpa o formulário e recarrega a lista completa
function limparCampos() {
    ['id', 'nome', 'preco', 'quantidade'].forEach(campo => {
        document.getElementById(campo).value = '';
    });
    document.getElementById('status').selectedIndex = 0;
    mostrarErro('');
    chamarProdutos();
}
// Formata o preço no padrão brasileiro
function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Preenche a tabela com os produtos
function produtosTabela(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de preencher
    document.getElementById('totalProdutos').textContent = products.length;

    products.forEach(product => {
        const row = document.createElement('tr');

        // textContent evita que HTML digitado no nome seja executado (XSS)
        const valores = [
            product.id_produto,
            product.nome_produto,
            formatarPreco(product.preco),
            product.quantidade,
            product.status
        ];
        valores.forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            row.appendChild(td);
        });

        // Ao clicar na linha: marca a linha e preenche o formulário
        row.addEventListener('click', () => {
            document.querySelectorAll('#productTableBody tr.selecionada').forEach(tr => tr.classList.remove('selecionada'));
            row.classList.add('selecionada');

            document.getElementById('id').value = product.id_produto;
            document.getElementById('nome').value = product.nome_produto;
            document.getElementById('preco').value = Number(product.preco).toFixed(2).replace('.', ',');
            document.getElementById('quantidade').value = product.quantidade;
            document.getElementById('status').value = product.status;
        });

        tableBody.appendChild(row);
    });
}

// Busca os produtos ao carregar a página
window.onload = chamarProdutos;
