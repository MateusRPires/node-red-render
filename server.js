const http = require("http");
const RED = require("node-red");

const server = http.createServer();

const settings = {
  httpAdminRoot: "/",          // Editor acessível na raiz da URL
  httpNodeRoot: "/api",        // Endpoints dos fluxos
  userDir: "./.nodered/",      // Diretório de dados
  functionGlobalContext: {}    // Contexto global
};

RED.init(server, settings);

server.listen(process.env.PORT || 3000);

RED.start();
