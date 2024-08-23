## Backend

O backend do projeto Comigotech é uma API RESTful desenvolvida em Node.js utilizando o framework Express e Prisma ORM para gerenciar usuários, colaboradores e tickets. A aplicação fornece funcionalidades de autenticação, manipulação de dados de colaboradores e usuários, e gerenciamento de tickets.

### Endpoint: https://comigotech-backend-nhttpfvqia-uc.a.run.app

## Tecnologias

**Node.js**: Ambiente de execução para JavaScript.

**Express**: Framework para construção de APIs RESTful.

**Prisma**: ORM para interagir com o banco de dados PostgreSQL.

**PostgreSQL**: Banco de dados relacional.

**Bcryptjs**: Biblioteca para hash de senhas.

**Jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.

**Supertest**: Biblioteca para testar endpoints HTTP.

## Instalação

Clone o repositório

    git clone git@github.com:adamsnows/avaliacao-candidatos.git

Navegue até o diretório do projeto

    cd backend

Instale as dependências

    npm install

**Configure o ambiente**

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

    DATABASE_URL="postgresql://user:password@localhost:5432/ticket_management"
    JWT_SECRET=your_jwt_secret

**Substitua user, password, e localhost:5432/ticket_management com suas credenciais e URL do banco de dados PostgreSQL.**

Execute as migrações do banco de dados

    npx prisma migrate dev --name init

Inicie o servidor

    npm start

Endpoints

## Autenticação

**POST /api/auth/register**

_Registra um novo usuário._
Requisição:

    { "username": "string", "password": "string", "role": "ADMIN" // Ou "ATTENDANT" }

Resposta:

    { "id": "integer", "username": "string", "role": "ADMIN" // Ou "ATTENDANT" }

**POST /api/auth/login**

Faz login e retorna um token JWT.

Requisição:

    { "username": "string", "password": "string" }

Resposta:

    { "token": "string", "role": "ADMIN" // Ou "ATTENDANT" }

## Colaboradores

**GET /api/collaborators**

_Lista todos os colaboradores._

Requisição:

Cabeçalhos: Authorization: Bearer <token>

Resposta:

    [ { "id": "integer", "name": "string", "email": "string", "role": "ATTENDANT", // Ou "ADMIN" "createdAt": "ISODate", "updatedAt": "ISODate" } ]

**POST /api/collaborators**
_Cria um novo colaborador._
Requisição:

    { "name": "string", "email": "string", "password": "string", "role": "ATTENDANT" // Ou "ADMIN" }

Resposta:

    { "id": "integer", "name": "string", "email": "string", "role": "ATTENDANT", // Ou "ADMIN" "createdAt": "ISODate", "updatedAt": "ISODate" }

**PUT /api/collaborators/**

_Atualiza um colaborador existente._

Requisição:

    { "name": "string", "email": "string", "password": "string", "role": "ATTENDANT" // Ou "ADMIN" }

Resposta:

    { "id": "integer", "name": "string", "email": "string", "role": "ATTENDANT", // Ou "ADMIN" "createdAt": "ISODate", "updatedAt": "ISODate" }

**DELETE /api/collaborators/**

_Deleta um colaborador existente._

Requisição:

Cabeçalhos: Authorization: Bearer <token>

Resposta:

    { "message": "Collaborator deleted successfully" }
