# Use uma imagem base com Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta na qual a API vai rodar
EXPOSE 8080

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]
