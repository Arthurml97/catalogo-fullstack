Catálogo de Produtos Full Stack (Spring Boot + jQuery)

Este é um projeto de estudo de desenvolvimento Full Stack, construindo uma API RESTful em Java com Spring Boot e um cliente web (frontend) em HTML, CSS e jQuery.

O projeto implementa um CRUD (Create, Read, Update, Delete) completo para um catálogo de produtos.

🗂️ Estrutura do Repositório

Este repositório contém duas pastas principais:

/catalogo-api: O projeto Backend (Servidor).

/catalogo-cliente: O projeto Frontend (Cliente).

🚀 Tecnologias Utilizadas

Backend (/catalogo-api)

Java 21

Spring Boot: Framework principal para a criação da API.

Spring Data JPA (Hibernate): Para persistência de dados (ORM).

H2 Database: Banco de dados em memória, utilizado para testes e desenvolvimento.

Maven: Gerenciador de dependências.

Frontend (/catalogo-cliente)

HTML5

CSS3

JavaScript (ES6+)

jQuery: Utilizado para manipulação do DOM e requisições AJAX.

📋 Funcionalidades (Endpoints da API)

O backend (catalogo-api) expõe os seguintes endpoints RESTful, todos sob o prefixo /api/produtos:

Método HTTP

Endpoint

Descrição

GET

/

Lista todos os produtos cadastrados.

POST

/

Cria um novo produto.

PUT

/{id}

Atualiza um produto existente pelo seu ID.

DELETE

/{id}

Deleta um produto pelo seu ID.

🏃 Como Executar

Pré-requisitos:

Java 21 (ou superior)

Maven

Um navegador web

1. Executando o Backend (Servidor)

Navegue até a pasta /catalogo-api.

Execute a aplicação Spring Boot (pela sua IDE ou via terminal com mvn spring-boot:run).

O servidor estará rodando em http://localhost:8080.

2. Executando o Frontend (Cliente)

Navegue até a pasta /catalogo-cliente.

Abra o arquivo index.html diretamente no seu navegador.

A interface irá carregar e se conectar automaticamente ao backend.