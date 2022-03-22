import http from "http";
import app from "./app";

// Get port from environment and store in Express.
const port = process.env.PORT || "3000";

// Create the HTTP server
const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on port ${port}`);
});
