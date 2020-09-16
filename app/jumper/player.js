import { State } from "./state";
import { vibration } from "haptics";
import * as util from "./util";

export class Player
{
	/**
	 * Create a new player
	 */
	constructor(game)
	{
		this.game = game;

		this.element = this.game.document.getElementById("ball");

		this.cx = 50;
		this.cy = 240;
		this.r = 10;

		this.ground = 250 - this.r;
		this.jumpHeight = 16;
		this.gravity = 1.6;
		this.speed = 0;
		this.jumped = false;
	}

	/**
	 * Apply gravity and movement
	 */
	update()
	{
		this.speed += this.gravity;
		this.cy += this.speed;

		if (this.cy >= this.ground)
		{
			if (this.jumped && this.game.state === State.PLAY)
			{
				this.game.landVibration();
			}
			
			this.speed = 0;
			this.cy = this.ground;
			this.jumped = false;
		}
	}

	/**
	 * Draw the Player element
	 */
	draw()
	{
		this.element.cx = this.cx;
		this.element.cy = this.cy;
		this.element.r = this.r;
	}

	/**
	 * Initiate a jump by the player
	 */
	jump()
	{
		if (!this.jumped && (this.game.state === State.PLAY || this.game.state === State.IDLE))
		{
			this.jumped = true;
			
			this.speed -= this.jumpHeight;

			if (this.game.state === State.PLAY)
			{
				this.game.jumpVibration();
			}
		}	
	}

	/**
	 * Put player in static position
	 */
	ready()
	{
		this.speed = 0;
		this.cy = this.ground;
		util.show(this.element);
	}

	hidden()
	{
		util.hide(this.element);
	}
}