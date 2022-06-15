import * as http from "http";

export async function notFound(req: http.IncomingMessage, res: http.ServerResponse) {
  res.writeHead(404, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message: "Ooops route not found!" }));
}
