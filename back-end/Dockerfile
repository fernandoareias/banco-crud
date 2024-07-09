# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --legacy-peer-deps

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 4000

# Defina o comando para rodar a aplicação
CMD ["node", "src/server.js"]
