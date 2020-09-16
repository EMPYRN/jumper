import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

settingsStorage.addEventListener("change", event => { settingsChange(event); });
messaging.peerSocket.addEventListener("message", event => { socketMessage(event); });
messaging.peerSocket.addEventListener("open", event => { socketOpen(event); });

function settingsChange(event)
{
	if (event.key === "reset" && event.newValue === "true")
	{
		setDefaults();
		settingsStorage.setItem("reset", "false");
	}
	else
	{
		sendValue(event.key, event.newValue);
	}
}

function socketOpen(event)
{
	setDefaults();

	// Set any stored values
	for (let i = 0; i < settingsStorage.length; i++)
	{
		let key = settingsStorage.key(i);
		let value = settingsStorage.getItem(key);

		if (value !== null)
		{
			settingsStorage.setItem(key, value);
			sendValue(key, value);
		}
	}
}

/**
 * Message receive from device-settings.js
 * @param {*} event 
 */
function socketMessage(event)
{
	settingsStorage.setItem("highScore", event.data.highScore);
	settingsStorage.setItem("lifetimeScore", event.data.lifetimeScore)
}

function setDefaults()
{
	setDefaultSetting("ballColor", "#13D3F5");
	setDefaultSetting("obstacleColor", "#13D3F5");
	setDefaultSetting("platformColor", "#404040");
	setDefaultSetting("jumpVibration", true);
	setDefaultSetting("landVibration", true);
	setDefaultSetting("endVibration", true);
	setDefaultSetting("autoPlay", { "selected": [0] });
	setDefaultSetting("gameSpeed", 10);
	setDefaultSetting("clockColor", "#FFFFFF");
}

function setDefaultSetting(key, value)
{
	if (settingsStorage.getItem(key) === null)
	{
		settingsStorage.setItem(key, JSON.stringify(value));
		sendValue(key, JSON.stringify(value));
	}
}

function sendValue(key, value)
{
	if (value !== null)
	{
		sendSettingData({
			key: key,
			value: JSON.parse(value),
		});
	}
}

function sendSettingData(data)
{
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN)
	{
		messaging.peerSocket.send(data);
	}
	else
	{
		console.log("[Companion->Device] No peerSocket connection.");
	}
}