import { me } from "appbit";
import { me as device } from "device";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "json";
const SETTINGS_FILE = `settings.${SETTINGS_TYPE}`
const SCORE_TYPE = "json";
const SCORE_FILE = `scores.${SCORE_TYPE}`;

/** Actual settings data, `{key: value}` dict */
let settings;
/** Function to call when settings are changed */
let onSettingsChange;

messaging.peerSocket.addEventListener("message", event => { socketMessage(event); });
me.addEventListener("unload", writeSettings);

export function init(callback)
{
	settings = readSettings();
	onSettingsChange = callback;
	onSettingsChange(settings);
}

/**
 * Receives message from companion
 * @param {*} event event data
 */
function socketMessage(event)
{
	settings[event.data.key] = event.data.value;
	onSettingsChange(settings);
}

/**
 * Read scores from file and return as json object
 */
function readScores()
{
	if (fs.existsSync(SCORE_FILE))
	{
		return fs.readFileSync(SCORE_FILE, "json");
	}
	else
	{
		writeScores({
			"highScore": 0,
			"lifetimeScore": 0,
		});
		
		return readScores();
	}
}

/**
 * Write scores from json to file
 * @param {*} data 
 */
function writeScores(data)
{
	fs.writeFileSync(SCORE_FILE, data, "json");
}

export function saveScore(score)
{
	let scores = readScores();

	if (score > scores.highScore)
	{
		scores.highScore = score;
	}

	scores.lifetimeScore += score;

	writeScores(scores); // write scores to file
	sendData(scores); // send scores to companion for display
}

/**
 * Read settings from file and return setting data
 */
function readSettings()
{
	if (fs.existsSync(SETTINGS_FILE))
	{
		return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
	}

	return {};
}

/**
 * Write settings data to file
 */
function writeSettings()
{
	fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

function sendData(data)
{
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN)
	{
		messaging.peerSocket.send(data);
	}
	else
	{
		console.log("[Device->Companion] No peerSocket connection.");
	}
}