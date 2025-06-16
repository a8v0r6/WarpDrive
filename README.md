Description:
Built a real-time 2D multiplayer browser game using Phaser.js for the frontend and Spring Boot for the backend. Implemented bidirectional communication via WebSockets (STOMP protocol) to synchronize player movement and state across connected clients in real time. Designed a scalable game architecture with support for multiple players, movement constraints, and boundary enforcement to ensure fair gameplay.

Key Features:

    Multiplayer real-time game logic using WebSockets with STOMP over SockJS

    Player position synchronization and broadcasting using Spring Boot messaging

    Phaser.js-based interactive canvas with sprite movement and screen boundary logic

    Local network testing across multiple devices with isolated player sessions

    Modular codebase with dynamic player rendering and ID tracking

What I learned:

    Deep understanding of WebSocket protocols, client-server message handling, and state consistency in real-time games

    Integration of modern frontend tools (Vite, ESModules) with Java backend services

    Techniques for clamping sprite movement within the visible game area using Phaser
