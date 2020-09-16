import { Player } from "./player";
import { Block } from "./block";
import { State } from "./state";
import { AutoPlay } from "./auto-play";
import { vibration } from "haptics";
import { display } from "display";
import * as deviceSettings from "../device-settings";
import * as util from "./util";

export class Game
{
	/** The speed of the game */
	static speed = 10;
	static enableJumpVibration = true;
	static enableLandVibration = true;
	static enableEndVibration = true;
	static autoPlay = AutoPlay.PLAY;

	/**
	 * Create and manager a new game
	 */
	constructor(document)
	{
		// constants
		this.VIBRATION_SHORT = "bump";
		this.VIBRATION_MEDIUM = "confirmation";
		this.VIBRATION_LONG = "ping"
		this.NUM_BLOCKS = 3;

		this.document = document;
		this.svg = this.document.getElementById("main");
		this.scoreElement = this.document.getElementById("score");
		this.score = 0;
		this.currentSpeed = Game.speed;

		this.blocks = [];

		this.createPlayer();

		for (let i = 0; i < this.NUM_BLOCKS; i++)
		{
			this.createBlock();
		}

		this.svg.addEventListener("mousedown", event => { this.press(event); });
		display.addEventListener("change", event => { this.display(event); });

		this.ready();
		this.state = State.IDLE;
	}

	jumpVibration()
	{
		if (Game.enableJumpVibration)
		{
			vibration.start(this.VIBRATION_SHORT);
		}
	}

	landVibration()
	{
		if (Game.enableLandVibration)
		{
			vibration.start(this.VIBRATION_MEDIUM);
		}
	}

	endVibration()
	{
		if (Game.enableEndVibration)
		{
			vibration.start(this.VIBRATION_LONG);
		}
	}

	/**
	 * Create a new Player
	 */
	createPlayer()
	{
		this.player = new Player(this);
	}

	/**
	 * Create a new Block and append it to list of blocks
	 */
	createBlock()
	{
		let block = new Block(this, this.blocks.length);

		if (this.blocks.length >= 1)
		{
			block.setNextBlock(this.blocks[this.blocks.length - 1]);
			this.blocks[0].setNextBlock(block);
		}

		this.blocks.push(block);
	}

	/**
	 * Called when display state changes to maintain game state
	 * @param {*} event 
	 */
	display(event)
	{
		if (display.on)
		{
			this.state = State.IDLE;
		}
		else
		{
			if (this.state !== State.IDLE)
			{
				this.end();
				this.ready();
				this.state = State.IDLE;
			}
		}
	}

	/**
	 * Triggered on every screen click. Controls state switching.
	 * @param {*} event 
	 */
	press(event)
	{
		switch (this.state)
		{
			case State.IDLE: // go into ready
				this.ready();
				break;

			case State.READY: // go into play
				this.play();
				break;

			case State.PLAY:
				this.player.jump();
				break;

			case State.END:
				this.ready();
				break;
		}
	}

	/**
	 * Update logic and perform collision checks
	 * Called each frame
	 */
	update()
	{
		if (this.state === State.PLAY || (this.state === State.IDLE && Game.autoPlay === AutoPlay.PLAY))
		{
			this.player.update();

			this.blocks.forEach(block => {
				block.update();
			});

			if (this.state === State.PLAY)
			{
				this.score++; // increment score; effectively frame count

				if (this.score % 500 == 0)
				{
					this.currentSpeed++;
				}

				if (this.checkCollisions())
				{
					this.endVibration();
					this.end();
				}
			}
		}
		else if (this.state === State.IDLE)
		{
			if (Game.autoPlay === AutoPlay.STATIC)
			{
				this.static();
			}
			else if (Game.autoPlay === AutoPlay.HIDE)
			{
				this.hidden();
			}
		}	

		this.draw();
	}
	
	/**
	 * Change svg elements to match updated data
	 */
	draw()
	{
		this.player.draw();
		this.blocks.forEach(block => {
			block.draw();
		});

		if (this.state !== State.IDLE)
		{
			util.show(this.scoreElement);

			if (this.state === State.READY)
			{
				this.scoreElement.text = "Tap to play";
			}
			else
			{
				this.scoreElement.text = `${this.score}`;
			}
		}
		else
		{
			util.hide(this.scoreElement);
			this.scoreElement.text = "";
		}
	}

	/**
	 * Check collisions between player and blocks
	 * Returns true if collision is found
	 */
	checkCollisions()
	{
		for (const block of this.blocks)
		{
			if (this.player.cx + this.player.r >= block.x &&
				this.player.cx - this.player.r <= block.x + block.width &&
				this.player.cy + this.player.r >= block.y &&
				this.player.cy - this.player.r <= block.y + block.height)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * Set objects to static new positions, ready to play
	 * Advances state to ready
	 */
	ready()
	{
		this.state = State.READY;

		this.score = 0;
		util.show(this.scoreElement);
		this.player.ready();
		this.blocks.forEach(block => {
			block.ready();
		});
	}

	/**
	 * Release controls and advance state
	 */
	play()
	{
		this.state = State.PLAY;
	}

	/**
	 * Advance state to End and record scores
	 */
	end()
	{
		this.state = State.END;
		this.currentSpeed = Game.speed;
		deviceSettings.saveScore(this.score);
	}

	static()
	{
		this.ready();
		this.state = State.IDLE;
	}

	hidden()
	{
		util.hide(this.scoreElement);
		this.player.hidden();
		this.blocks.forEach(block => {
			block.hidden();
		});
	}
}