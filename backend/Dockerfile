# Use uma imagem base com Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./
RUN npm install
COPY . .

# Exponha a porta na qual a API vai rodar
EXPOSE 3001

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]
