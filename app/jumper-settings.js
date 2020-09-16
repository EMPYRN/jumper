import document from "document";
import * as deviceSettings from "./device-settings";
import { Game } from "./jumper/game";
import { AutoPlay } from "./jumper/auto-play";

let ball = document.getElementById("ball");
let obstacles = document.getElementsByClassName("block");
let platformHigh = document.getElementById("platformHigh");
let platformLow = document.getElementById("platformLow");
let score = document.getElementById("score");
let batteryIcon = document.getElementById("battery-icon");
let statIcon = document.getElementById("stat-icon");
let statText = document.getElementById("stat-text");
let clock = document.getElementById("clock");

deviceSettings.init(settingsCallback);

/**
 * Callback function for where setting data is ultimately sent.
 * Handles actually applying settings to the clock face.
 * @param {*} settings 
 */
function settingsCallback(settings)
{
	/** Game Settings */

	// Colors

	if (settings["ballColor"] != null)
	{
		ball.style.fill = settings["ballColor"];
	}

	if (settings["obstacleColor"] != null)
	{
		obstacles.forEach(function(obstacle)
		{
			obstacle.style.fill = settings["obstacleColor"];
		});
	}

	if (settings["platformColor"] != null)
	{
		platformHigh.style.fill = settings["platformColor"];
		platformLow.style.fill = decreaseBrightness(settings["platformColor"]);
	}

	// Vibrations

	if (settings["jumpVibration"] != null)
	{
		Game.enableJumpVibration = settings["jumpVibration"];
	}

	if (settings["landVibration"] != null)
	{
		Game.enableLandVibration = settings["landVibration"];
	}

	if (settings["endVibration"] != null)
	{
		Game.enableEndVibration = settings["endVibration"];
	}

	// Auto-play

	if (settings["autoPlay"] != null)
	{
		Game.autoPlay = settings["autoPlay"]["selected"][0];
	}

	// Game speed

	if (settings["gameSpeed"] != null)
	{
		Game.speed = settings["gameSpeed"];
	}

	/** Clock Settings */

	// Color

	if (settings["clockColor"] != null)
	{
		clock.style.fill = settings["clockColor"];
		batteryIcon.style.fill = settings["clockColor"];
		statIcon.style.fill = settings["clockColor"];
		statText.style.fill = settings["clockColor"];
	}
}

/**
 * Decrease the given hex string's brightness by 20%
 * @param {*} hex 
 */
function decreaseBrightness(hex)
{
	let r = parseInt(hex.substr(1, 2), 16);
	let g = parseInt(hex.substr(3, 2), 16);
	let b = parseInt(hex.substr(5, 2), 16);

	let dr = ((0|(1<<8) + (r * 80 / 100)).toString(16)).substr(1);
	let dg = ((0|(1<<8) + (g * 80 / 100)).toString(16)).substr(1);
	let db = ((0|(1<<8) + (b * 80 / 100)).toString(16)).substr(1);

	return "#" + dr + dg + db;
}