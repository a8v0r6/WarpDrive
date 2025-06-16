package game.dev.warpdrive.controller;

import game.dev.warpdrive.model.PlayerPosition;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    @MessageMapping("/move")
    @SendTo("/topic/position")
    public PlayerPosition handleMove(PlayerPosition move){
        return move;
    }
}
