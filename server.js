import express from "express";
import { WebSocketServer } from "ws";

let nifty50 = 25000;
let sensex = 82000;
let upTrend = -1;
let up = true;

const app = express();

const port = process.env.PORT || 8000;

const server = app.listen(port);

const wss = new WebSocketServer({ server });

setInterval(() => {
  const change = Math.random() * 100;
  if (up) {
    nifty50 += change;
    sensex += change * 3;
  } else {
    nifty50 -= change;
    sensex -= change * 3;
  }
  if (wss.clients) {
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          nifty50: nifty50.toFixed(2),
          sensex: sensex.toFixed(2),
          up: up,
        })
      );
    });
  }
  upTrend++;
  if (upTrend === 3) {
    up = !up;
    upTrend = 0;
  }
}, 1500);
