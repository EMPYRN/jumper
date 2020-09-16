/**
 * State enum representation Game state
 */
export const State = {
	IDLE: -1,	// when playing in the background
	PAUSE: 0,	// when paused by notification
	READY: 1,	// when ready for player first tap
	PLAY: 2,	// when playing the game
	END: 3,		// when game is ended by collision or screen off
}