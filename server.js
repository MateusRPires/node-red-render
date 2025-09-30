const http = require("http");
const RED = require("node-red");

const server = http.createServer();

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: "flows.json",   // força nome fixo para os flows
  credentialSecret: process.env.CREDENTIAL_SECRET || undefined,
  functionGlobalContext: {},
  editorTheme: {
    projects: {
      enabled: true   // habilita Projects no menu
    }
  }
};

RED.init(server, settings);

server.listen(process.env.PORT || 3000);

RED.start();
