# Gerenciador de Produtos

API REST em **Spring Boot** com um front-end em **HTML, CSS e JavaScript puro** para gerenciar produtos de um estoque. O projeto implementa um CRUD completo: listar, consultar, cadastrar, atualizar e remover produtos.

<!-- Adicione um print da tela aqui: ![Tela do projeto](docs/tela.png) -->

## Funcionalidades

- Listagem de todos os produtos em uma tabela, com o total de itens
- Cadastro de produto (nome, preço, quantidade e status)
- Atualização e exclusão do produto selecionado
- Consulta de um produto pelo ID
- Ao clicar em uma linha da tabela, os dados vão para o formulário
- Validação dos dados no front e no back, com mensagens de erro na tela

## Tecnologias

**Back-end**
- Java 22
- Spring Boot 4.1.1 (Web, Data JPA, Validation)
- Hibernate + SQLite (`sqlite-jdbc` e `hibernate-community-dialects`)
- Maven (com Maven Wrapper)

**Front-end**
- HTML5, CSS3 e JavaScript (Fetch API), sem frameworks

## Estrutura do projeto

```
meu-projeto-springboot/
├── Front-end/
│   ├── client-web-listagem.html
│   ├── client-web-listagem.css
│   └── client-web-listagem.js
├── src/
│   ├── main/
│   │   ├── java/com/produtoapi/
│   │   │   ├── MeuProjetoSpringbootApplication.java
│   │   │   ├── controller/ProdutoController.java
│   │   │   ├── exception/ApiExceptionHandler.java
│   │   │   ├── model/Produto.java
│   │   │   ├── repository/ProdutoRepository.java
│   │   │   └── service/ProdutoService.java
│   │   └── resources/application.properties
│   └── test/java/com/produtoapi/MeuProjetoSpringbootApplicationTests.java
├── mvnw
├── mvnw.cmd
└── pom.xml
```

A API segue a arquitetura em camadas: **Controller** (recebe as requisições HTTP) → **Service** (regras de negócio) → **Repository** (acesso ao banco) → **Banco SQLite**. A classe `Produto` é a entidade que representa a tabela.

## Como executar

### Pré-requisitos

- JDK 22 (versão definida no `pom.xml`)
- Não é preciso instalar o Maven: o projeto inclui o Maven Wrapper

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/meu-projeto-springboot.git
cd meu-projeto-springboot
```

### 2. Subir o back-end

```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

A API ficará disponível em `http://localhost:8080/produtos`. O banco SQLite (`meu_banco_de_dados.db`) é criado automaticamente na primeira execução.

### 3. Abrir o front-end

Abra o arquivo `Front-end/client-web-listagem.html` pelo **Live Server** do VS Code (`http://127.0.0.1:5500`) ou pelo servidor embutido do IntelliJ.

> O CORS do back-end libera as origens `http://127.0.0.1:5500`, `http://localhost:5500` e `http://localhost:63342`. Se usar outra porta, ajuste a anotação `@CrossOrigin` no `ProdutoController`.

### Testes

```bash
./mvnw test
```

## Endpoints da API

| Método | Rota                | Descrição                    | Respostas        |
|--------|---------------------|------------------------------|------------------|
| GET    | `/produtos`         | Lista todos os produtos      | 200              |
| GET    | `/produtos/{id}`    | Busca um produto pelo ID     | 200, 404         |
| POST   | `/produtos`         | Cadastra um produto          | 201, 400         |
| POST   | `/produtos/lista`   | Cadastra vários produtos     | 200              |
| PUT    | `/produtos/{id}`    | Atualiza um produto          | 200, 400, 404    |
| DELETE | `/produtos/{id}`    | Remove um produto            | 204, 404         |

### Exemplo de corpo (POST e PUT)

```json
{
  "nome_produto": "Controle",
  "quantidade": 150,
  "preco": 300.0,
  "status": "disponivel"
}
```

### Validações

| Campo          | Regra                       |
|----------------|-----------------------------|
| `nome_produto` | Obrigatório (não pode ser vazio) |
| `quantidade`   | Maior ou igual a zero       |
| `preco`        | Maior ou igual a zero       |
| `status`       | Obrigatório                 |

Quando a validação falha, a API responde `400` com um JSON indicando o campo com problema:

```json
{ "nome_produto": "Informe um nome." }
```

## Possíveis melhorias

- Usar DTOs para separar o formato da API da entidade do banco
- Trocar `double` por `BigDecimal` no preço
- Adicionar testes automatizados para o controller e o service
- Paginação e busca por nome na listagem
- Documentar a API com Swagger/OpenAPI

## Autor

Desenvolvido por **Rafael da Rosa Ferreira**.
