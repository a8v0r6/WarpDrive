import Phaser from "phaser";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient;
let playerId = "player-" + Math.floor(Math.random() * 10000);

export default class Start extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
    this.load.image("player", "/player.png");
  }

  create() {
    this.player = this.add.sprite(400, 300, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.otherPlayers = {};
    this.connectWebSocket();
  }

  update() {
    let moved = false;

    if (this.cursors.left.isDown) { this.player.x -= 4; moved = true; }
    else if (this.cursors.right.isDown) { this.player.x += 4; moved = true; }

    if (this.cursors.up.isDown) { this.player.y -= 4; moved = true; }
    else if (this.cursors.down.isDown) { this.player.y += 4; moved = true; }

    // Clamp the full sprite inside bounds
    const halfWidth = this.player.width / 2;
    const halfHeight = this.player.height / 2;

    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    this.player.x = Phaser.Math.Clamp(this.player.x, halfWidth, gameWidth - halfWidth);
    this.player.y = Phaser.Math.Clamp(this.player.y, halfHeight, gameHeight - halfHeight);

    if (moved && stompClient?.connected) {
      stompClient.publish({
        destination: "/app/move",
        body: JSON.stringify({
          playerId,
          x: this.player.x,
          y: this.player.y,
        }),
      });
    }
  }

  connectWebSocket() {
    const socket = new SockJS("http://localhost:8080/ws-game");
    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/positions", (msg) => {
          const data = JSON.parse(msg.body);
          if (data.playerId !== playerId) {
            if (!this.otherPlayers[data.playerId]) {
              this.otherPlayers[data.playerId] = this.add.sprite(data.x, data.y, "player");
            } else {
              this.otherPlayers[data.playerId].x = data.x;
              this.otherPlayers[data.playerId].y = data.y;
            }
          }
        });
      },
    });
    stompClient.activate();
  }
}
