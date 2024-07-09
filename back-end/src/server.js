require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { register, collectDefaultMetrics } = require('prom-client');

const transactionTypeDefs = require('./schema/transaction.schema');
const transactionResolvers = require('./resolvers/transaction.resolvers');

const startServer = async () => {
  const app = express();

  collectDefaultMetrics({ prefix: 'nodejs_' });

  const server = new ApolloServer({ typeDefs: transactionTypeDefs, resolvers: transactionResolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conectado ao MongoDB');
      app.listen(PORT, () => {
        console.log(`API rodando em http://localhost:${PORT}${server.graphqlPath}`);
      });
    })
    .catch(err => {
      console.error('Falha na conexão com o MongoDB', err);
    });

    app.get('/metrics', async (req, res) => {
      try {
        res.set('Content-Type', register.contentType);
        const metrics = await register.metrics();
        res.send(metrics);
      } catch (err) {
        console.error('Erro ao gerar métricas:', err);
        res.status(500).send('Erro ao gerar métricas');
      }
    });
    
};

startServer();
