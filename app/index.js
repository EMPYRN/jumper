import clock from "clock"
import document from "document"

clock.granularity = "minutes";

let label = document.getElementById("label");
let mainSVG = document.getElementById("main");
let ball = document.getElementById("ball");
let block = document.getElementById("block");

//clock.ontick = () => updateClock();
mainSVG.onclick = () => updateClock();
requestAnimationFrame(gravity);

let ground = 240;
let jumpHeight = 75;
let jumped = false;
let falling = true;

function updateClock()
{
	// let today = new Date();
	// let hours = today.getHours();
	// let mins = today.getMinutes();

	if (ball.cy >= ground && !jumped && !falling)
	{
		jumped = true;
	}
}

function gravity()
{
	let dy = (150 / ((ground - ball.cy) + 5));

	if (jumped && !falling)
	{
		console.log(dy);
		ball.cy -= dy; // jump

		if (ball.cy <= ground - jumpHeight)
		{
			falling = true;
		}
	}

	if (ball.cy <= ground && falling)
	{
		jumped = false;
		falling = true;
		ball.cy += dy; // fall
	}

	if (ball.cy >= ground)
	{
		falling = false;
		ball.cy = ground;
	}

	if (block.x < 0)
	{
		block.x = 350;
	}
	else
	{
		block.x -= 3;
	}

	requestAnimationFrame(gravity);
}