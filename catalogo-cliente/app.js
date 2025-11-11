// $(document).ready() garante que o código só será executado quando o DOM estiver totalmente carregado, sendo uma função do jQuery.
// Assim, evitamos erros ao tentar manipular elementos que ainda não existem na página.
// Apenas depois que o DOM estiver pronto é que podemos interagir com os elementos HTML.
$(document).ready(function() {

    // --------------------------------------
    // -- Função 1: Carregar a lista de produtos
    // --------------------------------------

    function carregarProdutos() {
        // Usa AJAX para fazer uma requisição GET ao servidor para obter a lista de produtos, sendo uma função assíncrona do jQuery, que realiza requisições HTTP sem recarregar a página.
        $.ajax({
            url: 'http://localhost:8080/api/produtos', // Url do endpoint da API que retorna a lista de produtos.
            method: 'GET', // Método HTTP usado para a requisição.
            // Se a requisição for bem-sucedida, a função de callback 'success' é executada.
            success: function(data) {
                // Limpa o container de produtos antes de adicionar os novos itens.
                // Itera sobre os dados recebidos (lista de produtos) e adiciona cada produto ao container na página.
                // Cada produto é exibido com seu nome e preço formatado.

                // 1º passo: limpar o container de produtos antes de adicionar os novos itens, para evitar duplicações.
                $('#container-produtos').empty();

                // 2º passo: iterar sobre os dados recebidos (lista de produtos) e adicionar cada produto ao container na página.
                $.each(data, function(index, produto) {

                    // 3º passo: cada produto é exibido com seu nome e preço formatado e pendura ela dentro da div container-produtos.
                    $('#container-produtos').append(
                        '<div class="item-produto">' + 
                            '<strong>' + produto.nome + '</strong><br>' +
                            '<span> : R$ ' + (produto.preco ? produto.preco.toFixed(2) : '0.00') + '</span>' +
                            '<button class="btn-excluir" data-id="' + produto.id + '">Excluir</button>' +
                            '<button class="btn-editar" data-id="' + produto.id + '" data-nome="' + produto.nome + '" data-preco="' + produto.preco + '">Editar</button>' +
                        '</div>'
                    );
                });
            },
            // Se ocorrer um erro na requisição, a função de callback 'error' é executada.
            error: function() {
                alert('Erro ao carregar produtos. Verifique se o servidor está rodando.');
            }           
        });

    } // Fim da função 1 carregarProdutos.

    // --------------------------------------
    // -- Função 2: Salvar um novo produto
    // --------------------------------------

    // Manipula o evento de submissão do formulário para adicionar um novo produto.
    $('#form-novo-produto').on('submit',function(event) {

        // 1º passo: previne o comportamento padrão do formulário, que é recarregar a página ao ser submetido.
        event.preventDefault();

        // 2º passo: captura os valores dos inputs do formulário.
        var nomeDoInput = $('#input-nome').val();
        var precoDoInput = $('#input-preco').val();

        // 3º passo: cria um objeto com os dados do novo produto.
        var produtoData = {
            nome: nomeDoInput,
            preco: parseFloat(precoDoInput)
        };
        
        var idEdicao = $('#input-id-edicao').val();
        if (idEdicao) {
            // -- MODO UPDATE (PUT) --
            // Se houver um ID de edição, significa que estamos editando um produto existente.  
            $.ajax({
                url: 'http://localhost:8080/api/produtos/' + idEdicao,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(produtoData),

                success: function(produtoAtualizado) {
                    // Limpa os campos do formulário após a edição.
                    $('#input-nome').val('');
                    $('#input-preco').val('');
                    $('#input-id-edicao').val(''); // Limpa o campo de ID oculto.

                    // Recarrega a lista de produtos para refletir a edição.
                    carregarProdutos();
                },
                error: function() {
                    alert('Erro ao atualizar produto. Tente novamente.');
                }
            });
        } else {
            // -- MODO CREATE (POST) --
            // Se não houver ID de edição, estamos adicionando um novo produto.

            $.ajax({
                url: 'http://localhost:8080/api/produtos',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(produtoData),

                success : function(produtoSalvo) {
                    // 5º passo: limpa os campos do formulário após o envio.
                    $('#input-nome').val('');
                    $('#input-preco').val('');
                    // Não é necessário limpar o campo de ID oculto, pois não estamos editando.

                    // 6º passo: recarrega a lista de produtos para incluir o novo produto adicionado.
                    carregarProdutos();
                },
                error: function() {
                    alert('Erro ao salvar produto. Tente novamente.');
                }
            });
        };
    }); // Fim da função 2 salvar novo produto.
    // --------------------------------------
    // -- Função 3: Deletar um produto
    // --------------------------------------    
    
    $('#container-produtos').on('click', '.btn-excluir', function() {

        var idProduto = $(this).data('id'); // Obtém o ID do produto a ser excluído a partir do atributo data-id do botão clicado.
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            $.ajax({
                url: 'http://localhost:8080/api/produtos/' + idProduto, // URL do endpoint da API para excluir o produto específico.
                method: 'DELETE', // Método HTTP usado para a requisição de exclusão.

                success: function() {
                    alert('Produto excluído com sucesso.');
                    carregarProdutos(); // Recarrega a lista de produtos após a exclusão.
                },
                error: function() {
                    alert('Erro ao excluir produto. Tente novamente.');
                }
            });
    }
    }); // Fim da função 3 deletar um produto.

    // --------------------------------------
    // -- Função 4: Editar um produto
    // --------------------------------------
    $('#container-produtos').on('click', '.btn-editar', function() {
        var id = $(this).data('id');
        var nome = $(this).data('nome');
        var preco = $(this).data('preco');

        $('#input-id-edicao').val(id);
        $('#input-nome').val(nome);
        $('#input-preco').val(preco);

        window.scrollTo(0, 0); // Rola a página para o topo para facilitar a edição.
    }); // Fim da função 4 editar um produto.

    carregarProdutos(); // Chama a função para carregar os produtos quando a página é carregada.
}); // Fim do $(document).ready().