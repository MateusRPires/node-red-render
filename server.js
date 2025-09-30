const http = require("http");
const express = require("express");
const RED = require("node-red");

const app = express();
const server = http.createServer(app);

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: "flows.json",
  credentialSecret: process.env.CREDENTIAL_SECRET || undefined,
  functionGlobalContext: {},
  editorTheme: { projects: { enabled: true } }
};

console.log("[startup] Init Node-RED", { port: PORT, host: HOST, flowFile: settings.flowFile });

// Inicializa Node-RED com o servidor HTTP
RED.init(server, settings);

// UI do editor (Admin)
app.use(settings.httpAdminRoot, RED.httpAdmin);
// Endpoints HTTP expostos pelos flows
app.use(settings.httpNodeRoot, RED.httpNode);

// Sobe HTTP
server.listen(PORT, HOST, () => {
  console.log(`[startup] HTTP listening on http://${HOST}:${PORT}`);
});

// Inicia Node-RED runtime
RED.start().then(() => {
  console.log("[startup] Node-RED started ✔");
}).catch((err) => {
  console.error("[startup] Node-RED failed ❌", err);
  process.exit(1);
});
