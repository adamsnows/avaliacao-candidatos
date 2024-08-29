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

    DATABASE_URL="postgresql://postgres:adamlol123@34.72.83.29:5432/postgres"
    JWT_SECRET=your_jwt_secret

**Substitua user, password, e localhost:5432/ticket_management com suas credenciais e URL do banco de dados PostgreSQL.**

Execute as migrações do banco de dados

    npx prisma migrate dev --name init

Inicie o servidor

    npm start

## Endpoints

/api/auth -> POST Login / Register <br/>
/api/tickets -> GET, PUT, DELETE, POST Criação de tickets, etc <br/>
/api/users -> GET Todos usuários

# Comigotech Frontend

O frontend do projeto Comigotech é uma aplicação desenvolvida utilizando React e TailwindCSS. A aplicação interage com a API RESTful do backend para gerenciar e visualizar tickets, permitindo aos usuários realizar operações de criação, atualização, exclusão e filtragem de tickets.

### Endpoint da API

A aplicação se comunica com a API RESTful hospedada no seguinte endpoint:

- **API Base URL**: [https://comigotech-backend-nhttpfvqia-uc.a.run.app](https://comigotech-backend-nhttpfvqia-uc.a.run.app)

## Tecnologias

**React**: Biblioteca para construção de interfaces de usuário.

**TailwindCSS**: Framework para estilização e design responsivo.

**Axios**: Biblioteca para fazer requisições HTTP.

**React Hook Form**: Biblioteca para gerenciamento de formulários.

**React Hot Toast**: Biblioteca para exibição de notificações.

**RizzUI**: Biblioteca de componentes UI.

**TypeScript**: Linguagem de programação que adiciona tipos estáticos ao JavaScript.

## Instalação

Clone o repositório

```bash
git clone git@github.com:adamsnows/avaliacao-candidatos.git
```

Navegue até o diretório do projeto

```bash
cd frontend
```

Instale as dependências

```bash
npm install
```

Navegue até o diretório do projeto

```bash
cd frontend
```

Configure o ambiente

Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis:

```bash
NEXTAUTH_SECRET="N1be+jf03Wu1mhGkp7JhSBfLlBq8dxBfp7qg+QhxW8o="
NEXTAUTH_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## Funcionalidades

- **Tela de Criação de Ticket**: Permite aos usuários criar novos tickets com um formulário dividido em várias etapas.
- **Listagem de Tickets**: Exibe todos os tickets com a opção de filtrar e ordenar.
- **Atualização e Exclusão de Tickets**: Permite atualizar ou excluir tickets existentes.
- **Autenticação**: Implementa a funcionalidade de login utilizando a API de autenticação.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **`/components`**: Contém componentes reutilizáveis da aplicação.
- **`/contexts`**: Contém contextos React para gerenciamento de estado.
- **`/types`**: Contém tipos de interface ts.
- **`/public`**: Contém arquivos estáticos.
- **`/app/api`**: Contém configuração do uso do AXIOS e Next-Auth.
- **`/app/(comigotech)`**: Contém a página principal do app, dashboard.
- **`/utils`**: Contém funções utilitárias e helpers.

## Contribuição

Se você deseja contribuir para o projeto, sinta-se à vontade para abrir um pull request ou issue no repositório.
