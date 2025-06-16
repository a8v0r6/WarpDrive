package game.dev.warpdrive.model;

import lombok.Data;

@Data
public class PlayerPosition {
    private String playerId;
    private int x;
    private int y;
}
