import document from "document";
import { Game } from "./jumper/game";
import { AutoPlay } from "./jumper/auto-play";

let game = new Game(document);
requestAnimationFrame(gameLoop);

function gameLoop()
{
	game.update();

	requestAnimationFrame(gameLoop);
}