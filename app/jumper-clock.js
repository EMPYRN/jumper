import document from "document";
import clock from "clock";
import { me as appbit } from "appbit";
import { today, primaryGoal, goals } from "user-activity";
import { battery } from "power";
import { preferences } from "user-settings";

const BATTERY_LEVELS = [ 100, 75, 50, 25, 0 ];
const BATTERY_THRESHOLD = 12.5;
const ACTIVITY_TO_ICON = {
	"activeMinutes": "am",
	"calories": "cals",
	"distance": "dist",
	"elevationGain": "floors",
	"heartRate": "hr",
	"steps": "steps",
}

let time = document.getElementById("clock");
let statText = document.getElementById("stat-text");
let statIcon = document.getElementById("stat-icon");
let batteryIcon = document.getElementById("battery-icon");

clock.granularity = "seconds";
clock.addEventListener("tick", event => { updateClock(event); });
goals.addEventListener("reachgoal", event => { goalAchieve(event); });

/**
 * Update the basic clock interface
 * @param {*} event 
 */
function updateClock(event)
{
	let hours = event.date.getHours();
	let minutes = event.date.getMinutes();
	let seconds = event.date.getSeconds();

	if (preferences.clockDisplay === "24h")
	{
		time.text = `${zeroPad(hours)}:${zeroPad(minutes)}`;
	}
	else
	{
		time.text = `${hours % 12 || 12}:${zeroPad(minutes)}`;
	}

	updateStat();
	updateBattery();
}

function updateBattery()
{
	BATTERY_LEVELS.some(level => {
		if (battery.chargeLevel >= level - BATTERY_THRESHOLD)
		{
			batteryIcon.href = `icons/battery_indc_${level}_48px.png`;
			return true;
		}
	});
}

/**
 * Update the stat that appears along with the clock
 */
function updateStat()
{
	let statVal = today.adjusted[primaryGoal];
	statText.text = `${statVal}`;
	updateStatIcon();
}

/**
 * Updates icon according to primaryGoal and if goal has been completed
 */
function updateStatIcon()
{
	if (today.adjusted[primaryGoal] < goals[primaryGoal])
	{
		statIcon.href = `icons/stat_${ACTIVITY_TO_ICON[primaryGoal]}_open_48px.png`;
	}
}

function goalAchieve(event)
{
	if (today.adjusted[primaryGoal] >= goals[primaryGoal])
	{
		statIcon.href = `icons/stat_${ACTIVITY_TO_ICON[primaryGoal]}_solid_48px.png`;
	}
}

/**
 * Pad `i` with 0's to be a length of 2
 * @param {*} i 
 */
function zeroPad(i)
{
	return i < 10 ? `0${i}` : `${i}`;
}