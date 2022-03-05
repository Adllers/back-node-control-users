# Sobre a Aplicação
- Essa é uma API NodeJS desenvolvida em Typescript para cadastro e controle de usuários.  

## Infra
- Temos um container rodando a aplicação (API NodeJS)
- Temos um container rodando o Banco de Dados Postgres

## Rodando o Projeto
- na raiz do projeto, digite: **docker-compose up**

### Requisitos Não Funcionais Do Projeto
- [x] Utilização do Express como servidor da API
- [x] Utilização de Typescript
- [x] Utilização de JWT (Json Web Token) para autenticação
- [ ] Utilização de Testes Automatizados
- [ ] Utilização do Swagger para documentação
- [x] Utilização de um banco de dados relacional para modelagem de usuários e endereços
- [x] Utilização do Typeorm

### Requisitos Funcionais - Usuários
- [x] Usuário pode criar a sua conta pessoal
- [x] Usuário pode acessar (logar) na sua conta criada
- [x] Usuário pode visualizar seus dados
- [x] Usuário pode alterar seus dados
- [ ] Usuário pode remover a sua conta

### Regras de Negócio - Usuários
- [ ] Usuário só pode visualizar, alterar ou remover sua conta se estiver autenticado
- [x] Para que o usuário atualize seu dados de perfil, é preciso que ele forneça a senha antiga
