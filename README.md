# Projeto Labook
O Projeto Labook é uma rede social desenvolvida com NodeJS, Typescript, Express e SQLite, com foco em promover interação e conexão entre usuários. Ele permite que os usuários criem, curtam e gerenciem postagens. O projeto abrange conceitos avançados, como autenticação, autorização, roteamento e arquitetura em camadas.

# Conteúdos abordados
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

Desenvolvimento backend com NodeJS e Typescript
Autenticação com tokens JWT
Armazenamento seguro de senhas usando bcrypt
Arquitetura em camadas para melhor organização do código
Uso do banco de dados SQLite com Knex para gerenciar postagens e usuários
Implementação de endpoints para cadastro, login, criação, edição e exclusão de postagens, além de curtir e descurtir
Uso do Postman para testar e documentar os endpoints.

# Configuração e Execução
Clone o repositório e instale as dependências.
Configure as variáveis de ambiente no arquivo .env.
Inicie o servidor com npm start.

# Endpoints Exemplos

POST /users/signup: Cadastro de usuário e retorno de token JWT.
POST /users/login: Login de usuário e retorno de token JWT.
POST /posts: Criação de postagem.
GET /posts: Listagem de postagens.
PUT /posts/:id: Edição de postagem.
DELETE /posts/:id: Exclusão de postagem.
PUT /posts/:id/like: Curtir ou descurtir uma postagem.
Configuração e Execução
Siga as etapas abaixo para configurar e executar o projeto:

Clone este repositório para o seu ambiente local:
git clone <URL_DO_REPOSITORIO>
Navegue para o diretório do projeto:
cd <NOME_DO_DIRETORIO>
Instale as dependências do projeto:
npm install
Execute o Projeto:
npm start
# Dependências
O projeto utiliza as seguintes principais dependências:

# Express: 
Framework web para lidar com rotas e requisições HTTP.
# Knex: 
Construtor de consultas SQL para interagir com o banco de dados.
# Bcrypt: 
Biblioteca para realizar hashing de senhas.
# Jsonwebtoken: 
Biblioteca para criação e validação de tokens JWT.
# Zod: 
Validação de esquemas de entrada.

# DOCUMENTAÇAO: https://documenter.getpostman.com/view/27709298/2s9Xy5MVsN