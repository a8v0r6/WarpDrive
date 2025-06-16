import Phaser from "phaser";
import Start from "./scenes/Start";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1d1d1d",
  scene: [Start],
};

new Phaser.Game(config);
