const http = require("http");
const RED = require("node-red");

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

const server = http.createServer();

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: "flows.json",
  credentialSecret: process.env.CREDENTIAL_SECRET || undefined,
  functionGlobalContext: {},
  editorTheme: { projects: { enabled: true } }
};

console.log("[startup] Initializing Node-RED with settings:", {
  httpAdminRoot: settings.httpAdminRoot,
  httpNodeRoot: settings.httpNodeRoot,
  userDir: settings.userDir,
  flowFile: settings.flowFile,
  projectsEnabled: settings.editorTheme.projects.enabled,
  port: PORT,
  host: HOST
});

RED.init(server, settings);

server.listen(PORT, HOST, () => {
  console.log(`[startup] HTTP server listening on http://${HOST}:${PORT}`);
});

RED.start().then(() => {
  console.log("[startup] Node-RED started ✔");
}).catch((err) => {
  console.error("[startup] Node-RED failed to start ❌", err);
  process.exit(1);
});
