import { State } from "./state";
import { vibration } from "haptics";
import { me as device } from "device";
import * as util from "./util";

export class Block
{
	/**
	 * Create a new block obstacle
	 */
	constructor(game, id)
	{
		this.game = game;
		this.id = id;
		this.nextBlock = null;

		this.element = this.game.document.getElementById(`block${this.id + 1}`);

		this.height = 40;
		this.width = 20;
		this.x = this.findNext();
		this.y = 210;
	}

	/**
	 * Update block stats
	 */
	update()
	{
		if (this.x + this.width < 0)
		{
			this.x = this.findNext();
		}
		else
		{
			this.x -= this.game.currentSpeed;
		}

		if (this.game.state === State.IDLE && this.x > this.game.player.cx && this.x - this.game.player.cx <= this.game.currentSpeed * 10)
		{
			this.game.player.jump();
		}
	}

	/**
	 * Find and return the next x coord of this Block
	 */
	findNext()
	{
		let base = device.screen.width;

		if (this.game.state === State.READY && this.id == 0)
		{
			// set first block at screen edge for every new game
			return base;
		}
		else if (this.nextBlock)
		{
			base = Math.max(this.nextBlock.x + this.nextBlock.width, device.screen.width) + (19 * this.game.currentSpeed);
		}

		return base + Math.ceil(Math.random() * 75);
	}

	setNextBlock(block)
	{
		this.nextBlock = block;
		this.x = this.findNext();
	}

	/**
	 * Update rendered element
	 */
	draw()
	{
		this.element.x = this.x;
		this.element.y = this.y;
		this.element.height = this.height;
		this.element.width = this.width;
	}

	/**
	 * Ready this Block
	 */
	ready()
	{
		this.x = this.findNext();
		util.show(this.element);
	}

	hidden()
	{
		util.hide(this.element);
	}
}