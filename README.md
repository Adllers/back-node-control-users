# Sobre a Aplicação
- Essa é uma API NodeJS desenvolvida em Typescript para cadastro e controle de usuários e endereços.  

## Infra
- Temos um container rodando a aplicação (API NodeJS)
- Temos um container rodando o Banco de Dados Postgres

## Rodando o Projeto
- Faça um git clone do repositório
- Entre na raiz do projeto, digite: **npm install**
- Certifique-se que a porta 5432 esteja livre 
- Na raiz do projeto, digite: **docker-compose up**
- Abra um outro terminal, entre na raiz do projeto, e digite: **yarn typeorm migration:run**

- Digite **docker ps** para ver os 2 containers rodando (control_users e database_postgres_control_users)
- Entre na sua ferramenta de banco de dados para ver os relacionamentos entre as entidades

## Documentação do Projeto
- Utilizamos o Swagger 
- Quando o projeto estiver rodando, acesse o browser: **http://localhost:3333/api-docs** 

## Requisitos Não Funcionais Do Projeto
- [x] Utilização do Express como servidor da API
- [x] Utilização de Typescript
- [x] Utilização de JWT (Json Web Token) para autenticação
- [x] Utilização de Testes Automatizados (Jest)
- [x] Utilização do Swagger para documentação
- [x] Utilização de um banco de dados relacional para modelagem de usuários e endereços
- [x] Utilização do Typeorm

## Requisitos Funcionais e Regras de Negócio

### Requisitos Funcionais - Usuários
- [x] Usuário pode criar a sua conta pessoal
- [x] Usuário pode acessar (logar) na sua conta criada
- [x] Usuário pode visualizar seus dados
- [x] Usuário pode alterar seus dados
- [x] Usuário pode remover a sua conta

### Regras de Negócio - Usuários
- [x] Usuário só pode visualizar, alterar ou remover sua conta se estiver autenticado
- [x] Para que o usuário atualize seu dados de perfil, é preciso que ele forneça a senha antiga

### Requisitos Funcionais - Endereços
- [x] Usuário pode Criar novo endereço
- [x] Usuário pode visualizar seus endereços criados - por país (Deve ser utilizado queryParams e ParamsRoute)
- [x] Usuário pode alterar dados de endereço
- [x] Usuário pode remover endereço 

### Regras de Negócio - Endereços
- [x] Somente o usuário que criou o endereço pode ver, atualizar e deletar o endereço criado


### Testes Automatizados
- Os testes automatizados foram realizados somente para o controle de usuários
- Na raiz do projeto, digite: **npm test**

