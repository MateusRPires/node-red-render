const http = require("http");
const RED = require("node-red");

const server = http.createServer();

const settings = {
  // Editor do Node-RED na raiz
  httpAdminRoot: "/",
  // Endpoints HTTP expostos pelos flows
  httpNodeRoot: "/api",
  // Use a raiz do repositório como diretório de dados/projeto:
  userDir: "./",
  // Mantém a mesma chave entre restarts/deploys (defina no Render > Environment)
  credentialSecret: process.env.CREDENTIAL_SECRET || undefined,
  functionGlobalContext: {}
};

RED.init(server, settings);

// O Render define a porta em process.env.PORT
server.listen(process.env.PORT || 3000);

RED.start();
